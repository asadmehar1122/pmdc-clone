import Head from 'next/head'
import { ArrowRight } from 'lucide-react'

export default function StudentsSearchPage() {
  return (
    <>
      <Head>
        <title>Search Students - PM&DC</title>
      </Head>

      <section
        className="bg-cover bg-center px-4 py-16 text-white md:py-24"
        style={{ backgroundImage: 'linear-gradient(rgba(10, 101, 160, 0.86), rgba(10, 101, 160, 0.86)), url(/pmdc-assets/inner-banner.png)' }}
      >
        <div className="pmdc-container">
          <h1 className="text-3xl font-bold md:text-[42px]">Search for Student Registration</h1>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="pmdc-container bg-white p-4 shadow-soft md:p-10">
          <h2 className="text-3xl font-bold text-pmdcInk md:text-[42px]">
            Search for <span className="text-pmdcSky">Student Registration</span>
          </h2>
          <p className="mt-4 max-w-4xl leading-7 text-pmdcInk/75">
            Search to Verify the Student Registration of any Pakistani Medical or Dental College student with Pakistan Medical & Dental Council by Registration Number/CNIC, Full Name or Father Name.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-2 md:gap-5">
            {['Registration Number', 'Full Name', 'Father Name'].map((tab, index) => (
              <button key={tab} className={`rounded-t-[10px] px-2 py-4 font-semibold text-white ${index === 0 ? 'bg-pmdcSky' : 'bg-[#B5B5B5]'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-[#F3F3F3] p-5 md:p-10">
            <h3 className="mb-7 text-[22px] font-semibold text-pmdcInk">Search Student by Registration Number</h3>
            <input className="pmdc-input mb-7 text-lg" placeholder="Search Student by Registration Number" />
            <button className="pmdc-button w-full py-4 text-lg md:w-[250px]">
              Search <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
