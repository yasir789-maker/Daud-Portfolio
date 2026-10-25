import { useEffect, useState } from 'react'
import pharmacistImage from './assets/Pharmacist.png'
import profileImage from './assets/pharmacy.jpg'
import hospitalImage from './assets/Hospital.jpg'
import CertificatesSection from './CertificatesSection'

const CONTACT_CONFIG = {
  email: 'uh.2029@gmail.com',
  whatsappDisplayNumber: '03341112918',
  whatsappInternationalNumber: '923341112918',
}

const Arrow = () => <span aria-hidden="true">↗</span>
const Pin = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12A7 7 0 1 0 5 9c0 5.9 7 12 7 12Z" /><circle cx="12" cy="9" r="2.2" /></svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
)
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.8a8.2 8.2 0 1 1 16-3.5Z" /><path d="M8.5 8.1c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.3 1.6 2.2 2.1.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5-.1.6-.4 1.2-.9 1.5-.5.4-1.1.5-1.7.4-1.1-.2-2.4-.9-3.7-2.1-1.4-1.3-2.2-2.7-2.5-3.8-.2-.7 0-1.4.4-2Z" /></svg>
)
const Cross = () => <span className="ornament" aria-hidden="true">✦</span>

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const links = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Qualifications', id: 'qualifications' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ]

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visibleSection) setActive((visibleSection.target as HTMLElement).id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.3, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavigation = (id: string) => {
    setActive(id)
    setOpen(false)
  }

  const renderLinks = (mobile = false) =>
    links.map(({ label, id }) => (
      <a
        key={id}
        className={`nav-link${active === id ? ' active' : ''}`}
        href={`#${id}`}
        aria-current={active === id ? 'location' : undefined}
        tabIndex={mobile && !open ? -1 : 0}
        onClick={() => handleNavigation(id)}
      >
        {label}
      </a>
    ))

  return (
    <header className="header">
      <a className="brand" href="#home" aria-label="Daud Ahmad home" onClick={() => handleNavigation('home')}>
        <span className="brand-mark"><span>DA</span></span>
        <span className="brand-copy"><strong>Daud Ahmad</strong><small>DISPENSING TECHNICIAN</small></span>
      </a>
      <nav className="nav desktop-nav" aria-label="Main navigation">{renderLinks()}</nav>
      <a className="nav-cta desktop-cta" href="#contact" onClick={() => handleNavigation('contact')}>
        Let's Talk
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </a>
      <button
        className={`menu-btn${open ? ' is-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
      >
        <span /><span />
      </button>
      <div id="mobile-navigation" className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-nav" aria-label="Mobile navigation">{renderLinks(true)}</nav>
        <a
          className="nav-cta mobile-cta"
          href="#contact"
          tabIndex={open ? 0 : -1}
          onClick={() => handleNavigation('contact')}
        >
          Let's Talk
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      </div>
    </header>
  )
}
const SectionHead = ({ number, label, title }: { number: string; label: string; title: string }) => (
  <div className="section-head">
    <p className="kicker">{number} / {label}</p>
    <h2>{title}</h2>
  </div>
)

function App() {
  const [card, setCard] = useState(0)
  const skills = ['Medication Dispensing', 'Pharmacy Operations', 'Patient Care', 'Accuracy & Safety']
  const qualificationCards = [
    <article className="qualification primary" key="one">
      <span className="card-icon">Rx</span><p className="card-no">QUALIFICATION / 01</p>
      <h3>Dispensing Technician</h3><p className="institution">Punjab Medical Faculty</p>
      <dl><div><dt>Examination</dt><dd>June 2024</dd></div><div><dt>Result</dt><dd>Pass</dd></div><div><dt>Marks</dt><dd>361 / 600</dd></div><div><dt>Percentage</dt><dd>60.17%</dd></div></dl>
    </article>,
    <article className="qualification" key="two">
      <span className="card-icon">Ⅱ</span><p className="card-no">EDUCATION / 02</p>
      <h3>Intermediate —<br />Pre-Medical</h3><p className="institution">Govt. Zamindar Postgraduate College, Gujrat</p>
      <dl><div><dt>Examination</dt><dd>Annual 2020</dd></div><div><dt>Marks</dt><dd>569</dd></div></dl>
    </article>,
    <article className="qualification" key="three">
      <span className="card-icon">Ⅲ</span><p className="card-no">EDUCATION / 03</p>
      <h3>Secondary School Certificate — Science</h3><p className="institution">Govt. Public High School No. 1, Gujrat</p>
      <dl><div><dt>Examination</dt><dd>Annual 2018</dd></div><div><dt>Grade</dt><dd>A</dd></div><div><dt>Board</dt><dd>BISE Gujranwala</dd></div></dl>
    </article>,
  ]

  const scrollCard = (next: number) => {
    const value = (next + 3) % 3
    setCard(value)
    document.getElementById(`qual-${value}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <div>
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="hero-photo">
            <img src={pharmacistImage} alt="Pharmacist working in a professional pharmacy setting" />
            <p className="vertical-copy">HEALTH / CARE / THROUGH / ACCURACY</p>
            <p className="photo-credit">Editorial image — not Daud Ahmad</p>
            <div className="scroll">SCROLL <span /></div>
          </div>
          <div className="hero-copy">
            <Cross /><p className="kicker">Professional Portfolio</p>
            <h1>Daud Ahmad</h1><p className="gold-title">Dispensing Technician</p>
            <p className="hero-statement">A Career Built on Knowledge,<br />Care &amp; Responsibility.</p>
            <p className="intro">A healthcare professional with a documented Dispensing Technician qualification, hospital training, and pharmacy-related experience.</p>
            <div className="actions"><a className="button primary-btn" href="#qualifications">Explore My Qualifications <Arrow /></a><a className="text-link" href="#experience">View Experience <Arrow /></a><a className="text-link" href="#contact">Contact Me <Arrow /></a></div>
            <div className="location"><Pin /> Gujrat, Punjab, Pakistan</div><span className="ghost-da">DA</span>
          </div>
        </section>

        <div className="marquee" aria-label="Key skills and focus">
          <span className="marquee-label">Key Skills &amp; Focus</span>
          <div className="marquee-window"><div className="marquee-track">
            {[...skills, ...skills].map((skill, i) => <span key={`${skill}-${i}`}><i>✦</i>{skill}</span>)}
          </div></div>
        </div>

        <section className="profile section" id="about">
          <div className="profile-copy">
            <SectionHead number="01" label="Professional Profile" title="A Professional Journey Rooted in Learning and Service." />
            <p>Daud Ahmad holds a Dispensing Technician qualification from Punjab Medical Faculty and completed documented training at Aziz Bhatti Shaheed Teaching Hospital, Gujrat. His supplied employment certificate records pharmacy-related work at Irfan Hospital. His professional profile reflects formal study, practical training, and experience in a healthcare setting.</p>
            <a className="text-link bold" href="#qualifications">Learn More About Me <Arrow /></a>
          </div>
          <figure className="profile-photo"><img src={profileImage} alt="Pharmacy interior with medicine shelves" /><figcaption>Editorial image — not Daud Ahmad</figcaption></figure>
          <div className="highlights">
            <article><b>01</b><div><small>Qualification</small><h3>Dispensing Technician</h3><p>Punjab Medical Faculty<br />June 2024 Examination</p></div></article>
            <article><b>02</b><div><small>Clinical Training</small><h3>Hospital Training</h3><p>Aziz Bhatti Shaheed Teaching Hospital, Gujrat<br />2021–2023 session</p></div></article>
            <article><b>03</b><div><small>Professional Experience</small><h3>Pharmacy-related experience</h3><p>Irfan Hospital<br />As documented in supplied certificate</p></div></article>
          </div>
        </section>

        <section className="qualifications section" id="qualifications">
          <SectionHead number="02" label="Education & Qualifications" title="Academic Foundations. Professional Qualification." />
          <div className="cards">
            {qualificationCards.map((content, i) => <div id={`qual-${i}`} key={i}>{content}</div>)}
          </div>
          <div className="carousel-nav"><button onClick={() => scrollCard(card - 1)} aria-label="Previous qualification">←</button><span>{card + 1} / 3</span><button onClick={() => scrollCard(card + 1)} aria-label="Next qualification">→</button></div>
        </section>

        <section className="training section">
          <SectionHead number="03" label="Practical Training" title="Learning Through Structured Hospital Training." />
          <div className="training-panel">
            <img src={hospitalImage} alt="Aziz Bhatti Shaheed Teaching Hospital in Gujrat" />
            <div className="training-main"><p className="kicker">Documented Hospital Training</p><h3>Aziz Bhatti Shaheed<br />Teaching Hospital</h3><p>Gujrat, Punjab, Pakistan</p><strong>01 JAN 2022 <span>—</span> 31 DEC 2023</strong></div>
            <div className="training-details">
              <p><span>Training period</span>1 Jan 2022 – 31 Dec 2023</p><p><span>Session</span>2021–2023</p><p><span>Attendance</span>Regular</p><p><span>Conduct</span>Good</p>
              <small>Information presented from the supplied training certificate.</small>
            </div>
          </div>
        </section>

        <section className="experience section" id="experience">
          <SectionHead number="04" label="Professional Experience" title="Experience & Professional Development." />
          <div className="experience-grid">
            <article className="experience-card"><span className="exp-icon">01</span><div><p className="kicker">01 Jul 2024</p><h3>Pharmacy Technician / Dispenser</h3><h4>Irfan Hospital</h4><p>Employment is recorded as ongoing in a certificate dated 15 December 2025. Current employment status has not been independently confirmed.</p></div></article>
            <article className="experience-card"><span className="exp-icon">02</span><div><p className="kicker">Date Not Specified</p><h3>Junior Technician (Dispenser)</h3><h4>Punjab Employees Social Security Institution (PESSI)</h4><ul><li>Designation: Junior Technician (Dispenser)</li><li>Scale: PPG-06 / BPS-09</li><li>Reference: SSBHU-SIE, Gujrat</li></ul><p className="note">The available document does not establish the joining date, agreement start date, or current employment status.</p></div></article>
          </div>
        </section>

        <CertificatesSection />

        

        <section className="contact section" id="contact">
  <div className="contact-layout">
    <div className="contact-copy">
      <p className="kicker contact-eyebrow">{'GET IN TOUCH \u00b7 DAUD AHMAD'}</p>
      <h2>Every Connection Begins with a Conversation.</h2>
      <p className="contact-description">{'Whether you have a professional opportunity, a question about my qualifications, or would like to discuss my experience, I\u2019d be glad to hear from you.'}</p>
      <div className="location light"><Pin /> Gujrat, Punjab, Pakistan</div>
      <div className="contact-copy-divider" aria-hidden="true" />
      <p className="contact-closing">OPEN TO PROFESSIONAL ENQUIRIES</p>
    </div>
    <aside className="contact-panel" aria-labelledby="contact-panel-title">
      <div className="contact-panel-art" aria-hidden="true"><span className="contact-panel-monogram">DA</span><span className="contact-panel-arch" /></div>
      <p className="contact-panel-label">{'LET\u2019S START A CONVERSATION'}</p>
      <h3 id="contact-panel-title">Have Something in Mind?</h3>
      <p className="contact-panel-copy">For professional enquiries, feel free to reach out using either contact option below.</p>
      <div className="contact-card-list">
        <a className="contact-card" href={`mailto:${CONTACT_CONFIG.email}`}>
          <span className="contact-card-icon"><MailIcon /></span>
          <span className="contact-card-text"><small>EMAIL</small><strong>Email Daud</strong><span>{CONTACT_CONFIG.email}</span></span>
          <Arrow />
        </a>
        <a className="contact-card" href={`https://wa.me/${CONTACT_CONFIG.whatsappInternationalNumber}`} target="_blank" rel="noopener noreferrer">
          <span className="contact-card-icon"><WhatsAppIcon /></span>
          <span className="contact-card-text"><small>WHATSAPP</small><strong>Start a conversation</strong><span>{CONTACT_CONFIG.whatsappDisplayNumber}</span></span>
          <Arrow />
        </a>
      </div>
      <div className="contact-panel-location"><Pin /><span>Gujrat, Punjab, Pakistan</span></div>
    </aside>
  </div>
</section>
      </main>
      <footer className="site-footer">
        <div className="footer-signature" aria-hidden="true">DA</div>
        <div className="footer-ornament" aria-hidden="true" />
        <div className="footer-main">
          <div className="footer-brand-block">
            <div className="footer-brand">
              <span className="footer-monogram">DA</span>
              <span className="footer-brand-copy"><strong>Daud Ahmad</strong><small>DISPENSING TECHNICIAN</small></span>
            </div>
            <p className="footer-tagline">{'Care \u2022 Knowledge \u2022 Service'}</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {['Home', 'About', 'Qualifications', 'Experience', 'Contact'].map(x => <a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}
          </nav>
          <div className="footer-location-block">
            <p className="footer-location"><Pin /><span>Gujrat, Punjab, Pakistan</span></p>
            <small className="footer-caption">PROFESSIONAL PORTFOLIO</small>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Daud Ahmad. All rights reserved.</span>
          <b>{'CARE \u2022 KNOWLEDGE \u2022 SERVICE'}</b>
        </div>
      </footer>
    </div>
  )
}

export default App
