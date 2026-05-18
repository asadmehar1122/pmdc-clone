import Head from 'next/head'
import Link from 'next/link'
import { useMemo } from 'react'
import { FileText } from 'lucide-react'
import { getCategoryBySlug, normalizeRollNumber } from '@/lib/resultCatalog'
import { findResultByCategoryAndRoll } from '@/lib/resultsStore'

export async function getServerSideProps(context) {
  const category = getCategoryBySlug(context.params?.slug)
  const rollNumber = normalizeRollNumber(context.query.rollNumber || context.query.roll || '')
  const result = rollNumber ? await findResultByCategoryAndRoll(category.slug, rollNumber) : null

  return {
    props: {
      category,
      rollNumber,
      result,
    },
  }
}

export default function ResultLookupPage({ category, rollNumber, result }) {
  const rollValue = useMemo(() => rollNumber || result?.rollNumber || '', [result, rollNumber])
  const statusTone = String(result?.status || '').toLowerCase().includes('pass') ? 'bg-emerald-500' : 'bg-rose-500'
  const hasSearched = Boolean(rollNumber)

  return (
    <>
      <Head>
        <title>{category.title} - PM&DC</title>
      </Head>

      <section className="bg-cover bg-center px-8 py-16 text-white md:py-24" style={{ backgroundImage: 'linear-gradient(rgba(10, 101, 160, 0.86), rgba(10, 101, 160, 0.86)), url(/pmdc-assets/inner-banner.png)' }}>
        <div className="pmdc-container ">
          <h1 className="text-3xl font-bold uppercase md:text-[42px]">{category.title}</h1>
         

           <div className="pmdc-container pt-10 ">
          <nav  className="flex items-center gap-2 text-[14px] md:text-[15px] ">
            <Link href="/" className="font-bold text-pmdcSky hover:text-pmdcBlue">
              Home
            </Link>
            <span className="text-white">›</span>
            <span className="font-medium text-white">{category.label.replace('Results', 'Result')}</span>
          </nav>
        </div>
         
          {/* <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-base">{category.description}</p> */}
        </div>
      </section>

      {/* <section className="bg-white px-4 py-4 md:py-5">
      
      </section> */}

      <section id="result-search" className="border-2 px-4 py-12 md:py-16">
        <div className="pmdc-container bg-white p-4 shadow-soft md:p-6 lg:p-7">
          <div className="grid items-start gap-8 lg:grid-cols-[31%_69%] lg:gap-12">
            <div className="flex min-h-[270px] items-start rounded-none bg-[#1a98c2] p-6 pt-8 md:p-6 md:pt-8">
              <div className="w-full rounded-[16px] bg-white px-8 py-10 shadow-none md:px-10 md:py-12">
                <div className="flex items-start gap-6">
                  <div className="mt-1 flex h-14 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#0E67A4] text-white shadow-sm">
                    <FileText className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-[22px] font-semibold leading-tight text-pmdcInk md:text-[24px]">{category.label}</h2>
                    <p className="mt-3 max-w-[260px] text-[15px] leading-6 text-pmdcInk/85 md:text-[16px]">{category.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6 pt-2 md:p-8 md:pt-2">
              <div className="mb-6 flex justify-end md:mb-8">
                {result ? (
                  <Link href={`/result/${category.slug}`} className="inline-flex rounded-md bg-pmdcSky px-6 py-3 text-sm font-semibold text-white transition hover:bg-pmdcBlue">
                    Back to search
                  </Link>
                ) : null}
              </div>

              <h1 className="mb-8 text-[32px] font-normal leading-none text-pmdcInk md:text-[46px]">
                {result ? '' : <>Search {category.label.replace('Results', 'Result')} <span className="text-pmdcSky">By Roll Number</span></>}
              </h1>

              {!result ? (
                <div className="rounded-lg bg-[#F3F3F3] p-8 md:p-10">
                  <h3 className="mb-6 text-lg font-bold text-pmdcInk md:text-xl">
                    Search {category.label.replace('Results', 'Result')} By Roll Number
                  </h3>
                  <form className="space-y-6" action={`/result/${category.slug}`} method="get" onSubmit={(e) => e.currentTarget.submit()}>
                    <div>
                      <input
                        id="rollNumber"
                        name="rollNumber"
                        defaultValue={rollValue}
                        autoFocus={hasSearched}
                        required
                        inputMode="numeric"
                        pattern="[0-9]+"
                        title="Please enter a valid numeric roll number"
                        className="w-full rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-md placeholder:text-slate-400"
                        placeholder={`Search ${category.label.replace('Results', 'Result')} By Roll Number`}
                      />
                    </div>
                    <div className="flex">
                      <button type="submit" className="inline-block w-48 rounded-md bg-pmdcSky px-6 py-4 text-lg font-semibold text-white hover:bg-pmdcBlue md:w-56">
                        Search
                      </button>
                    </div>
                  </form>

                  {hasSearched && !result ? (
                    <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                      <p className="font-semibold">No result found</p>
                      <p className="mt-1">No result found for this roll number in {category.label}. Please check the roll number and try again.</p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="rounded-none bg-white p-5 shadow-soft md:p-8">
                  <div className="mb-6 flex items-start justify-between gap-4 md:mb-8">
                    <h2 className="border-b-[5px] border-pmdcInk pb-0.5 text-[32px] font-normal leading-none text-pmdcInk md:text-[46px]">
                      Result Details
                    </h2>
                  </div>

                  <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                      <h3 className="border-b-[5px] border-pmdcInk pb-0.5 text-[26px] font-normal leading-none text-pmdcInk md:text-[34px]">
                        Student Details
                      </h3>
                      <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                        {[
                          ['Roll Number', rollValue || result.rollNumber],
                          ['Name', result.candidateName],
                          ['Student CNIC/Passport No/B-Form', result.cnic || 'N/A'],
                          ['Test Type', category.label.includes('MDCAT') ? 'Medical' : category.label.includes('NEB') ? 'Foreign Graduates' : 'Medical'],
                          ['Graduation Type', category.label.includes('NEB') ? 'Foreign' : 'Foreign'],
                        ].map(([label, value]) => (
                          <div key={label} className="grid grid-cols-[190px_1fr] gap-4 py-4 md:grid-cols-[225px_1fr]">
                            <div className="text-[15px] font-bold leading-6 text-pmdcInk md:text-[17px]">{label}</div>
                            <div className="text-[15px] leading-6 text-pmdcInk md:text-[17px]">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="border-b-[5px] border-pmdcInk pb-0.5 text-[26px] font-normal leading-none text-pmdcInk md:text-[34px]">
                        Result
                      </h3>
                      <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                        {[
                          ['Test Month', result.session || 'N/A'],
                          ['Obtained Marks', `${result.obtainedMarks || 0}`],
                        ].map(([label, value]) => (
                          <div key={label} className="grid grid-cols-[190px_1fr] gap-4 py-4 md:grid-cols-[225px_1fr]">
                            <div className="text-[15px] font-bold leading-6 text-pmdcInk md:text-[17px]">{label}</div>
                            <div className="text-[15px] leading-6 text-pmdcInk md:text-[17px]">{value}</div>
                          </div>
                        ))}

                        <div className="grid grid-cols-[190px_1fr] gap-4 py-4 md:grid-cols-[225px_1fr]">
                          <div className="text-[15px] font-bold leading-6 text-pmdcInk md:text-[17px]">Result Status</div>
                          <div className="text-[15px] leading-6 text-pmdcInk md:text-[17px]">
                            <span className={`inline-flex rounded-[6px] px-3 py-1 text-[12px] font-semibold text-white ${statusTone}`}>
                              {result.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {result.remarks ? (
                        <p className="mt-6 max-w-[430px] text-[16px] leading-7 text-rose-500 md:text-[17px]">
                          {result.remarks}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
