// Admin API helper functions for CRUD operations

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

class AdminApiError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.status = status
  }
}

async function apiCall(method, endpoint, data = null, authToken = null) {
  const url = `${API_BASE}/api${endpoint}`
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (authToken) {
    options.headers['Authorization'] = `Bearer ${authToken}`
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)
  let responseData
  try {
    responseData = await response.json()
  } catch {
    throw new AdminApiError('Unable to complete the request. Please try again.', response.status)
  }

  if (!response.ok) {
    throw new AdminApiError(
      response.status >= 500
        ? 'Unable to complete the request. Please try again.'
        : responseData.error || 'Unable to complete the request. Please try again.',
      response.status
    )
  }

  return responseData
}

// Result CRUD operations

export async function fetchAdminResults(options = {}) {
  const { limit = 12, categorySlug = '' } = options
  const query = new URLSearchParams()
  
  if (categorySlug) {
    query.append('categorySlug', categorySlug)
  }
  if (limit) {
    query.append('limit', limit)
  }

  const endpoint = `/results${query.toString() ? '?' + query.toString() : ''}`
  return apiCall('GET', endpoint)
}

export async function fetchAdminResult(categorySlug, rollNumber) {
  if (!categorySlug || !rollNumber) {
    throw new AdminApiError('Category slug and roll number are required', 400)
  }

  const endpoint = `/results?categorySlug=${encodeURIComponent(categorySlug)}&rollNumber=${encodeURIComponent(rollNumber)}`
  return apiCall('GET', endpoint)
}

export async function createAdminResult(authToken, resultData) {
  if (!authToken) {
    throw new AdminApiError('Authentication token required', 401)
  }

  return apiCall('POST', '/results', resultData, authToken)
}

export async function updateAdminResult(authToken, categorySlug, resultData) {
  if (!authToken) {
    throw new AdminApiError('Authentication token required', 401)
  }

  if (!categorySlug) {
    throw new AdminApiError('Category slug is required', 400)
  }

  const rollNumber = resultData.originalRollNumber || resultData.rollNumber
  if (!rollNumber) {
    throw new AdminApiError('Roll number is required', 400)
  }

  const endpoint = `/results/${categorySlug}/${rollNumber}`
  return apiCall('PUT', endpoint, resultData, authToken)
}

export async function deleteAdminResult(authToken, categorySlug, rollNumber) {
  if (!authToken) {
    throw new AdminApiError('Authentication token required', 401)
  }

  if (!categorySlug || !rollNumber) {
    throw new AdminApiError('Category slug and roll number are required', 400)
  }

  const endpoint = `/results/${categorySlug}/${rollNumber}`
  return apiCall('DELETE', endpoint, null, authToken)
}

// Auth operations

export async function adminLogin(email, password) {
  if (!email || !password) {
    throw new AdminApiError('Email and password are required', 400)
  }

  return apiCall('POST', '/auth/admin/login', { email, password })
}

export async function adminLogout() {
  // Client-side logout (token is stored in localStorage)
  if (typeof window !== 'undefined') {
    localStorage.removeItem('pmdc-admin-token')
  }
}

export { AdminApiError }
