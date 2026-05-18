import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminLayout, { useAdminSession } from '@/components/admin/AdminLayout'
import ConfirmModal from '@/components/admin/ConfirmModal'
import { deleteAdminResult, fetchAdminResult } from '@/lib/adminApi'

function DeleteResultContent() {
  const router = useRouter()
  const { authToken } = useAdminSession()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const { categorySlug, rollNumber } = router.query

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    setLoading(true)
    fetchAdminResult(categorySlug, rollNumber)
      .then((data) => setResult(data.result || null))
      .catch((error) => setMessage(error.message || 'Unable to load result'))
      .finally(() => setLoading(false))
  }, [router.isReady, categorySlug, rollNumber])

  const handleDelete = async () => {
    if (!authToken) {
      setMessage('Sign in first to delete results')
      return
    }

    setDeleting(true)
    setMessage('')

    try {
      const data = await deleteAdminResult(authToken, categorySlug, rollNumber)
      setMessage(data.message || 'Result deleted successfully')
      await router.push('/admin/results')
    } catch (error) {
      setMessage(error.message || 'Unable to delete result')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="border border-slate-200 bg-white p-5 md:p-6 lg:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-500">Delete Result</p>
      <h2 className="mt-2 text-2xl font-bold text-pmdcInk md:text-[34px]">Remove Result Entry</h2>
      <p className="mt-3 max-w-2xl leading-7 text-pmdcInk/70">Review the entry carefully before removing it from the public results list.</p>

      {message ? <div className="mt-5 rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{message}</div> : null}

      {loading ? <div className="mt-6 rounded-[10px] border border-slate-200 bg-[#F8FBFD] px-4 py-6 text-sm text-pmdcInk/65">Loading current record...</div> : null}

      {!loading && result ? (
        <div className="mt-6 grid gap-4 rounded-[12px] border border-rose-200 bg-rose-50 p-5">
          <div>
            <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-rose-600">{result.categoryLabel}</span>
            <h3 className="mt-2 text-2xl font-bold text-pmdcInk">Roll {result.rollNumber}</h3>
            <p className="mt-1 text-sm text-pmdcInk/70">{result.candidateName}</p>
          </div>

          <p className="text-sm leading-7 text-pmdcInk/75">Deleting this record removes it from the public result lookup and the admin results list.</p>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => setShowConfirm(true)} disabled={deleting} className="rounded-[4px] bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60">
              {deleting ? 'Deleting...' : 'Confirm Delete'}
            </button>
            <Link href="/admin/results" className="rounded-[4px] border border-slate-200 px-5 py-3 text-sm font-semibold text-pmdcInk hover:border-pmdcSky hover:text-pmdcSky">
              Cancel
            </Link>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={showConfirm}
        title="Delete this result entry?"
        message={result ? `Roll ${result.rollNumber} from ${result.categoryLabel} will be removed from public search.` : 'This result will be removed from public search.'}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        onConfirm={async () => {
          setShowConfirm(false)
          await handleDelete()
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  )
}

export default function DeleteResultPage() {
  return (
    <AdminLayout title="Delete Result" description="Confirm removal of a result from the public results list." activePath="/admin/results">
      <DeleteResultContent />
    </AdminLayout>
  )
}
