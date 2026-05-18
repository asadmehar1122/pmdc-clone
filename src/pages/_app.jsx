import '@/styles/globals.css'
import LayoutShell from '@/components/LayoutShell'
import { AdminLayoutProvider } from '@/components/admin/AdminLayout'

export default function App({ Component, pageProps, router }) {
  const isAdminPage = router.pathname.startsWith('/admin')

  if (isAdminPage) {
    return (
      <AdminLayoutProvider>
        <Component {...pageProps} />
      </AdminLayoutProvider>
    )
  }

  return (
    <LayoutShell>
      <Component {...pageProps} />
    </LayoutShell>
  )
}
