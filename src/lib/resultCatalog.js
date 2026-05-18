export const RESULT_CATEGORIES = [
  {
    slug: 'MDCATResult',
    label: 'MDCAT Results',
    title: 'MDCAT RESULTS',
    description: 'Look for MDCAT result through your Roll Number',
    badge: '03',
  },
  {
    slug: 'NLEStepTwo',
    label: 'NEB Results',
    title: 'NEB RESULTS',
    description: 'Look for NEB result through your Roll Number',
    badge: '02',
  },
  {
    slug: 'NLEStepOne',
    label: 'NRE Step 1 Results',
    title: 'NRE STEP 1 RESULT',
    description: 'Look for NRE Step 1 result through your Roll Number',
    badge: '01',
  },
]

export const DEFAULT_CATEGORY_SLUG = RESULT_CATEGORIES[0].slug

export const SEED_RESULTS = [
  {
    categorySlug: 'NLEStepOne',
    rollNumber: '1078565',
    candidateName: 'Sample Candidate',
    fatherName: 'Sample Father',
    cnic: '42101-1234567-8',
    session: '2026',
    obtainedMarks: 82,
    totalMarks: 100,
    status: 'Pass',
    remarks: 'Demo record ready for public search.',
  },
  {
    categorySlug: 'NLEStepTwo',
    rollNumber: '2078565',
    candidateName: 'Demo Candidate Two',
    fatherName: 'Demo Father Two',
    cnic: '42101-9876543-2',
    session: '2026',
    obtainedMarks: 76,
    totalMarks: 100,
    status: 'Pass',
    remarks: 'Demo record for step two lookup.',
  },
  {
    categorySlug: 'MDCATResult',
    rollNumber: '3078565',
    candidateName: 'Demo MDCAT Candidate',
    fatherName: 'Demo MDCAT Father',
    cnic: '42101-5555555-5',
    session: '2026',
    obtainedMarks: 88,
    totalMarks: 100,
    status: 'Pass',
    remarks: 'Demo record for MDCAT result lookup.',
  },
]

export function normalizeRollNumber(value) {
  return String(value || '').trim().replace(/\s+/g, '')
}

export function normalizeCategorySlug(value) {
  const normalized = String(value || '').trim().toLowerCase()
  const match = RESULT_CATEGORIES.find((item) => item.slug.toLowerCase() === normalized)
  return match ? match.slug : DEFAULT_CATEGORY_SLUG
}

export function getCategoryBySlug(value) {
  const normalized = normalizeCategorySlug(value)
  return RESULT_CATEGORIES.find((item) => item.slug === normalized) || RESULT_CATEGORIES[0]
}

export function serializeResultDocument(document) {
  if (!document) {
    return null
  }

  return {
    ...document,
    _id: document._id ? document._id.toString() : undefined,
    createdAt: document.createdAt ? document.createdAt.toISOString() : null,
    updatedAt: document.updatedAt ? document.updatedAt.toISOString() : null,
  }
}
