import { ArrowRight } from 'lucide-react'

const serviceCards = [
  {
    title: 'Registration Online',
    text: 'An Online Portal for our Doctors to cater their regulatory requirements so they can primarily focus of healthcare of the mankind. All Registrations, Credentialing, Verification & Licensing needs can be addressed in minutes through your Digital Platform.',
    icon: '/pmdc-assets/doctors-online.svg',
    href: 'https://portal.pmdc.pk/',
    buttons: ['Click Here'],
    tone: 'light',
    badge: 'New!',
  },
  {
    title: 'Other Services',
    text: 'Restoration of Deleted Basic Postgraduate Qualifications, Attestation/Verification of License or Certificate of Good Standing, Verification of CT Form OR Verification of Practical Experience/CGS(ECFMG/EPIC)',
    icon: '/pmdc-assets/student-online.svg',
    href: 'https://online-dev777.pmdc.pk/Account/Login',
    buttons: ['Click Here'],
    tone: 'dark',
  },
  {
    title: 'EXAM REGISTRATION',
    text: 'An interactive portal for the Registration of NEB & MDCAT',
    icon: '/pmdc-assets/license-online.svg',
    href: 'https://nre.pmdc.pk/',
    buttons: ['Click Here for NRE', 'Click Here for NEB', 'Link for ECFMG Official Website'],
    tone: 'dark',
  },
  {
    title: 'Institution Online',
    text: 'A Single Portal for Colleges & Universities to have an effective communication with the Council and to enable timely processing of our students and doctors registration and Licensing needs.',
    icon: '/pmdc-assets/institution-online.svg',
    href: 'https://institutions.pmdc.pk/',
    buttons: ['Click Here'],
    tone: 'light',
  },
]

export default function HeroSection() {
  return (
    <>
      <section
        className="h-[300px] bg-cover bg-center sm:h-[430px] lg:h-[700px]"
        style={{ backgroundImage: 'url(/pmdc-assets/home-banner.jpg)', backgroundPosition: 'left center' }}
        aria-label="PMDC homepage banner"
      />

      <section className="bg-[#E7EFFD] pb-0 lg:pb-6">
        <div className="pmdc-container px-4">
          <div className="-mt-10 grid w-full grid-cols-1 overflow-hidden shadow-sm sm:-mt-20 lg:-mt-[220px] lg:grid-cols-2">
            {serviceCards.map((card) => {
              const dark = card.tone === 'dark'
              return (
                <article key={card.title} className={`${dark ? 'bg-pmdcGray text-white' : 'bg-white text-pmdcInk'} min-w-0 p-6 md:p-10`}>
                  <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-[92px_1fr]">
                    <div>
                      <img src={card.icon} alt="" className="h-16 w-16 object-contain md:h-20 md:w-20" />
                    </div>
                    <div className="service-card-copy min-w-0 pmdc-wrap">
                      <div className="flex flex-wrap items-start gap-3">
                        <h2 className="text-2xl font-bold leading-tight md:text-[30px]">{card.title}</h2>
                        {card.badge ? <span className="bg-pmdcLight px-4 py-1.5 text-sm font-semibold text-white">{card.badge}</span> : null}
                      </div>
                      <p className={`mt-4 leading-7 ${dark ? 'text-white/95' : 'text-pmdcInk/80'}`}>{card.text}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {card.buttons.map((button) => (
                          <a
                            key={button}
                            href={card.href}
                            target={card.href.startsWith('http') ? '_blank' : undefined}
                            rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                            className="pmdc-button text-left text-sm"
                          >
                            {button}
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
