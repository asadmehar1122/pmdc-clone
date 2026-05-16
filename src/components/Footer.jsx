import Link from 'next/link'
import { Facebook, MapPin, Phone, Twitter } from 'lucide-react'

const offices = [
  ['Karachi Office', '+92-21-99261620'],
  ['Lahore Office', '+92-42-99230105'],
  ['Peshawar Office', '+92-91-5881144'],
  ['Quetta Office', '+92-81-9213050'],
  ['Hyderabad Office', '+92-22-9213123'],
]

const footerLinks = [
  ['Home', '/'],
  ['Laws & Regulations', '#'],
  ['Experience', '#'],
  ['DC Decisions', '#'],
  ['Tenders', '#'],
  ['Press Releases', '#'],
  ['Syllabi', '#'],
  ['Career Opportunities', '#'],
  ['Gallery', '#'],
  ['Contact', '/contact'],
]

export default function Footer() {
  return (
    <footer className="mt-12 bg-pmdcGray pt-12 text-white">
      <div className="pmdc-container px-4 pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_1fr]">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <img src="/pmdc-assets/logo.png" alt="" className="h-16 w-16 bg-white object-contain p-1" />
              <h2 className="text-xl font-semibold uppercase leading-snug">Pakistan Medical & Dental Council</h2>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm leading-7">
              {footerLinks.map(([label, href], index) => (
                <span key={label}>
                  {index > 0 ? <span className="mr-2 text-white/80">|</span> : null}
                  <Link href={href} className="text-white hover:text-pmdcLight">
                    {label}
                  </Link>
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="relative mb-10 text-xl font-semibold uppercase after:absolute after:-bottom-3 after:left-0 after:h-[3px] after:w-10 after:rounded after:bg-white">
              Contact
            </h3>
            <div className="grid gap-5">
              <p className="flex max-w-sm gap-4 leading-7">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-white" />
                <span>Head Office: Mauve Area, G-10/4, Islamabad, Pakistan</span>
              </p>
              <p className="flex gap-4 leading-7">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-white" />
                <span>+92-51-9190000</span>
              </p>
              <div className="flex gap-3 pt-2">
                <a href="https://twitter.com/pmc_org" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#33383b] hover:text-pmdcLight" aria-label="Twitter official account">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/PakMedicalCommission" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#33383b] hover:text-pmdcLight" aria-label="Facebook official page">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="relative mb-10 text-xl font-semibold uppercase after:absolute after:-bottom-3 after:left-0 after:h-[3px] after:w-10 after:rounded after:bg-white">
              Regional Offices
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {offices.map(([office, phone]) => (
                <p key={office} className="leading-6">
                  <span className="block font-semibold">{office}</span>
                  <span className="text-white/85">{phone}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#33383b] px-4 py-4 text-center text-sm text-pmdcLight">
        Copyright (c)2023, Pakistan Medical and Dental Council. All rights reserved.
      </div>
    </footer>
  )
}
