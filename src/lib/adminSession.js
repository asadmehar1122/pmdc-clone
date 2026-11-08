export const ADMIN_TOKEN_KEY = 'pmdc-admin-token'

export function decodeAdminToken(token, now = Date.now()) {
  if (typeof token !== 'string') return null

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, '=')
    const bytes = Uint8Array.from(atob(padded), (character) => character.charCodeAt(0))
    const user = JSON.parse(new TextDecoder().decode(bytes))

    if (user.role !== 'admin' || typeof user.id !== 'string' || !user.id.trim()) return null
    if (!Number.isFinite(user.exp) || user.exp * 1000 <= now) return null
    return user
  } catch {
    return null
  }
}
