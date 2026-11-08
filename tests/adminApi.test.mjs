import assert from 'node:assert/strict'
import { afterEach, mock, test } from 'node:test'
import { AdminApiError, deleteAdminResult } from '../src/lib/adminApi.js'

afterEach(() => mock.restoreAll())

test('result deletion sends the admin token and returns the server success response', async () => {
  const response = { message: 'Result deleted successfully', result: { rollNumber: 'TEST123', createdAt: '2026-01-01T00:00:00.000Z' } }
  const fetchMock = mock.method(globalThis, 'fetch', async () => Response.json(response))
  assert.deepEqual(await deleteAdminResult('test-token', 'NLEStepOne', 'TEST123'), response)
  const [url, options] = fetchMock.mock.calls[0].arguments
  assert.ok(url.endsWith('/api/results/NLEStepOne/TEST123'))
  assert.equal(options.method, 'DELETE')
  assert.equal(options.headers.Authorization, 'Bearer test-token')
})

test('server implementation errors are replaced by a useful retry message', async () => {
  mock.method(globalThis, 'fetch', async () => Response.json({ error: 'createdAt.toISOString is not a function' }, { status: 500 }))
  await assert.rejects(deleteAdminResult('test-token', 'NLEStepOne', 'TEST123'), error => {
    assert.ok(error instanceof AdminApiError)
    assert.equal(error.status, 500)
    assert.equal(error.message, 'Unable to complete the request. Please try again.')
    return true
  })
})

test('unavailable non-JSON responses produce a readable error', async () => {
  mock.method(globalThis, 'fetch', async () => new Response('<html>Bad gateway</html>', { status: 502 }))
  await assert.rejects(deleteAdminResult('test-token', 'NLEStepOne', 'TEST123'), error => {
    assert.ok(error instanceof AdminApiError)
    assert.equal(error.status, 502)
    assert.equal(error.message, 'Unable to complete the request. Please try again.')
    return true
  })
})

test('authentication failures retain their status and sign-in message', async () => {
  mock.method(globalThis, 'fetch', async () => Response.json({ error: 'Please sign in again' }, { status: 401 }))
  await assert.rejects(deleteAdminResult('test-token', 'NLEStepOne', 'TEST123'), error => {
    assert.equal(error.status, 401)
    assert.equal(error.message, 'Please sign in again')
    return true
  })
})
