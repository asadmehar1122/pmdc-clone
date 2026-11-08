import assert from 'node:assert/strict'
import { after, beforeEach, test } from 'node:test'
import { ObjectId } from 'mongodb'

const originalUri = process.env.MONGODB_URI
const originalDatabase = process.env.MONGODB_DB
const originalConnection = globalThis._mongoClientPromise
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/test'
process.env.MONGODB_DB = 'test'

let deletedDocument
let queries
const collection = {
  createIndex: async () => 'test-index',
  countDocuments: async () => 1,
  findOneAndDelete: async query => {
    queries.push(query)
    // MongoDB 7 returns the document directly, or null when nothing matches.
    return deletedDocument
  },
}

globalThis._mongoClientPromise = Promise.resolve({ db: () => ({ collection: () => collection }) })
const { deleteResultByCategoryAndRoll } = await import('../src/lib/resultsStore.js')

beforeEach(() => {
  queries = []
  deletedDocument = null
})

after(() => {
  if (originalUri === undefined) delete process.env.MONGODB_URI
  else process.env.MONGODB_URI = originalUri
  if (originalDatabase === undefined) delete process.env.MONGODB_DB
  else process.env.MONGODB_DB = originalDatabase
  if (originalConnection === undefined) delete globalThis._mongoClientPromise
  else globalThis._mongoClientPromise = originalConnection
})

test('deleting an existing result returns the document from MongoDB 7', async () => {
  const id = new ObjectId()
  const createdAt = new Date('2026-01-01T00:00:00Z')
  deletedDocument = { _id: id, categorySlug: 'NLEStepOne', rollNumber: '123456', candidateName: 'Test Candidate', createdAt }
  const result = await deleteResultByCategoryAndRoll('nlestepone', ' 123 456 ')
  assert.equal(result?._id, id.toString())
  assert.equal(result?.candidateName, 'Test Candidate')
  assert.equal(result?.createdAt, createdAt.toISOString())
  assert.deepEqual(queries, [{ categorySlug: 'NLEStepOne', rollNumber: '123456' }])
})

test('deleting a missing result returns null', async () => {
  assert.equal(await deleteResultByCategoryAndRoll('NLEStepOne', 'missing'), null)
})

test('an empty roll number cannot delete a result', async () => {
  assert.equal(await deleteResultByCategoryAndRoll('NLEStepOne', '   '), null)
  assert.equal(queries.length, 0)
})
