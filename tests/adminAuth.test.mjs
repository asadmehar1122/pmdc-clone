import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { after, beforeEach, test } from 'node:test'
import jwt from 'jsonwebtoken'
import { getAdminSecret, verifyAdminToken } from '../src/lib/adminAuth.js'

const originalSecret = process.env.AUTH_SECRET
const admin = { id: '507f1f77bcf86cd799439011', email: 'admin@example.test', role: 'admin' }
const request = (token) => ({ headers: token ? { authorization: `Bearer ${token}` } : {} })

beforeEach(() => {
  process.env.AUTH_SECRET = randomBytes(32).toString('hex')
})

after(() => {
  if (originalSecret === undefined) delete process.env.AUTH_SECRET
  else process.env.AUTH_SECRET = originalSecret
})

test('missing or placeholder secrets cannot be used for signing', () => {
  for (const secret of ['', 'short-key', 'your-super-secret-key-change-this-in-production']) {
    process.env.AUTH_SECRET = secret
    assert.throws(() => getAdminSecret(), /AUTH_SECRET/)
  }
})

test('valid admin token is accepted', () => {
  const token = jwt.sign(admin, getAdminSecret(), { expiresIn: '1h' })
  const user = verifyAdminToken(request(token))
  assert.equal(user?.id, admin.id)
  assert.equal(user?.email, admin.email)
  assert.equal(user?.role, 'admin')
})

test('missing, malformed, and tampered tokens are rejected', () => {
  assert.equal(verifyAdminToken(request()), null)
  assert.equal(verifyAdminToken(request('not-a-jwt')), null)
  const token = jwt.sign(admin, randomBytes(32).toString('hex'))
  assert.equal(verifyAdminToken(request(token)), null)
})

test('expired tokens are rejected', () => {
  const token = jwt.sign(admin, getAdminSecret(), { expiresIn: -1 })
  assert.equal(verifyAdminToken(request(token)), null)
})

test('non-admin tokens and tokens without a user id are rejected', () => {
  const member = jwt.sign({ ...admin, role: 'member' }, getAdminSecret())
  const noId = jwt.sign({ role: 'admin' }, getAdminSecret())
  assert.equal(verifyAdminToken(request(member)), null)
  assert.equal(verifyAdminToken(request(noId)), null)
})

test('unsigned tokens and other signing algorithms are rejected', () => {
  const unsigned = jwt.sign(admin, '', { algorithm: 'none' })
  const otherAlgorithm = jwt.sign(admin, getAdminSecret(), { algorithm: 'HS384' })
  assert.equal(verifyAdminToken(request(unsigned)), null)
  assert.equal(verifyAdminToken(request(otherAlgorithm)), null)
})

test('rotating the secret invalidates existing sessions and accepts new sessions', () => {
  const oldToken = jwt.sign(admin, getAdminSecret())
  process.env.AUTH_SECRET = randomBytes(32).toString('hex')
  assert.equal(verifyAdminToken(request(oldToken)), null)
  const newToken = jwt.sign(admin, getAdminSecret())
  assert.equal(verifyAdminToken(request(newToken))?.id, admin.id)
})
