import Head from 'next/head'
import { BadgeCheck, Clock3, FileText, Search } from 'lucide-react'

const sessions = [
  {
    title: 'Session 2022',
    copy: 'Look for MDCAT result through your Roll Number',
    icon: FileText,
    active: true,
  },
  {
    title: 'Session 2021',
    copy: 'Look for MDCAT result through your Roll Number',
    icon: FileText,
  },
  {
    title: 'Session 2020',
    copy: 'Look for MDCAT result through your Roll Number',
    icon: FileText,
  },
  {
    title: 'MDCAT Certificate',
    copy: 'Look for MDCAT Certificate through your Roll Number',
    icon: BadgeCheck,
  },
]

const resultNotes = [
  'Enter the roll number or CNIC exactly as registered.',
  'The result card follows the PMDC public result layout.',
  'Use the year selector on the left to switch sessions.',
]

export default function MdcatResultPage() {
  return (
    <>
      <Head>
        <title>MDCAT Result - PM&DC</title>
      </Head>

      <section
        className="bg-cover bg-center px-4 py-16 text-white md:py-24"
        style={{ backgroundImage: 'linear-gradient(rgba(10, 101, 160, 0.84), rgba(10, 101, 160, 0.84)), url(/pmdc-assets/inner-banner.png)' }}
      >
        <div className="pmdc-container">
          <h1 className="text-3xl font-bold md:text-[42px]">MDCAT Result</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-base">Home &nbsp; &gt; &nbsp; MDCAT Result</p>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="pmdc-container bg-white p-4 shadow-soft md:p-6 lg:p-7">
          <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
            <aside className="bg-pmdcSky p-4 md:p-6 lg:p-5">
              <div className="grid gap-4">
                {sessions.map((session) => {
                  const Icon = session.icon
                  return (
                    <button
                      key={session.title}
                      type="button"
                      className={`flex w-full items-start gap-4 rounded-[10px] border border-transparent p-4 text-left transition ${
                        session.active ? 'bg-white text-pmdcInk shadow-[0_8px_20px_rgba(0,0,0,0.08)]' : 'border-white/25 text-white hover:bg-white/8'
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
                          session.active ? 'bg-pmdcSky text-white' : 'bg-white/12 text-white'
                        }`}
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold leading-tight">{session.title}</span>
                        <span className={`mt-2 block text-sm leading-6 ${session.active ? 'text-pmdcInk/70' : 'text-white/90'}`}>{session.copy}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <div className="bg-white px-4 py-5 md:px-7 md:py-7 lg:px-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-pmdcInk md:text-[34px]">
                    Search for <span className="text-pmdcSky">MDCAT Result</span>
                  </h2>
                  <p className="mt-3 max-w-3xl leading-7 text-pmdcInk/70">
                    Search the official MDCAT result by roll number or CNIC using the public PMDC result portal.
                  </p>
                </div>
                <div className="hidden items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-pmdcSky lg:flex">
                  <Clock3 className="h-4 w-4" />
                  Public result search
                </div>
              </div>

              <div className="mt-7 bg-[#F3F3F3] p-5 md:p-8 lg:min-h-[270px]">
                <h3 className="text-[18px] font-semibold text-pmdcInk md:text-[22px]">
                  Search Result By Roll No (CNIC for MDCAT 2022-23)
                </h3>

                <div className="mt-6 max-w-4xl">
                  <label className="sr-only" htmlFor="mdcat-roll-search">
                    Search Result By Roll Number
                  </label>
                  <input
                    id="mdcat-roll-search"
                    className="pmdc-input h-11 rounded-[3px] text-sm md:h-12 md:text-base"
                    placeholder="Search Result By Roll Number (CNIC for MDCAT 2022-23)"
                  />
                </div>

                <button className="pmdc-button mt-6 min-w-[170px] px-6 py-3.5 text-sm md:mt-8">
                  <Search className="h-4 w-4" />
                  Search Result
                </button>

                <div className="mt-7 grid gap-3 md:grid-cols-3">
                  {resultNotes.map((note) => (
                    <div key={note} className="rounded-[6px] border border-white bg-white px-4 py-3 text-sm leading-6 text-pmdcInk/75 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
