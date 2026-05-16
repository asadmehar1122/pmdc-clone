import Head from 'next/head'
import Link from 'next/link'
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  ChartColumn,
  ClipboardCheck,
  FileCheck2,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  Users,
} from 'lucide-react'

const sidebarItems = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Result Approvals', icon: FileCheck2 },
  { label: 'Admissions', icon: ClipboardCheck },
  { label: 'Announcements', icon: Bell },
  { label: 'Schedules', icon: CalendarDays },
  { label: 'Users & Roles', icon: Users },
  { label: 'Reports', icon: ChartColumn },
  { label: 'Settings', icon: Settings },
]

const stats = [
  { label: 'Pending Reviews', value: '18', note: 'Waiting for approval', icon: ShieldAlert },
  { label: 'Live Results', value: '128', note: 'Published on portal', icon: FileCheck2 },
  { label: 'Registered Users', value: '8,420', note: 'Across all modules', icon: Users },
  { label: 'Active Notices', value: '06', note: 'Pinned to homepage', icon: Bell },
]

const workflowItems = [
  {
    title: 'MDCAT Result Upload',
    status: 'In Review',
    meta: 'Session 2022 - Science stream',
  },
  {
    title: 'Faculty Verification',
    status: 'Approved',
    meta: 'Batch 14 - 42 entries verified',
  },
  {
    title: 'Public Notice Draft',
    status: 'Scheduled',
    meta: 'Will publish at 05:00 PM',
  },
]

const quickActions = [
  'Publish Result Notice',
  'Create Announcement',
  'Review Admissions Batch',
  'Generate Report Export',
]

const activityRows = [
  ['Result file uploaded', 'Admin', '2 min ago'],
  ['Approval requested', 'System', '14 min ago'],
  ['Notice scheduled', 'Admin', '1 hour ago'],
  ['User access updated', 'Super Admin', '3 hours ago'],
]

export default function AdminPanelPage() {
  return (
    <>
      <Head>
        <title>Admin Panel - PM&DC</title>
      </Head>

      <section
        className="bg-cover bg-center px-4 py-16 text-white md:py-24"
        style={{ backgroundImage: 'linear-gradient(rgba(10, 101, 160, 0.88), rgba(10, 101, 160, 0.88)), url(/pmdc-assets/inner-banner.png)' }}
      >
        <div className="pmdc-container">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">PM&DC Control Center</p>
          <h1 className="mt-2 text-3xl font-bold md:text-[42px]">Admin Panel</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-base">Home &nbsp; &gt; &nbsp; Admin Panel</p>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="pmdc-container bg-white p-4 shadow-soft md:p-6 lg:p-7">
          <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
            <aside className="bg-[#0E7FB4] p-5 text-white md:p-6">
              <div className="rounded-[14px] bg-white/10 p-5 backdrop-blur-[2px]">
                <LayoutDashboard className="h-10 w-10" />
                <h2 className="mt-4 text-2xl font-bold">Admin Workspace</h2>
                <p className="mt-2 text-sm leading-6 text-white/85">
                  Manage portal content, approvals, users, and public notices from a single dashboard.
                </p>
              </div>

              <nav className="mt-6 grid gap-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href="#"
                      className={`flex items-center justify-between rounded-[10px] px-4 py-3 text-sm font-semibold transition ${
                        item.active ? 'bg-white text-pmdcInk' : 'bg-white/0 text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 ${item.active ? 'text-pmdcSky' : 'text-white/80'}`} />
                        {item.label}
                      </span>
                      <ArrowRight className={`h-4 w-4 ${item.active ? 'text-pmdcSky' : 'text-white/70'}`} />
                    </a>
                  )
                })}
              </nav>

              <div className="mt-6 rounded-[14px] bg-white/10 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Quick Access</p>
                <Link href="/results" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">
                  Open MDCAT Result Page
                </Link>
              </div>
            </aside>

            <div className="bg-white px-4 py-5 md:px-7 md:py-7 lg:px-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-pmdcInk md:text-[34px]">
                    Admin <span className="text-pmdcSky">Dashboard</span>
                  </h2>
                  <p className="mt-3 max-w-3xl leading-7 text-pmdcInk/70">
                    Handle daily portal operations, approvals, and announcements from this PM&DC admin panel.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-pmdcSky">System Online</div>
                  <button className="pmdc-button px-5 py-3 text-sm">
                    Create Notice <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="border border-slate-200 bg-[#F8FBFD] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-pmdcSky">{stat.label}</span>
                          <strong className="mt-3 block text-3xl font-bold text-pmdcInk md:text-[40px]">{stat.value}</strong>
                          <span className="mt-2 block text-sm text-pmdcInk/65">{stat.note}</span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-pmdcSky text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-7 grid gap-6 xl:grid-cols-[0.58fr_0.42fr]">
                <section className="border border-slate-200 bg-white p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-[22px] font-bold text-pmdcInk">Pending Workflow</h3>
                      <p className="mt-1 text-sm text-pmdcInk/65">Review items waiting for action from the admin team.</p>
                    </div>
                    <button className="pmdc-button min-w-[140px] px-5 py-3 text-sm">
                      Open Queue <BookOpen className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4">
                    {workflowItems.map((item) => (
                      <div key={item.title} className="flex flex-wrap items-center justify-between gap-3 border border-slate-200 bg-[#F8FBFD] px-4 py-4">
                        <div>
                          <h4 className="text-base font-semibold text-pmdcInk">{item.title}</h4>
                          <p className="mt-1 text-sm leading-6 text-pmdcInk/65">{item.meta}</p>
                        </div>
                        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-pmdcSky shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="border border-slate-200 bg-[#F8FBFD] p-5 md:p-6">
                  <h3 className="text-[22px] font-bold text-pmdcInk">Quick Actions</h3>
                  <div className="mt-5 grid gap-4">
                    {quickActions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="flex items-center justify-between rounded-[8px] border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-pmdcSky hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
                      >
                        <span className="text-base font-semibold text-pmdcInk">{item}</span>
                        <ArrowRight className="h-4 w-4 text-pmdcSky" />
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[12px] bg-white p-5 shadow-[0_3px_12px_rgba(0,0,0,0.05)]">
                    <h4 className="text-lg font-bold text-pmdcInk">Today's Activity</h4>
                    <div className="mt-4 overflow-hidden border border-slate-200">
                      <div className="grid grid-cols-[1.35fr_0.7fr_0.65fr] bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-pmdcInk/70">
                        <span>Action</span>
                        <span>By</span>
                        <span>Time</span>
                      </div>
                      {activityRows.map(([action, by, time], index) => (
                        <div
                          key={action}
                          className={`grid grid-cols-[1.35fr_0.7fr_0.65fr] px-4 py-4 text-sm ${index !== activityRows.length - 1 ? 'border-b border-slate-200' : ''}`}
                        >
                          <span className="font-medium text-pmdcInk">{action}</span>
                          <span className="text-pmdcInk/70">{by}</span>
                          <span className="text-pmdcInk/70">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}