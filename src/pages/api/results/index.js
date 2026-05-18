import { findResultByCategoryAndRoll, listResults, upsertResult } from '@/lib/resultsStore'
import { getCategoryBySlug, normalizeCategorySlug, normalizeRollNumber, serializeResultDocument } from '@/lib/resultCatalog'

function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message })
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const categorySlug = req.query.categorySlug || req.query.category || ''
      const rollNumber = req.query.rollNumber || req.query.roll || ''
      const limit = req.query.limit || 12

      if (categorySlug && rollNumber) {
        const result = await findResultByCategoryAndRoll(categorySlug, rollNumber)
        return res.status(200).json({
          category: getCategoryBySlug(categorySlug),
          rollNumber: normalizeRollNumber(rollNumber),
          result,
        })
      }

      const results = await listResults({ categorySlug: categorySlug || undefined, limit })
      return res.status(200).json({
        category: categorySlug ? getCategoryBySlug(categorySlug) : null,
        results,
      })
    }

    if (req.method === 'POST') {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

      if (!payload.rollNumber) {
        return sendError(res, 400, 'Roll number is required')
      }

      const saved = await upsertResult({
        ...payload,
        categorySlug: normalizeCategorySlug(payload.categorySlug || payload.category || ''),
      })

      return res.status(200).json({
        message: 'Result saved successfully',
        result: serializeResultDocument(saved),
      })
    }

    return res.setHeader('Allow', ['GET', 'POST']).status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    return sendError(res, 500, error.message || 'Internal server error')
  }
}
