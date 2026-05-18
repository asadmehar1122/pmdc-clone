import { findResultByCategoryAndRoll } from '@/lib/resultsStore'
import { getCategoryBySlug, normalizeCategorySlug, normalizeRollNumber } from '@/lib/resultCatalog'

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const { categorySlug } = req.query
    const normalizedSlug = normalizeCategorySlug(categorySlug)
    const rollNumber = normalizeRollNumber(req.query.rollNumber || req.query.roll)
    const result = rollNumber ? await findResultByCategoryAndRoll(normalizedSlug, rollNumber) : null

    return res.status(200).json({
      category: getCategoryBySlug(normalizedSlug),
      rollNumber,
      result,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
