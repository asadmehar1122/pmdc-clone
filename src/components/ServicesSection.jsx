const instituteBlocks = [
  {
    title: 'Institutions & Qualifications',
    text: '',
    icon: '/pmdc-assets/institutes.svg',
    href: '#',
  },
  {
    title: 'Pakistan Medical & Dental Council Act 2022',
    text: '',
    icon: '/pmdc-assets/collage-grading.svg',
    href: '#',
  },
  {
    title: 'Complaints against Doctors',
    text: 'To Register a Complaint of professional negligence/misconduct against any licensed Doctor',
    icon: '/pmdc-assets/seats.svg',
    href: '/contact',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-cover bg-center py-14 text-white md:py-20"
      style={{ backgroundImage: 'linear-gradient(rgba(10, 101, 160, 0.88), rgba(10, 101, 160, 0.88)), url(/pmdc-assets/recognized-banner.jpg)' }}
    >
      <div className="container-large px-4">
        <div className="grid lg:grid-cols-3">
          {instituteBlocks.map((block, index) => (
            <a
              key={block.title}
              href={block.href}
              className={`block px-6 py-8 text-center text-white md:px-10 md:py-12 ${
                index === 0 ? '' : 'border-t border-white/70 lg:border-l lg:border-t-0'
              }`}
            >
              <img src={block.icon} alt="" className="mx-auto h-14 w-14 object-contain md:h-16 md:w-16" />
              <h2 className="mx-auto mt-7 max-w-md text-2xl font-bold leading-snug md:text-[28px]">{block.title}</h2>
              {block.text ? <p className="mx-auto mt-4 max-w-md leading-7 text-white/90">{block.text}</p> : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
