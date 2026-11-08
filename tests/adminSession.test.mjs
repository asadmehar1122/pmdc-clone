import assert from 'node:assert/strict'
import { test } from 'node:test'
import { decodeAdminToken } from '../src/lib/adminSession.js'

const now = 1800000000000
const user = { id: 'admin-123', email: 'admin@example.test', name: 'Admin', role: 'admin', exp: now / 1000 + 60 }
const token = (payload) => `header.${Buffer.from(JSON.stringify(payload)).toString('base64url')}.signature`

test('a valid saved admin session is restored, including Unicode names', () => {
  const payload = { ...user, name: 'منتظم' }
  assert.deepEqual(decodeAdminToken(token(payload), now), payload)
})

test('expired sessions cannot trigger a redirect into the admin panel', () => {
  assert.equal(decodeAdminToken(token({ ...user, exp: now / 1000 }), now), null)
  assert.equal(decodeAdminToken(token({ ...user, exp: now / 1000 - 1 }), now), null)
})

test('missing and malformed stored tokens are ignored', () => {
  for (const value of [null, '', 'invalid', 'header.@@@.signature', 'header.bnVsbA.signature']) {
    assert.equal(decodeAdminToken(value, now), null)
  }
})

test('sessions require an admin role, user id, and numeric expiry', () => {
  for (const payload of [{ ...user, role: 'member' }, { ...user, id: '' }, { ...user, exp: undefined }, { ...user, exp: 'tomorrow' }]) {
    assert.equal(decodeAdminToken(token(payload), now), null)
  }
})
