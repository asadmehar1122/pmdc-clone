import { getMongoClient } from '@/lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Account provisioning requires a server-side secret.
  const createSecret = req.headers['x-create-secret']
  const expectedSecret = process.env.CREATE_ADMIN_SECRET

  if (!expectedSecret || createSecret !== expectedSecret) {
    return res.status(403).json({ error: 'Forbidden: Invalid secret' })
  }

  try {
    const { email, password, name } = req.body

    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const client = await getMongoClient()
    const db = client.db(process.env.MONGODB_DB || 'pmdc-clone')
    const adminsCollection = db.collection('admins')

    // Check if admin already exists
    const existing = await adminsCollection.findOne({ email })
    if (existing) {
      return res.status(409).json({ error: 'Admin with this email already exists' })
    }

    // Create new admin
    const result = await adminsCollection.insertOne({
      email,
      password, // In production, use bcrypt for hashing
      name: name || 'Admin User',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: result.insertedId.toString(),
        email,
        name,
      },
    })
  } catch (error) {
    console.error('Create admin error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
