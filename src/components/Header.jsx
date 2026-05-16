import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Menu, Search, ShieldAlert, Twitter, X } from 'lucide-react'

const navItems = [
  { label: 'About Us', href: '#' },
  { label: 'Publications', href: '#' },
  { label: 'Institutions & Qualifications', href: '#' },
  { label: 'Accreditation Standards', href: '#' },
  { label: 'Latest News & Events', href: '#' },
  { label: 'Results', href: '/results' },
]

const alerts = [
  ['Doctors Alert: Unrecognized Postgraduate Programs in Medicine & Dentistry', '#'],
  ['Doctors Alert: Unrecognized Postgraduate Programs', '#'],
  ['TUITION FEE-NOTIFICATION', '#'],
  ['Stand Alone Hospitals Approved for the House Job', '#'],
  ['Recognised Institutes with attached Hospitals', '#'],
  ['Recognized Foreign PG Qualifications', '#'],
  ['PG Equivalence Form', '#'],
  ['Recognized Pakistani Qualifications', '#'],
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="bg-white py-4 shadow-[0_1px_0_rgba(0,0,0,0.08)] md:py-5">
        <div className="container-large px-4">
          <div className="flex items-start gap-3 md:gap-7">
            <Link href="/" className="shrink-0" aria-label="Pakistan Medical and Dental Council home">
              <img
                src="/pmdc-assets/logo.png"
                alt="Pakistan Medical and Dental Council"
                className="h-20 w-20 object-contain sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              />
            </Link>

            <div className="min-w-0 flex-1 pr-12 lg:pr-0">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <Link href="/">
                  <h1 className="break-words text-lg font-semibold leading-tight text-pmdcInk sm:text-2xl lg:text-[28px]">
                    Pakistan Medical and Dental Council
                  </h1>
                </Link>

                <div className="hidden items-center gap-5 lg:flex">
                  <div className="relative h-[30px] w-[220px]">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pmdcSky" />
                    <input
                      className="h-[30px] w-full border-0 border-b border-pmdcInk/50 bg-transparent pl-9 pr-2 text-sm text-pmdcInk outline-none placeholder:text-pmdcBlue"
                      placeholder="Type to Search..."
                    />
                  </div>
                  <a href="https://twitter.com/pmc_org" target="_blank" rel="noreferrer" aria-label="Twitter official account">
                    <Twitter className="h-5 w-5 text-pmdcSky" />
                  </a>
                  <a
                    href="https://www.facebook.com/PakMedicalCommission"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook official page"
                  >
                    <Facebook className="h-5 w-5 text-pmdcSky" />
                  </a>
                  <Link href="/contact" className="font-semibold text-pmdcInk hover:text-pmdcSky">
                    Helpline
                  </Link>
                </div>

                <button
                  className="absolute right-4 top-7 inline-flex h-10 w-10 items-center justify-center rounded-[3px] bg-pmdcSky text-white lg:hidden"
                  onClick={() => setOpen((value) => !value)}
                  aria-label="Toggle menu"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

              <p className="mt-2 text-sm text-pmdcGray">(Successor of Pakistan Medical Commission)</p>

              <div className="mt-4 hidden items-center justify-between border-t border-[#DCE0E5] pt-4 lg:flex">
                <nav className="flex min-w-0 flex-wrap items-center gap-x-7 gap-y-3">
                  {navItems.map((item) => (
                    <Link key={item.label} href={item.href} className="text-[15px] font-semibold text-pmdcInk hover:text-pmdcSky">
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <Link
                  href="/contact"
                  className="ml-5 flex h-12 w-12 shrink-0 items-center justify-center border-l border-[#DCE0E5] pl-5 text-pmdcSky"
                  title="Register Complaints"
                >
                  <ShieldAlert className="h-7 w-7" />
                </Link>
              </div>
            </div>
          </div>

          {open ? (
            <div className="mt-4 border-t border-[#DCE0E5] pt-4 lg:hidden">
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-slate-100 py-3 text-sm font-semibold text-pmdcInk"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/contact" onClick={() => setOpen(false)} className="py-3 text-sm font-semibold text-pmdcSky">
                  Helpline
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <section className="overflow-hidden bg-pmdcSky py-4 text-white">
        <marquee width="100%" direction="left" scrollamount="6">
          {alerts.map(([item, href]) => (
            <span key={item} className="inline-block px-8 text-base font-semibold">
              {item}
              <a href={href} className="ml-2 font-bold text-white underline underline-offset-2">
                Click Here
              </a>
            </span>
          ))}
        </marquee>
      </section>
    </>
  )
}
