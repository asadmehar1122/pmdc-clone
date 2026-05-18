import jwt from 'jsonwebtoken'
import { findResultByCategoryAndRoll, upsertResult, deleteResultByCategoryAndRoll } from '@/lib/resultsStore'
import { getCategoryBySlug, normalizeCategorySlug, normalizeRollNumber, serializeResultDocument } from '@/lib/resultCatalog'

const SECRET = process.env.AUTH_SECRET || 'your-secret-key-change-in-production'

function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message })
}

function verifyToken(req) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.slice(7)
    const decoded = jwt.verify(token, SECRET)
    return decoded
  } catch (error) {
    return null
  }
}

export default async function handler(req, res) {
  try {
    const { categorySlug, rollNumber } = req.query

    if (!categorySlug || !rollNumber) {
      return sendError(res, 400, 'Category slug and roll number are required')
    }

    const normalizedSlug = normalizeCategorySlug(categorySlug)
    const normalizedRoll = normalizeRollNumber(rollNumber)

    // GET single result
    if (req.method === 'GET') {
      const result = await findResultByCategoryAndRoll(normalizedSlug, normalizedRoll)
      return res.status(200).json({
        category: getCategoryBySlug(normalizedSlug),
        rollNumber: normalizedRoll,
        result,
      })
    }

    // PUT - Update result
    if (req.method === 'PUT') {
      const user = verifyToken(req)
      if (!user) {
        return sendError(res, 401, 'Unauthorized: Invalid or missing token')
      }

      const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

      // Handle category and roll number changes
      // If the form submitted new values different from the URL params, we need to update
      const newCategorySlug = normalizeCategorySlug(payload.categorySlug || normalizedSlug)
      const newRollNumber = normalizeRollNumber(payload.rollNumber || normalizedRoll)

      // If key fields changed, delete old record first
      if (newCategorySlug !== normalizedSlug || newRollNumber !== normalizedRoll) {
        await deleteResultByCategoryAndRoll(normalizedSlug, normalizedRoll)
      }

      const updated = await upsertResult({
        ...payload,
        categorySlug: newCategorySlug,
        rollNumber: newRollNumber,
      })

      return res.status(200).json({
        message: 'Result updated successfully',
        result: serializeResultDocument(updated),
      })
    }

    // DELETE result
    if (req.method === 'DELETE') {
      const user = verifyToken(req)
      if (!user) {
        return sendError(res, 401, 'Unauthorized: Invalid or missing token')
      }

      const deleted = await deleteResultByCategoryAndRoll(normalizedSlug, normalizedRoll)

      if (!deleted) {
        return sendError(res, 404, 'Result not found')
      }

      return res.status(200).json({
        message: 'Result deleted successfully',
        result: serializeResultDocument(deleted),
      })
    }

    return res.setHeader('Allow', ['GET', 'PUT', 'DELETE']).status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return sendError(res, 500, error.message || 'Internal server error')
  }
}
