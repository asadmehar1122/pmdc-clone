import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LogOut, Menu, X } from 'lucide-react'
import Head from 'next/head'
import ConfirmModal from '@/components/admin/ConfirmModal'
import AdminLoading from '@/components/admin/AdminLoading'
import { useAdminFeedback } from '@/components/admin/AdminFeedback'
import { ADMIN_TOKEN_KEY, decodeAdminToken } from '@/lib/adminSession'

// Context hook for admin session
const AdminSessionContext = React.createContext(null)

export function useAdminSession() {
  const context = React.useContext(AdminSessionContext)
  if (!context) {
    return { currentUser: null, authToken: null, isLoading: true, logout: () => {} }
  }
  return context
}

function AdminLayout({ children, title = 'Admin', description = '', activePath = '/' }) {
  const router = useRouter()
  const { currentUser, authToken, isLoading, isNavigating, logout } = useAdminSession()
  const { notify } = useAdminFeedback()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !authToken) {
      router.replace('/admin/login').catch(() => null)
    }
  }, [authToken, isLoading, router])

  if (isLoading || !authToken) {
    return <AdminLoading fullScreen label={isLoading ? 'Checking admin session...' : 'Opening sign-in...'} />
  }

  const navigationItems = [
    { label: 'Dashboard', href: '/admin', icon: '📊' },
    { label: 'Results', href: '/admin/results', icon: '📋' },
    { label: 'Create Result', href: '/admin/results/new', icon: '➕' },
  ]

  const isActive = (href) => activePath === href

  const handleLogout = async () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = async () => {
    setShowLogoutConfirm(false)
    notify('You have been signed out.')
    await logout()
  }

  return (
    <>
      <Head>
        <title>{title} - PMDC Admin</title>
        <meta name="description" content={description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="text-xl font-bold text-pmdcSky">PMDC Admin</div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={sidebarOpen}
              className="rounded-md p-2 text-pmdcInk hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-slate-200 bg-white transition-transform lg:relative lg:translate-x-0 lg:transform-none ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ top: 'var(--header-height, 0)' }}
          >
            <div className="flex flex-col">
              {/* Logo */}
              <div className="hidden border-b border-slate-200 px-6 py-6 lg:block">
                <div className="text-xl font-bold text-pmdcSky">PMDC Admin</div>
                <div className="mt-1 text-sm text-pmdcInk/60">Control Panel</div>
              </div>

              {/* User Info */}
              <div className="border-b border-slate-200 px-6 py-4">
                <div className="rounded-lg bg-sky-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-pmdcSky">Signed in as</div>
                  <div className="mt-2 text-sm font-semibold text-pmdcInk">{currentUser?.name || 'Admin User'}</div>
                  <div className="mt-1 text-xs text-pmdcInk/60">{currentUser?.email || 'admin@pmdc.local'}</div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6">
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-sky-50 text-pmdcSky'
                          : 'text-pmdcInk/70 hover:bg-gray-50 hover:text-pmdcInk'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Logout Button */}
              <div className="border-t border-slate-200 px-4 py-4">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Close sidebar on larger screens when navigating */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="min-w-0 flex-1" aria-busy={isNavigating}>
            <div className="border-b border-slate-200 bg-white px-6 py-4">
              <h1 className="text-2xl font-bold text-pmdcInk">{title}</h1>
              {description && <p className="mt-1 text-sm text-pmdcInk/60">{description}</p>}
            </div>
            <div className="admin-page-enter p-6">{children}</div>
          </main>
        </div>

        <ConfirmModal
          open={showLogoutConfirm}
          title="Logout from admin panel?"
          message="You will be signed out and returned to the login screen."
          confirmLabel="Logout"
          cancelLabel="Keep me signed in"
          tone="danger"
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      </div>
    </>
  )
}

// Provider component to wrap the admin pages
export function AdminLayoutProvider({ children }) {
  const router = useRouter()
  const { notify } = useAdminFeedback()
  const [isNavigating, setIsNavigating] = useState(false)
  const [session, setSession] = useState({
    currentUser: null,
    authToken: null,
    isLoading: true,
  })

  useEffect(() => {
    const restoreSession = () => {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY)
      const user = decodeAdminToken(token)
      if (!user) localStorage.removeItem(ADMIN_TOKEN_KEY)
      setSession({ currentUser: user, authToken: user ? token : null, isLoading: false })
    }

    const onStorage = (event) => {
      if (event.key === ADMIN_TOKEN_KEY || event.key === null) restoreSession()
    }
    restoreSession()
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    const start = () => setIsNavigating(true)
    const finish = () => setIsNavigating(false)
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', finish)
    router.events.on('routeChangeError', finish)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', finish)
      router.events.off('routeChangeError', finish)
    }
  }, [router.events])

  const signIn = useCallback((token, user) => {
    const decoded = decodeAdminToken(token)
    if (!decoded) throw new Error('The sign-in response did not contain a valid admin session.')
    localStorage.setItem(ADMIN_TOKEN_KEY, token)
    setSession({ currentUser: { ...decoded, ...user }, authToken: token, isLoading: false })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    setSession({
      currentUser: null,
      authToken: null,
      isLoading: false,
    })
  }, [])

  useEffect(() => {
    if (!session.authToken || !session.currentUser?.exp) return
    const expiresIn = Math.max(0, session.currentUser.exp * 1000 - Date.now())
    const timer = setTimeout(() => {
      logout()
      notify('Your session has expired. Please sign in again.', 'error')
    }, Math.min(expiresIn, 2147483647))
    return () => clearTimeout(timer)
  }, [session.authToken, session.currentUser?.exp, logout, notify])

  const contextValue = useMemo(() => ({
    ...session,
    isNavigating,
    signIn,
    logout,
  }), [session, isNavigating, signIn, logout])

  return (
    <AdminSessionContext.Provider value={contextValue}>
      {children}
      {isNavigating ? <div className="admin-route-progress fixed inset-x-0 top-0 z-[110] h-1 overflow-hidden bg-sky-100" role="progressbar" aria-label="Loading admin page" /> : null}
    </AdminSessionContext.Provider>
  )
}

export default AdminLayout
