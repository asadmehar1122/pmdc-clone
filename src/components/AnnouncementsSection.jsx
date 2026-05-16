import { ArrowRight } from 'lucide-react'

const announcements = [
  {
    date: '05/14/2026 04:54:01 PM',
    title: 'PUBLIC NOTICE REGARDING STUDENTS SEEKING ADMISSION IN FOREIGN UNDERGRADUATE MEDICAL / DENTAL INSTITUTIONS',
    href: '#',
  },
  {
    date: '05/11/2026 12:46:20 PM',
    title: 'Fake: PMDC Guidelines for Physicians',
    href: '#',
  },
  {
    date: '04/29/2026 03:12:46 PM',
    title: 'Public Notice Regarding Extension of NRE Step-I Online Registration Portal',
    href: '#',
  },
  {
    date: '04/22/2026 12:30:19 PM',
    title: 'Public Notice Regarding Extension of NEB Online Registration Portal',
    href: '#',
  },
]

export default function AnnouncementsSection() {
  return (
    <section id="announcements" className="bg-[#F1F4F7] py-12 md:py-20">
      <div className="container-large px-4">
        <h2 className="mb-10 text-3xl font-bold text-pmdcInk md:mb-14 md:text-[42px]">Public Announcements</h2>

        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
          <article>
            <div className="relative">
              <img
                src="/pmdc-assets/announcements-img.jpg"
                alt=""
                className="h-[260px] w-full object-cover md:h-[300px]"
              />
              <div className="absolute left-5 top-5 flex h-[85px] w-[85px] flex-col items-center justify-center bg-white text-center text-xl font-bold leading-none text-pmdcBlue">
                23
                <span className="mt-1 text-sm font-normal">Feb</span>
              </div>
            </div>
            <div className="bg-white px-5 py-7 md:px-6 md:pb-12">
              <h3 className="flex items-center gap-3 text-sm font-semibold text-pmdcBlue">
                <img src="/pmdc-assets/folder-icon.svg" alt="" className="h-5 w-5" />
                Landmark Achievement
              </h3>
              <h4 className="mt-5 text-[22px] font-bold leading-snug text-pmdcInk">
                PM&DC Achieves Accreditation from World Federation for Medical Education (WFME)
              </h4>
              <p className="mt-4 leading-7 text-pmdcInk/75">
                This recognition underscores PM&DC's commitment to ensuring the highest standards of medical education within Pakistan.
              </p>
              <a href="#" className="mt-5 inline-flex items-center gap-2 font-bold text-pmdcInk hover:text-pmdcSky">
                Read More <ArrowRight className="h-4 w-4 text-pmdcBlue" />
              </a>
            </div>
          </article>

          <div className="space-y-8 md:space-y-10">
            {announcements.map((item) => (
              <article key={item.title} className="grid gap-4 md:grid-cols-[100px_1fr]">
                <div className="flex h-20 w-20 items-center justify-center rounded-[5px] bg-pmdcLight md:mx-auto">
                  <img src="/pmdc-assets/megaphone.svg" alt="" className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="mb-3 text-[13px] font-semibold text-pmdcBlue">Last Updated: {item.date}</h3>
                  <p className="text-base leading-7 text-pmdcInk">
                    <a href={item.href} className="hover:text-pmdcSky">
                      {item.title}
                    </a>
                  </p>
                </div>
              </article>
            ))}

            <div className="flex justify-center pt-1">
              <a href="#" className="pmdc-button">
                View More <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
