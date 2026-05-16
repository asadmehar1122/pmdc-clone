import { ArrowRight } from 'lucide-react'

const links = [
  'Pakistan Medical & Dental Council Act 2022',
  'Experience',
  'Accreditation Standards',
  'Undergraduate Colleges',
  'Laws & Regulations',
  'Syllabi',
]

export default function QuickLinksSection() {
  return (
    <section
      id="quick-links"
      className="my-12 bg-cover bg-center py-8 md:my-16"
      style={{ backgroundImage: 'url(/pmdc-assets/quick-links-banner.png)' }}
    >
      <div className="pmdc-container px-4">
        <div className="max-w-[650px]">
          <h2 className="mb-8 text-3xl font-bold text-pmdcInk md:text-[42px]">Quick Links</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="relative flex min-h-[130px] items-end bg-pmdcGray p-5 text-base font-semibold leading-snug text-white hover:bg-pmdcSky md:h-[150px]"
              >
                <img src="/pmdc-assets/link-icon.png" alt="" className="absolute right-5 top-5 h-9 w-9" />
                <span>
                  {link} <ArrowRight className="inline h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
