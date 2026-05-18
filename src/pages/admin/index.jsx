import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Bell,
  CheckCircle,
  Clock,
  FileCheck2,
  FileText,
  ShieldAlert,
  TrendingUp,
  Users,
} from 'lucide-react'
import AdminLayout, { useAdminSession } from '@/components/admin/AdminLayout'
import { fetchAdminResults } from '@/lib/adminApi'
import { RESULT_CATEGORIES } from '@/lib/resultCatalog'

const quickActions = [
  { href: '/admin/results/new', title: 'Create Result', subtitle: 'Add a new public result entry', icon: '➕' },
  { href: '/admin/results', title: 'Manage Results', subtitle: 'Search, edit, and review entries', icon: '📋' },
]

const activityItems = [
  { title: 'Result batch reviewed', meta: 'MDCAT session batch processed', status: 'completed', time: '2 hours ago' },
  { title: 'New result upload queued', meta: 'Awaiting final approval', status: 'in-progress', time: '35 minutes ago' },
  { title: 'Notice prepared for publishing', meta: 'Ready for dashboard release', status: 'pending', time: '1 day ago' },
]

function DashboardContent() {
  const { currentUser } = useAdminSession()
  const [stats, setStats] = useState([])
  const [recentResults, setRecentResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadDashboard = async () => {
      try {
        const data = await fetchAdminResults({ limit: 1000 })
        const results = data.results || []

        if (!mounted) return

        const categoryCounts = RESULT_CATEGORIES.reduce((accumulator, category) => {
          accumulator[category.slug] = 0
          return accumulator
        }, {})

        results.forEach((item) => {
          if (Object.prototype.hasOwnProperty.call(categoryCounts, item.categorySlug)) {
            categoryCounts[item.categorySlug] += 1
          }
        })

        setStats([
          { label: 'Total Results', value: results.length.toString(), note: 'All published records', icon: FileCheck2, color: 'bg-blue-50' },
          { label: 'MDCAT Results', value: (categoryCounts.MDCATResult || 0).toString(), note: 'Medical category entries', icon: FileText, color: 'bg-emerald-50' },
          { label: 'NEB Results', value: (categoryCounts.NLEStepTwo || 0).toString(), note: 'Foreign graduate entries', icon: ShieldAlert, color: 'bg-amber-50' },
          { label: 'NRE Step 1', value: (categoryCounts.NLEStepOne || 0).toString(), note: 'Step one entries', icon: TrendingUp, color: 'bg-purple-50' },
        ])

        setRecentResults(results.slice(0, 5))
      } catch (error) {
        if (mounted) {
          setStats([])
          setRecentResults([])
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      mounted = false
    }
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-amber-600" />
      case 'pending':
        return <Bell className="h-5 w-5 text-sky-600" />
      default:
        return <Clock className="h-5 w-5 text-slate-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700'
      case 'in-progress':
        return 'bg-amber-100 text-amber-700'
      case 'pending':
        return 'bg-sky-100 text-sky-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <>
      <section className="mb-8">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-pmdcSky to-pmdcBlue p-8 text-white shadow-lg md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">PM&DC Control Center</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Welcome back, {currentUser?.name || 'Administrator'}</h2>
              <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-base">
                Manage published results, review recent activity, and keep the portal updated from one place.
              </p>
            </div>

            <Link href="/admin/results/new" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-pmdcSky transition hover:bg-slate-50">
              <span>Create Result</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-4 text-lg font-bold text-pmdcInk">Quick Stats</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            <div className="col-span-full rounded-xl border border-slate-200 bg-white px-6 py-8 text-center text-pmdcInk/60">
              Loading dashboard stats...
            </div>
          ) : (
            stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div key={stat.label} className={`rounded-xl border border-slate-200 ${stat.color} p-6 shadow-sm transition hover:shadow-md`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-pmdcInk/70">{stat.label}</p>
                      <strong className="mt-3 block text-3xl font-bold text-pmdcInk md:text-[40px]">{stat.value}</strong>
                      <p className="mt-2 text-sm text-pmdcInk/65">{stat.note}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-pmdcSky shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-[22px] font-bold text-pmdcInk">Recent Results</h3>
              <p className="mt-1 text-sm text-pmdcInk/60">Latest entries added to the portal</p>
            </div>
            <Link href="/admin/results" className="text-sm font-semibold text-pmdcSky hover:text-pmdcBlue">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {recentResults.length > 0 ? (
              recentResults.map((item) => (
                <Link
                  key={`${item.categorySlug}-${item.rollNumber}`}
                  href={`/admin/results/${item.categorySlug}/${item.rollNumber}/edit`}
                  className="block rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-pmdcSky hover:bg-blue-50/60"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-pmdcSky/10 px-3 py-1 text-xs font-semibold text-pmdcSky">{item.categoryLabel}</span>
                        <span className="text-sm font-semibold text-pmdcInk">Roll {item.rollNumber}</span>
                      </div>
                      <p className="mt-2 text-sm text-pmdcInk/65">{item.candidateName}</p>
                    </div>
                    <span className="text-xs font-semibold text-pmdcInk/40">Edit →</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-pmdcInk/60">
                No recent results available.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <div className="mb-5">
            <h3 className="text-[22px] font-bold text-pmdcInk">Activity Log</h3>
            <p className="mt-1 text-sm text-pmdcInk/60">System updates and publishing progress</p>
          </div>

          <div className="space-y-3">
            {activityItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-pmdcInk">{item.title}</p>
                        <p className="mt-1 text-sm text-pmdcInk/60">{item.meta}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-pmdcInk/50">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-pmdcInk">Quick Actions</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:border-pmdcSky hover:shadow-md">
              <div className="text-3xl">{action.icon}</div>
              <p className="mt-3 font-semibold text-pmdcInk">{action.title}</p>
              <p className="mt-1 text-sm text-pmdcInk/60">{action.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default function AdminPanelPage() {
  return (
    <AdminLayout title="Dashboard" description="Monitor result publishing and manage your PM&DC control center." activePath="/admin">
      <DashboardContent />
    </AdminLayout>
  )
}