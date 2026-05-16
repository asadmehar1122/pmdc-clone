import Head from 'next/head'
import { ArrowRight } from 'lucide-react'

const registrationCards = [
  {
    title: 'Doctor Registration',
    description: 'Online portal for doctors to manage registration, licensing, credentialing and verification.',
    href: 'https://portal.pmdc.pk/',
    icon: '/pmdc-assets/doctors-online.svg',
  },
  {
    title: 'Institution Online',
    description: 'A central portal for colleges and universities to manage communication and licensing workflows.',
    href: 'https://institutions.pmdc.pk/',
    icon: '/pmdc-assets/institution-online.svg',
  },
  {
    title: 'Exam Registration',
    description: 'Interactive access to NEB and NRE registration portals.',
    href: 'https://nre.pmdc.pk/',
    icon: '/pmdc-assets/license-online.svg',
  },
]

export default function RegistrationPage() {
  return (
    <>
      <Head>
        <title>Registration - PM&DC</title>
      </Head>

      <section
        className="bg-cover bg-center px-4 py-16 text-white md:py-24"
        style={{ backgroundImage: 'linear-gradient(rgba(10, 101, 160, 0.86), rgba(10, 101, 160, 0.86)), url(/pmdc-assets/inner-banner.png)' }}
      >
        <div className="pmdc-container">
          <h1 className="text-3xl font-bold md:text-[42px]">Registration Services</h1>
        </div>
      </section>

      <section className="bg-[#F1F4F7] px-4 py-12 md:py-16">
        <div className="pmdc-container">
          <div className="grid gap-5 lg:grid-cols-3">
            {registrationCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                className="block bg-white p-7 text-pmdcInk shadow-[0_3px_16px_rgb(0_0_0_/_10%)] transition hover:text-pmdcSky"
              >
                <img src={card.icon} alt="" className="h-16 w-16 object-contain" />
                <h2 className="mt-6 text-2xl font-bold">{card.title}</h2>
                <p className="mt-4 min-h-[90px] leading-7 text-pmdcInk/75">{card.description}</p>
                <span className="pmdc-button mt-5">
                  Click Here <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
