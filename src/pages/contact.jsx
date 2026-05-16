import Head from 'next/head'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

const offices = [
  ['Karachi Office', '+92-21-99261620'],
  ['Lahore Office', '+92-42-99230105'],
  ['Peshawar Office', '+92-91-5881144'],
  ['Quetta Office', '+92-81-9213050'],
  ['Hyderabad Office', '+92-22-9213123'],
]

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact - PM&DC</title>
      </Head>

      <section
        className="bg-cover bg-center px-4 py-16 text-white md:py-24"
        style={{ backgroundImage: 'linear-gradient(rgba(10, 101, 160, 0.86), rgba(10, 101, 160, 0.86)), url(/pmdc-assets/inner-banner.png)' }}
      >
        <div className="pmdc-container">
          <h1 className="text-3xl font-bold md:text-[42px]">Contact PM&DC</h1>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="pmdc-container grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="bg-[#F1F4F7] p-7 md:p-9">
            <h2 className="relative mb-9 text-2xl font-bold text-pmdcInk after:absolute after:-bottom-3 after:left-0 after:h-[3px] after:w-10 after:bg-pmdcSky">
              Head Office
            </h2>
            <div className="grid gap-6 leading-7">
              <p className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-pmdcBlue" />
                <span>Mauve Area, G-10/4, Islamabad, Pakistan</span>
              </p>
              <p className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-pmdcBlue" />
                <span>+92-51-9190000</span>
              </p>
              <p className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-pmdcBlue" />
                <span>info@pmdc.pk</span>
              </p>
            </div>

            <h2 className="relative mb-9 mt-12 text-2xl font-bold text-pmdcInk after:absolute after:-bottom-3 after:left-0 after:h-[3px] after:w-10 after:bg-pmdcSky">
              Regional Offices
            </h2>
            <div className="grid gap-3">
              {offices.map(([city, phone]) => (
                <div key={city} className="border-b border-white bg-white px-4 py-3">
                  <p className="font-semibold text-pmdcInk">{city}</p>
                  <p className="mt-1 text-pmdcInk/75">{phone}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-7 shadow-soft md:p-9">
            <h2 className="relative mb-9 text-2xl font-bold text-pmdcInk after:absolute after:-bottom-3 after:left-0 after:h-[3px] after:w-10 after:bg-pmdcSky">
              Complaint or Inquiry Form
            </h2>
            <form className="grid gap-5">
              <input className="pmdc-input bg-[#F3F3F3]" placeholder="Full name" />
              <input className="pmdc-input bg-[#F3F3F3]" placeholder="Email address" />
              <input className="pmdc-input bg-[#F3F3F3]" placeholder="Subject" />
              <textarea className="pmdc-input min-h-[170px] resize-none bg-[#F3F3F3]" placeholder="Write your message" />
              <button className="pmdc-button w-full md:w-[220px]">
                Send <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
