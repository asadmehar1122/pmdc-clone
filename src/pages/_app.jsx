import '@/styles/globals.css'
import LayoutShell from '@/components/LayoutShell'

export default function App({ Component, pageProps }) {
  return (
    <LayoutShell>
      <Component {...pageProps} />
    </LayoutShell>
  )
}
