import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'pmdc-clone'

const globalForMongo = globalThis

export async function getMongoClient() {
  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable')
  }

  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri)
    globalForMongo._mongoClientPromise = client.connect()
  }

  return globalForMongo._mongoClientPromise
}

export async function getMongoDb() {
  const client = await getMongoClient()
  return client.db(dbName)
}
