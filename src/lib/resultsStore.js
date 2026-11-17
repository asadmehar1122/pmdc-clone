import { getMongoDb } from './mongodb.js'
import { DEFAULT_CATEGORY_SLUG, DEFAULT_TOTAL_MARKS, SEED_RESULTS, toWholeMarks, getCategoryBySlug, normalizeCategorySlug, normalizeRollNumber, serializeResultDocument } from './resultCatalog.js'

const COLLECTION_NAME = 'results'
const indexReady = new Set()

function buildSeedDocument(seed) {
  const now = new Date()
  const category = getCategoryBySlug(seed.categorySlug)

  return {
    categorySlug: category.slug,
    categoryLabel: category.label,
    rollNumber: normalizeRollNumber(seed.rollNumber),
    candidateName: seed.candidateName,
    fatherName: seed.fatherName,
    cnic: seed.cnic,
    session: seed.session,
    obtainedMarks: toWholeMarks(seed.obtainedMarks, 0),
    totalMarks: toWholeMarks(seed.totalMarks, DEFAULT_TOTAL_MARKS) || DEFAULT_TOTAL_MARKS,
    status: seed.status || 'Pass',
    remarks: seed.remarks || '',
    createdAt: now,
    updatedAt: now,
  }
}

async function ensureCollectionReady(collection) {
  if (!indexReady.has(COLLECTION_NAME)) {
    await collection.createIndex({ categorySlug: 1, rollNumber: 1 }, { unique: true })
    indexReady.add(COLLECTION_NAME)
  }

  const count = await collection.countDocuments()
  if (count === 0) {
    await collection.insertMany(SEED_RESULTS.map(buildSeedDocument))
  }
}

export async function getResultsCollection() {
  const db = await getMongoDb()
  const collection = db.collection(COLLECTION_NAME)
  await ensureCollectionReady(collection)
  return collection
}

export async function upsertResult(input) {
  const collection = await getResultsCollection()
  const category = getCategoryBySlug(input.categorySlug || DEFAULT_CATEGORY_SLUG)
  const rollNumber = normalizeRollNumber(input.rollNumber)

  if (!rollNumber) {
    throw new Error('Roll number is required')
  }

  const now = new Date()
  const document = {
    categorySlug: category.slug,
    categoryLabel: category.label,
    rollNumber,
    candidateName: String(input.candidateName || '').trim(),
    fatherName: String(input.fatherName || '').trim(),
    cnic: String(input.cnic || '').trim(),
    session: String(input.session || '').trim(),
    obtainedMarks: toWholeMarks(input.obtainedMarks, 0),
    totalMarks: toWholeMarks(input.totalMarks, DEFAULT_TOTAL_MARKS) || DEFAULT_TOTAL_MARKS,
    status: String(input.status || 'Pass').trim(),
    remarks: String(input.remarks || '').trim(),
    updatedAt: now,
  }

  const existing = await collection.findOne({ categorySlug: category.slug, rollNumber })

  if (!existing) {
    await collection.insertOne({ ...document, createdAt: now })
  } else {
    await collection.updateOne(
      { categorySlug: category.slug, rollNumber },
      {
        $set: document,
        $setOnInsert: { createdAt: now },
      },
    )
  }

  return collection.findOne({ categorySlug: category.slug, rollNumber })
}

export async function findResultByCategoryAndRoll(categorySlug, rollNumber) {
  const collection = await getResultsCollection()
  const normalizedCategory = normalizeCategorySlug(categorySlug)
  const normalizedRoll = normalizeRollNumber(rollNumber)

  if (!normalizedRoll) {
    return null
  }

  const document = await collection.findOne({ categorySlug: normalizedCategory, rollNumber: normalizedRoll })
  return serializeResultDocument(document)
}

export async function listResults({ categorySlug, limit = 12 } = {}) {
  const collection = await getResultsCollection()
  const query = {}

  if (categorySlug) {
    query.categorySlug = normalizeCategorySlug(categorySlug)
  }

  const documents = await collection.find(query).sort({ updatedAt: -1, createdAt: -1 }).limit(Number(limit) || 12).toArray()
  return documents.map(serializeResultDocument)
}

export async function deleteResultByCategoryAndRoll(categorySlug, rollNumber) {
  const collection = await getResultsCollection()
  const normalizedCategory = normalizeCategorySlug(categorySlug)
  const normalizedRoll = normalizeRollNumber(rollNumber)

  if (!normalizedRoll) {
    return null
  }

  const document = await collection.findOneAndDelete({ categorySlug: normalizedCategory, rollNumber: normalizedRoll })
  return serializeResultDocument(document)
}
