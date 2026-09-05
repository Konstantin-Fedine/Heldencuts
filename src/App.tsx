import './App.css'

import { useState } from 'react'

type Language = 'en' | 'de'
const logoUrl = 'https://yt3.googleusercontent.com/1-ogLuF1n4VozrtukmNEZXi9WVRKfKVgzrtKx3uTHPDEOwACojLSecn1QJUaEjJWy2wyOqRXZRA=s160-c-k-c0x00ffffff-no-rj'

const copy = {
  en: {
    nav: ['Work-Showoff', 'Profile', 'Process', 'FAQ'],
    heroKicker: '',
    heroTitle: 'Grow your Audience through\nViral Editing.',
    heroText: '',
    primary: 'Boost Views',
    secondary: 'Explore Work',
    scroll: 'Scroll to explore',
    workEyebrow: 'Work-Showoff',
    workTitle: 'Explore My Work',
    workText: 'Browse through a collection of Client Videos I have worked on.',
    viewWork: 'View',
    aboutEyebrow: 'Profile',
    aboutTitle: 'About Me',
    aboutText: 'I am Heldenhuf, a video editor focused on engaging editing that helps brands and creators grow their audience.',
    details: [['Languages', 'English + German'], ['Style', 'Clean / modern / minimal'], ['Software', 'DaVinci / Alight Motion / CapCut']],
    ratingsEyebrow: 'Client-Ratings',
    ratingsTitle: 'Read Client Reviews',
    processEyebrow: 'Process',
    processTitle: 'View The Workflow',
    faqEyebrow: 'FAQ',
    faqTitle: 'Frequently Asked',
    contactEyebrow: 'Contacts',
    contactTitle: 'Get In Touch',
    contactText: 'Get in touch via email or Discord, and we can discuss your project.',
    email: 'Contact',
    discord: 'Message',
    contactEmail: 'heldenhuf@gmx.net',
    contactDiscord: 'heldenhuf',
    hireQuestion: 'How can I hire you?',
    hireAnswer: 'Simply get in touch via email or Discord, and we can discuss your project.',
    footer: 'High-quality video editing that helps brands and creators grow their audience.',
  },
  de: {
    nav: ['Arbeiten', 'Profil', 'Ablauf', 'FAQ'],
    heroKicker: '',
    heroTitle: 'Wachse mit deinem Publikum durch\nvirales Editing.',
    heroText: '',
    primary: 'Aufrufe steigern',
    secondary: 'Arbeiten ansehen',
    scroll: 'Mehr entdecken',
    workEyebrow: 'Arbeiten',
    workTitle: 'Meine Arbeiten entdecken',
    workText: 'Eine Auswahl an Client-Videos, an denen ich gearbeitet habe.',
    viewWork: 'Ansehen',
    aboutEyebrow: 'Profil',
    aboutTitle: 'Über mich',
    aboutText: 'Ich bin Heldenhuf, Video-Editor mit Fokus auf engagierende Edits, die Marken und Creator beim Wachstum unterstützen.',
    details: [['Sprachen', 'Deutsch + Englisch'], ['Stil', 'Clean / modern / minimal'], ['Software', 'DaVinci / Alight Motion / CapCut']],
    ratingsEyebrow: 'Kundenstimmen',
    ratingsTitle: 'Kundenbewertungen lesen',
    processEyebrow: 'Ablauf',
    processTitle: 'Workflow ansehen',
    faqEyebrow: 'FAQ',
    faqTitle: 'Häufig gefragt',
    contactEyebrow: 'Kontakt',
    contactTitle: 'Kontakt aufnehmen',
    contactText: 'Schreib mir per E-Mail oder Discord, damit wir dein Projekt besprechen können.',
    email: 'Kontakt',
    discord: 'Nachricht senden',
    contactEmail: 'heldenhuf@gmx.net',
    contactDiscord: 'heldenhuf',
    hireQuestion: 'Wie kann ich dich beauftragen?',
    hireAnswer: 'Schreib mir einfach per E-Mail oder Discord, dann können wir dein Projekt besprechen.',
    footer: 'Hochwertiges Video-Editing für Marken und Creator.',
  },
} as const

const projects = [
  { number: '01', title: 'Client videos', label: 'Long-form / Short-form', path: '/client-videos', image: 'https://framerusercontent.com/images/5xMsQjirVBhcmekNNZHcE5kEmLk.jpg?width=1280&height=720', className: 'project-large' },
  { number: '02', title: 'Motion design', label: 'Custom animation', path: '/motion-design', image: 'https://framerusercontent.com/images/myVSu7VZkI731LPsPuDqVryQQc.png?scale-down-to=1024&width=1326&height=742', className: '' },
  { number: '03', title: 'Thumbnails', label: 'Visual direction', path: '/thumbnails', image: 'https://framerusercontent.com/images/ZwLu6RlLiKW0Q81YTc7SokzoTM.jpeg?width=2388&height=1339', className: '' },
]

const clientVideos = [
  ['Mini-Top', 'YouTuber', '12-6-2025'],
  ['Meshy AI', 'Brand', '10-7-2026'],
  ['Reeen96', 'Streamer & YouTuber', '9-3-2026'],
  ['SirKobold', 'YouTuber', '26-7-2026'],
]

const testimonials = [
  ['Reeen96', 'Streamer & YouTuber', 'Heldenhuf is a great editor who completes his work quickly and carefully.', 'https://www.youtube.com/@Reeen96'],
  ['Mini-Top', '300k+ YouTuber', 'As always your editing is crazy! I swear I like your style so much.', 'https://www.youtube.com/@MiniTopBS'],
  ['SirKobold', 'YouTuber', 'Heldenhuf works very professional, and the videos were always finished very quickly.', 'https://www.youtube.com/@SirKobold'],
]

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>
}

function PortfolioPage({ path }: { path: string }) {
  const [language, setLanguage] = useState<Language>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const isClientVideos = path === '/client-videos'
  const isMotionDesign = path === '/motion-design'
  const title = isClientVideos ? (language === 'en' ? 'Client Videos' : 'Client-Videos') : isMotionDesign ? 'Motion Design' : 'Thumbnails'
  const description = isClientVideos
    ? (language === 'en' ? 'Browse through a collection of Client Videos I have worked on.' : 'Entdecke eine Auswahl an Client-Videos, an denen ich gearbeitet habe.')
    : isMotionDesign
      ? (language === 'en' ? 'Explore my Motion Design and Custom Animation Work.' : 'Entdecke meine Motion-Design- und Custom-Animation-Arbeiten.')
      : (language === 'en' ? "Discover Custom Thumbnail Designs I've made for Clients." : 'Entdecke individuelle Thumbnail-Designs, die ich für Kunden erstellt habe.')

  return <div className="site-shell portfolio-page">
    <header className="site-header"><a className="brand" href="/#home" aria-label="HeldenCuts home"><img src={logoUrl} alt="Heldenhuf logo" /> HeldenCuts</a><nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}><a href="/#work" onClick={() => setMenuOpen(false)}>Work-Showoff</a><a href="/#about" onClick={() => setMenuOpen(false)}>Profile</a><a href="/#process" onClick={() => setMenuOpen(false)}>Process</a><a href="/#faq" onClick={() => setMenuOpen(false)}>FAQ</a><a className="nav-contact" href="/#contact" onClick={() => setMenuOpen(false)}>Boost Views <Arrow /></a><div className="mobile-language-switcher"><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button><span>/</span><button className={language === 'de' ? 'active' : ''} onClick={() => setLanguage('de')}>DE</button></div></nav><div className="header-actions"><div className="language-switcher"><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button><span>/</span><button className={language === 'de' ? 'active' : ''} onClick={() => setLanguage('de')}>DE</button></div><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span></button></div></header>
    <main>
      <section className="portfolio-hero"><p className="eyebrow">{title}</p><h1>{title}</h1><p>{description}</p></section>
      <section className="portfolio-grid section">
        {isClientVideos ? clientVideos.map(([name, role, date], index) => <article className="portfolio-item" key={name}><div className="portfolio-media"><img src={projects[index % projects.length].image} alt={`${name} ${role}`} /><span className="portfolio-play" aria-hidden="true">▶</span></div><div className="portfolio-item-meta"><div><h2>{name}</h2><p>{role}</p></div><time>{date}</time></div></article>) : <article className="portfolio-item portfolio-feature"><div className="portfolio-media"><img src={isMotionDesign ? projects[1].image : projects[2].image} alt={title} /></div><div className="portfolio-item-meta"><div><h2>{title}</h2><p>{description}</p></div></div></article>}
      </section>
    </main>
    <footer className="site-footer"><div><a className="brand" href="/#home"><img src={logoUrl} alt="Heldenhuf logo" /> HeldenCuts</a><p>High-quality video editing that helps brands and creators grow their audience.</p></div><div className="footer-links"><a href="/#work">Work-Showoff</a><a href="/#contact">Contact</a></div><div className="footer-meta"><span>© 2026 Heldenhuf</span><a href="/#home">Back home</a></div></footer>
  </div>
}

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  if (pathname === '/client-videos' || pathname === '/motion-design' || pathname === '/thumbnails') {
    return <PortfolioPage path={pathname} />
  }

  const t = copy[language]

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="HeldenCuts home"><img src={logoUrl} alt="Heldenhuf logo" /> HeldenCuts</a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {t.nav.map((item, index) => <a key={item} href={['#work', '#about', '#process', '#faq'][index]} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>{t.primary} <Arrow /></a>
          <div className="mobile-language-switcher"><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button><span>/</span><button className={language === 'de' ? 'active' : ''} onClick={() => setLanguage('de')}>DE</button></div>
        </nav>
        <div className="header-actions">
          <div className="language-switcher" aria-label="Language selector">
            <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
            <span>/</span>
            <button className={language === 'de' ? 'active' : ''} onClick={() => setLanguage('de')}>DE</button>
          </div>
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span></button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid-pattern" aria-hidden="true"></div>
          <div className="hero-copy reveal">
            {t.heroKicker && <p className="eyebrow"><span className="status-dot"></span>{t.heroKicker}</p>}
            <p className="hero-byline">Heldenhuf — Video Editor</p>
            <h1>{t.heroTitle.split('\n').map((line, index) => <span key={line}>{index > 0 ? ' ' : ''}{line}</span>)}</h1>
            {t.heroText && <p className="hero-text">{t.heroText}</p>}
            <div className="hero-actions"><a className="button button-primary" href="#contact">{t.primary} <Arrow /></a><a className="text-link" href="#work">{t.secondary} <Arrow /></a></div>
          </div>
          <div className="hero-mark" aria-hidden="true"><span>HC</span><i></i><i></i><i></i></div>
          <div className="hero-footer"><span>01 / 04</span><span>{t.scroll} <b>↓</b></span><span>MMXXVI</span></div>
        </section>

        <section className="work section" id="work">
          <div className="section-heading"><div><p className="eyebrow">{t.workEyebrow}</p><h2>{t.workTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2></div><p className="section-intro">{t.workText}</p></div>
          <div className="project-grid">{projects.map((project) => <a className={`project-card ${project.className}`} href={project.path} key={project.number}><div className="project-image"><img src={project.image} alt={`${project.title} by HeldenCuts`} /><span className="project-number">{project.number}</span><span className="project-arrow"><Arrow /></span></div><div className="project-meta"><div><h3>{project.title}</h3><p>{project.label}</p></div><span>{t.viewWork}</span></div></a>)}</div>
        </section>

        <section className="about section" id="about"><div className="about-visual"><div className="portrait-placeholder"><span>H</span><small>HELDENHUF<br />VIDEO EDITOR</small></div><span className="vertical-label">HELDENHUF / 2026</span></div><div className="about-copy"><p className="eyebrow">{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2><p className="large-copy">{t.aboutText}</p><div className="detail-list">{t.details.map(([label, value]) => <div className="detail" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></section>

        <section className="ratings section" id="ratings"><div className="section-heading"><div><p className="eyebrow">{t.ratingsEyebrow}</p><h2>{t.ratingsTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2></div><span className="rating-symbol">“</span></div><div className="testimonial-grid">{testimonials.map(([name, role, quote, link]) => <a href={link} target="_blank" rel="noreferrer" className="testimonial" key={name}><div className="testimonial-top"><span className="avatar">{name[0]}</span><span className="quote-arrow"><Arrow /></span></div><p>“{quote}”</p><div><strong>{name}</strong><small>{role}</small></div></a>)}</div></section>

        <section className="process section" id="process"><div className="section-heading"><div><p className="eyebrow">{t.processEyebrow}</p><h2>{t.processTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2></div></div><div className="steps"><div className="step"><span>01</span><div><h3>{language === 'en' ? 'Share the footage' : 'Material teilen'}</h3><p>{language === 'en' ? 'Send the footage and tell me what you want it to feel like.' : 'Schick mir dein Material und erzähl mir, wie es sich anfühlen soll.'}</p></div></div><div className="step"><span>02</span><div><h3>{language === 'en' ? 'Edit & feedback' : 'Editing & Feedback'}</h3><p>{language === 'en' ? 'I shape the cut, then we refine it with your feedback.' : 'Ich forme den Cut und wir verfeinern ihn mit deinem Feedback.'}</p></div></div><div className="step"><span>03</span><div><h3>{language === 'en' ? 'Final delivery' : 'Finale Lieferung'}</h3><p>{language === 'en' ? 'Receive the finished files, ready to publish.' : 'Du erhältst die fertigen Dateien, bereit zum Veröffentlichen.'}</p></div></div></div></section>

        <section className="faq section" id="faq"><div><p className="eyebrow">{t.faqEyebrow}</p><h2>{t.faqTitle}</h2></div><div className="faq-list"><details open><summary>{language === 'en' ? 'What kind of videos do you edit?' : 'Welche Videos bearbeitest du?'}</summary><p>{language === 'en' ? 'Long-form and short-form content, no matter the niche.' : 'Long-Form- und Short-Form-Inhalte, unabhängig von der Nische.'}</p></details><details><summary>{language === 'en' ? 'How quickly can you deliver?' : 'Wie schnell kannst du liefern?'}</summary><p>{language === 'en' ? 'Depending on the project, turnaround typically ranges from two to fourteen days.' : 'Je nach Projekt dauert die Bearbeitung normalerweise zwei bis vierzehn Tage.'}</p></details><details><summary>{language === 'en' ? 'What is the price range?' : 'Was kostet ein Projekt?'}</summary><p>{language === 'en' ? 'Every project is different, so pricing is discussed individually.' : 'Jedes Projekt ist anders. Der Preis wird individuell besprochen.'}</p></details><details><summary>{t.hireQuestion}</summary><p>{t.hireAnswer}</p></details></div></section>

        <section className="contact section" id="contact"><div className="contact-inner"><p className="eyebrow">{t.contactEyebrow}</p><h2>{t.contactTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2><p>{t.contactText}</p><div className="contact-details"><div><span>E-Mail</span><a href="mailto:heldenhuf@gmx.net">{t.contactEmail}</a></div><div><span>Discord</span><strong>{t.contactDiscord}</strong></div></div><div className="contact-actions"><a className="button button-light" href="mailto:heldenhuf@gmx.net">{t.email} <Arrow /></a><a className="button button-outline" href="https://discord.gg/aFdQzYfwF" target="_blank" rel="noreferrer">{t.discord} <Arrow /></a></div></div><span className="contact-corner">HC / 06</span></section>
      </main>

      <footer className="site-footer"><div><a className="brand" href="#home"><img src={logoUrl} alt="Heldenhuf logo" /> HeldenCuts</a><p>{t.footer}</p></div><div className="footer-links"><a href="#work">{t.nav[0]}</a><a href="#about">{t.nav[1]}</a><a href="#contact">{t.primary}</a></div><div className="footer-meta"><span>© 2026 Heldenhuf</span><a href="/privacy-policy">Privacy</a><a href="/imprint">Terms</a></div></footer>
    </div>
  )
}

export default App
