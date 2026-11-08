import { useRouter } from 'next/router'
import { useState } from 'react'
import AdminLayout, { useAdminSession } from '@/components/admin/AdminLayout'
import ResultForm, { emptyResultForm } from '@/components/admin/ResultForm'
import { createAdminResult } from '@/lib/adminApi'
import { useAdminFeedback } from '@/components/admin/AdminFeedback'

function NewResultContent() {
  const router = useRouter()
  const { authToken } = useAdminSession()
  const { notify } = useAdminFeedback()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formValue) => {
    if (loading) return
    if (!authToken) {
      setMessage('Sign in first to create a result')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const data = await createAdminResult(authToken, formValue)
      notify(data.message || 'Result created successfully')
      await router.push('/admin/results')
    } catch (error) {
      setMessage(error.message || 'Unable to create result')
      notify(error.message || 'Unable to create result', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-slate-200 bg-white p-5 md:p-6 lg:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pmdcSky">Create Result</p>
      <h2 className="mt-2 text-2xl font-bold text-pmdcInk md:text-[34px]">New Result Entry</h2>
      <p className="mt-3 max-w-2xl leading-7 text-pmdcInk/70">Create a new result entry, then return to the results list for review, editing, or removal.</p>

      {message ? <div role="alert" className="mt-5 rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{message}</div> : null}

      <div className="mt-6">
        <ResultForm
          initialValue={emptyResultForm}
          submitLabel="Create Result"
          onSubmit={handleSubmit}
          loading={loading}
          pendingLabel="Creating result..."
          helpText="Fill in the form and save the result for public search."
          cancelHref="/admin/results"
          cancelLabel="Cancel"
        />
      </div>
    </div>
  )
}

export default function NewResultPage() {
  return (
    <AdminLayout title="Create Result" description="Add a new public result record from a dedicated page." activePath="/admin/results/new">
      <NewResultContent />
    </AdminLayout>
  )
}
