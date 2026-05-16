import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default function LayoutShell({ children }) {
  return (
    <>
      <Head>
        <title>PM&DC - Pakistan Medical & Dental Council</title>
        <meta
          name="description"
          content="Pakistan Medical & Dental Council portal for registrations, announcements, searches and institutional services."
        />
      </Head>
      <div className="min-h-screen overflow-x-hidden bg-white text-pmdcInk">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
