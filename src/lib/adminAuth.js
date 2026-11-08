import jwt from 'jsonwebtoken'

export function getAdminSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error('Missing AUTH_SECRET environment variable')
  }
  if (secret.length < 32 || /^your[-_].*secret|change[-_](?:this|me|in[-_]production)/i.test(secret)) {
    throw new Error('AUTH_SECRET must be a non-placeholder secret of at least 32 characters')
  }
  return secret
}

export function verifyAdminToken(req) {
  const authorization = req.headers.authorization
  if (typeof authorization !== 'string' || !authorization.startsWith('Bearer ')) {
    return null
  }

  try {
    const user = jwt.verify(authorization.slice(7), getAdminSecret(), { algorithms: ['HS256'] })
    return user && typeof user === 'object' && user.role === 'admin' && typeof user.id === 'string'
      ? user
      : null
  } catch {
    return null
  }
}
