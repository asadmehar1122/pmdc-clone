import Link from 'next/link'
import { useEffect, useState, useMemo, useRef } from 'react'
import { Eye, LoaderCircle, PencilLine, PlusCircle, Trash2, Search, X } from 'lucide-react'
import AdminLayout, { useAdminSession } from '@/components/admin/AdminLayout'
import ConfirmModal from '@/components/admin/ConfirmModal'
import AdminLoading from '@/components/admin/AdminLoading'
import { useAdminFeedback } from '@/components/admin/AdminFeedback'
import { deleteAdminResult, fetchAdminResults } from '@/lib/adminApi'

function ResultsPageContent() {
  const { authToken } = useAdminSession()
  const { notify } = useAdminFeedback()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [pendingDeleteItem, setPendingDeleteItem] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const deleteInProgress = useRef(false)

  const loadResults = async () => {
    setLoading(true)
    try {
      const data = await fetchAdminResults({ limit: 100 })
      setResults(data.results || [])
    } catch (error) {
      setMessage(error.message || 'Unable to load results')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadResults().catch(() => null)
  }, [])

  // Filter results based on search query and category
  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      const matchesSearch =
        item.rollNumber.toString().includes(searchQuery.toLowerCase()) ||
        item.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.fatherName && item.fatherName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.cnic && item.cnic.includes(searchQuery))

      const matchesCategory = !filterCategory || item.categorySlug === filterCategory

      return matchesSearch && matchesCategory
    })
  }, [results, searchQuery, filterCategory])

  const handleDelete = async (item) => {
    if (!item || deleteInProgress.current) return
    if (!authToken) {
      notify('Sign in first to delete results', 'error')
      return
    }

    deleteInProgress.current = true
    setDeleting(true)
    setDeleteError('')
    try {
      await deleteAdminResult(authToken, item.categorySlug, item.rollNumber)
      setResults((current) => current.filter((result) => result.categorySlug !== item.categorySlug || result.rollNumber !== item.rollNumber))
      setPendingDeleteItem(null)
      notify(`Result for roll ${item.rollNumber} deleted successfully.`)
    } catch (error) {
      const errorMessage = error.message || 'Unable to delete result. Please try again.'
      setDeleteError(errorMessage)
      notify(errorMessage, 'error')
    } finally {
      deleteInProgress.current = false
      setDeleting(false)
    }
  }

  const categories = [...new Set(results.map((r) => r.categorySlug))].sort()

  return (
    <div className="space-y-6">
      <div className="border border-slate-200 bg-white p-5 md:p-6 lg:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pmdcSky">Result Management</p>
            <h2 className="mt-2 text-2xl font-bold text-pmdcInk md:text-[34px]">Results</h2>
            <p className="mt-3 max-w-2xl leading-7 text-pmdcInk/70">Browse, search, edit, and manage all result entries.</p>
          </div>
          <Link href="/admin/results/new" className="pmdc-button px-5 py-3 text-sm">
            <PlusCircle className="h-4 w-4" />
            New Result
          </Link>
        </div>

        {message ? <div role="alert" className="mb-6 rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{message}</div> : null}

        {/* Search Bar */}
        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              aria-label="Search results"
              placeholder="Search by roll number, name, or CNIC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white pl-12 pr-4 py-3 text-sm placeholder:text-slate-400 focus:border-pmdcSky focus:outline-none focus:ring-2 focus:ring-pmdcSky/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-pmdcInk focus:border-pmdcSky focus:outline-none focus:ring-2 focus:ring-pmdcSky/20"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => {
              const item = results.find((r) => r.categorySlug === cat)
              return (
                <option key={cat} value={cat}>
                  {item?.categoryLabel || cat}
                </option>
              )
            })}
          </select>
        </div>

        {/* Results Summary */}
        {!loading && (
          <div className="mb-4 text-sm text-pmdcInk/70">
            Showing <span className="font-semibold">{filteredResults.length}</span> of <span className="font-semibold">{results.length}</span> results
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className="border border-slate-200 bg-white rounded-lg overflow-hidden">
        {loading ? (
          <AdminLoading label="Loading results..." />
        ) : filteredResults.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-pmdcInk/65">
              {searchQuery || filterCategory ? 'No results match your search.' : 'No results found.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-pmdcInk">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-pmdcInk">Roll Number</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-pmdcInk">Candidate Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-pmdcInk">Father Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-pmdcInk">CNIC</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-pmdcInk">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-pmdcInk">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((item) => {
                  const statusTone = String(item.status || '').toLowerCase().includes('pass') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  return (
                    <tr key={`${item.categorySlug}-${item.rollNumber}`} className="border-b border-slate-200 hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <span className="inline-block rounded-full bg-pmdcSky/10 px-3 py-1 text-xs font-semibold text-pmdcSky">
                          {item.categoryLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-pmdcInk">{item.rollNumber}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-pmdcInk">{item.candidateName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-pmdcInk/70">{item.fatherName || '—'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-pmdcInk/60 font-mono">{item.cnic || '—'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusTone}`}>
                          {item.status || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/result/${item.categorySlug}?rollNumber=${encodeURIComponent(item.rollNumber)}`}
                            prefetch={false}
                            className="inline-flex items-center justify-center rounded px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition"
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/results/${item.categorySlug}/${item.rollNumber}/edit`}
                            className="inline-flex items-center justify-center rounded px-2.5 py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-50 transition"
                            title="Edit"
                          >
                            <PencilLine className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => { setDeleteError(''); setPendingDeleteItem(item) }}
                            disabled={deleting}
                            aria-label={`Delete result for roll ${item.rollNumber}`}
                            className="inline-flex items-center justify-center rounded px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition disabled:cursor-wait disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting && pendingDeleteItem?.categorySlug === item.categorySlug && pendingDeleteItem?.rollNumber === item.rollNumber ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Trash2 className="h-4 w-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        open={Boolean(pendingDeleteItem)}
        title="Delete this result?"
        message={pendingDeleteItem ? `Roll ${pendingDeleteItem.rollNumber} from ${pendingDeleteItem.categoryLabel} will be removed from public search.` : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        loading={deleting}
        loadingLabel="Deleting..."
        error={deleteError}
        onConfirm={() => handleDelete(pendingDeleteItem)}
        onCancel={() => { if (!deleting) { setPendingDeleteItem(null); setDeleteError('') } }}
      />
    </div>
  )
}

export default function AdminResultsPage() {
  return (
    <AdminLayout title="Results" description="Manage and search all result entries from a professional interface." activePath="/admin/results">
      <ResultsPageContent />
    </AdminLayout>
  )
}
