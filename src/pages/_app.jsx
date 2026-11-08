import '@/styles/globals.css'
import LayoutShell from '@/components/LayoutShell'
import { AdminLayoutProvider } from '@/components/admin/AdminLayout'
import { AdminFeedbackProvider } from '@/components/admin/AdminFeedback'

export default function App({ Component, pageProps, router }) {
  const isAdminPage = router.pathname.startsWith('/admin') || router.pathname === '/dashboard'

  if (isAdminPage) {
    return (
      <AdminFeedbackProvider>
        <AdminLayoutProvider>
          <Component {...pageProps} />
        </AdminLayoutProvider>
      </AdminFeedbackProvider>
    )
  }

  return (
    <LayoutShell>
      <Component {...pageProps} />
    </LayoutShell>
  )
}
