import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'

const stats = [
  { label: 'Total Dental Practitioners', value: '40920', icon: '/pmdc-assets/tooth.svg' },
  { label: 'Total Medical Practitioners', value: '325523', icon: '/pmdc-assets/stethoscope.svg' },
  { label: 'Male Dental Practitioners', value: '12782', icon: '/pmdc-assets/doctor-male.svg' },
  { label: 'Male Medical Practitioners', value: '161800', icon: '/pmdc-assets/doctor-male.svg' },
  { label: 'Female Dental Practitioners', value: '28138', icon: '/pmdc-assets/doctor-female.svg' },
  { label: 'Female Medical Practitioners', value: '163723', icon: '/pmdc-assets/doctor-female.svg' },
]

const searchOptions = [
  {
    title: 'Search for Doctors Online',
    text: 'Search for Any Doctor in Practitioners Register by Registration Number, Full Name or Father Name to see the License Validity and Registered Qualifications.',
    href: '/search/doctors',
    active: true,
  },
  {
    title: 'Search for Faculty Online',
    text: 'Search for Any Medical or Dental Faculty Member across Pakistan by Registration Number or Full Name.',
    href: '/search/faculty',
  },
  {
    title: 'Search for Student Registration',
    text: 'Search to Verify the Student Registration of any Pakistani Medical or Dental College student with Pakistan Medical & Dental Council by Registration Number/CNIC, Full Name or Father Name',
    href: '/search/students',
  },
]

export default function StatisticsSection() {
  return (
    <>
      <section
        id="statistics"
        className="bg-cover bg-center px-4 py-14 pb-52 text-white md:py-20 md:pb-[300px]"
        style={{ backgroundImage: 'url(/pmdc-assets/statistics-bg.png)' }}
      >
        <div className="pmdc-container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-10 max-w-xl text-2xl font-semibold leading-snug md:mb-20 md:text-[28px]">
                Statistical Data of the Total Medical & Dental Practitioners registered with Pakistan Medical & Dental Council
              </h2>
              <div className="flex items-center gap-5">
                <img src="/pmdc-assets/doctor-icon.svg" alt="" className="h-20 w-20 object-contain md:h-24 md:w-24" />
                <div>
                  <strong className="block text-4xl font-bold leading-none md:text-[52px]">366443</strong>
                  <span className="mt-2 block text-xl md:text-2xl">Total Registered Practitioners</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-white p-6 md:p-8">
                  <div className="flex items-center gap-5">
                    <img src={stat.icon} alt="" className="h-[74px] w-[74px] object-contain" />
                    <div>
                      <strong className="block text-3xl font-bold leading-none md:text-[42px]">{stat.value}</strong>
                      <span className="mt-2 block text-lg leading-snug md:text-xl">{stat.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-[150px] px-4">
        <div className="pmdc-container bg-white p-4 shadow-soft md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
            <div className="bg-pmdcSky p-5 md:p-8">
              <div className="grid gap-5">
                {searchOptions.map((option) => (
                  <Link
                    key={option.title}
                    href={option.href}
                    className={`flex gap-5 rounded-[10px] p-5 text-left ${
                      option.active ? 'bg-white text-pmdcInk' : 'border-b border-white/70 text-white'
                    }`}
                  >
                    <Search className={`mt-1 h-9 w-9 shrink-0 ${option.active ? 'text-pmdcBlue' : 'text-white'}`} />
                    <span>
                      <span className="block text-lg font-semibold leading-tight">{option.title}</span>
                      <span className="mt-2 block leading-6">{option.text}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-pmdcInk md:text-[42px]">
                Search for <span className="text-pmdcSky">Doctors Online</span>
              </h2>
              <p className="mt-4 max-w-3xl leading-7 text-pmdcInk/75">
                Search for Any Doctor or in Practitioners Register by Registration Number, Full Name or Father Name to see the License Validity and Registered Qualifications.
              </p>

              <div className="mt-7 grid grid-cols-3 gap-2 md:gap-5">
                {['Registration Number', 'Full Name', 'Father Name'].map((tab, index) => (
                  <button
                    key={tab}
                    className={`rounded-t-[10px] px-2 py-4 text-center font-semibold text-white ${
                      index === 0 ? 'bg-pmdcSky' : 'bg-[#B5B5B5]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="bg-[#F3F3F3] p-5 md:min-h-[300px] md:p-10">
                <h3 className="mb-7 text-[22px] font-semibold text-pmdcInk">Search Doctor by Registration Number</h3>
                <input className="pmdc-input mb-7 text-lg" placeholder="Search Doctor by Registration Number" />
                <button className="pmdc-button w-full py-4 text-lg md:w-[250px]">
                  Search <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
