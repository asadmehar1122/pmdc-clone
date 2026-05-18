import { getMongoClient } from '@/lib/mongodb'
import jwt from 'jsonwebtoken'

const SECRET = process.env.AUTH_SECRET || 'your-secret-key-change-in-production'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Get MongoDB client
    const client = await getMongoClient()
    const db = client.db(process.env.MONGODB_DB || 'pmdc-clone')
    const adminsCollection = db.collection('admins')

    // Find admin user
    const admin = await adminsCollection.findOne({ email })

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // In production, use proper password hashing (bcrypt)
    // For now, we'll just compare plaintext (NOT RECOMMENDED FOR PRODUCTION)
    if (admin.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: 'admin',
      },
      SECRET,
      { expiresIn: '24h' }
    )

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
