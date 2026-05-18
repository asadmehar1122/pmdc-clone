import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminLayout, { useAdminSession } from '@/components/admin/AdminLayout'
import ResultForm from '@/components/admin/ResultForm'
import { fetchAdminResult, updateAdminResult } from '@/lib/adminApi'

function toFormValue(result, category, rollNumber) {
  if (!result) return null
  return {
    categorySlug: result.categorySlug || (category && category.slug) || '',
    rollNumber: result.rollNumber || rollNumber || '',
    candidateName: result.candidateName || '',
    fatherName: result.fatherName || '',
    cnic: result.cnic || '',
    session: result.session || '',
    obtainedMarks: result.obtainedMarks ?? '',
    totalMarks: result.totalMarks ?? '',
    status: result.status || 'Pass',
    remarks: result.remarks || '',
    originalRollNumber: result.rollNumber || rollNumber || '',
  }
}

function EditResultContent() {
  const router = useRouter()
  const { authToken } = useAdminSession()
  const { categorySlug, rollNumber } = router.query

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [initialValue, setInitialValue] = useState(null)

  useEffect(() => {
    if (!router.isReady) return

    setLoading(true)
    fetchAdminResult(categorySlug, rollNumber)
      .then((data) => {
        const fv = toFormValue(data.result || null, data.category || null, data.rollNumber || rollNumber)
        setInitialValue(fv)
      })
      .catch((err) => setMessage(err.message || 'Unable to load result'))
      .finally(() => setLoading(false))
  }, [router.isReady, categorySlug, rollNumber])

  const handleSubmit = async (formValue) => {
    if (!authToken) {
      setMessage('Sign in first to edit results')
      return
    }

    setSubmitting(true)
    setMessage('')

    try {
      const data = await updateAdminResult(authToken, categorySlug, formValue)
      setMessage(data.message || 'Result updated successfully')
      await router.push('/admin/results')
    } catch (error) {
      setMessage(error.message || 'Unable to update result')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="border border-slate-200 bg-white p-5 md:p-6 lg:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pmdcSky">Edit Result</p>
      <h2 className="mt-2 text-2xl font-bold text-pmdcInk md:text-[34px]">Edit existing result</h2>
      <p className="mt-3 max-w-2xl leading-7 text-pmdcInk/70">Update the fields below and save to update the public result record.</p>

      {message ? <div className="mt-5 rounded-[8px] bg-sky-50 px-4 py-3 text-sm font-medium text-pmdcSky">{message}</div> : null}

      {loading ? (
        <div className="mt-6 rounded-[10px] border border-slate-200 bg-[#F8FBFD] px-4 py-6 text-sm text-pmdcInk/65">Loading record...</div>
      ) : null}

      {!loading && initialValue ? (
        <div className="mt-6">
          <ResultForm
            initialValue={initialValue}
            submitLabel={submitting ? 'Saving...' : 'Save Changes'}
            onSubmit={handleSubmit}
            loading={submitting}
            helpText="Edit fields and save. Changing roll number will replace the original record."
            cancelHref="/admin/results"
            cancelLabel="Cancel"
          />
        </div>
      ) : null}
    </div>
  )
}

export default function EditResultPage() {
  return (
    <AdminLayout title="Edit Result" description="Edit an existing public result record." activePath="/admin/results">
      <EditResultContent />
    </AdminLayout>
  )
}
