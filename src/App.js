import { useEffect, useRef, useState } from 'react';
import './App.css';

const PROJECTS = [
  {
    title: 'Customer Churn Analysis',
    status: 'Ongoing',
    tech: ['Python', 'SQL', 'Power BI'],
    bullets: [
      'Analyzing an e-commerce sales dataset with Python and SQL to understand customer purchasing behaviour and sales trends.',
      'Data cleaning, preprocessing, and EDA to produce business insights.',
      'Interactive Power BI dashboards for sales performance, segmentation, and revenue.',
      'Statistical analysis to spot high-value customers and sales drivers for data-driven decisions.',
    ],
  },
  {
    title: 'Medix – Healthcare Platform',
    duration: 'Six months',
    tech: ['HTML', 'CSS', 'JavaScript', 'React.js', 'MongoDB'],
    bullets: [
      'Full-stack healthcare platform: patients connect with doctors, book appointments, and manage digital health records securely.',
      'Secure authentication and role-based access for patients, doctors, and administrators.',
      'Responsive React dashboards and a centralized admin panel for users and appointments.',
      'Real-time communication to improve doctor–patient interaction.',
      'Optimized MongoDB with emphasis on security, performance, scalability, and reliability.',
    ],
    achievements: [
      'End-to-end platform that simplified booking and digital medical records.',
      'Stronger security via auth and RBAC; optimized MongoDB for faster storage and retrieval.',
      'React dashboards and admin panel improved UX and operational management.',
    ],
  },
  {
    title: 'FreshVeggies – E-commerce Frontend',
    duration: 'Three months',
    tech: ['HTML', 'CSS', 'JavaScript'],
    bullets: [
      'Responsive e-commerce site with dynamic product listings and INR pricing.',
      'Clean layout focused on usability and UX.',
      'Hands-on practice with frontend patterns and basic e-commerce flows.',
    ],
    achievements: [
      'Mobile-responsive vegetable shop UI with dynamic listings.',
      'Sharpened frontend, UI design, and e-commerce fundamentals.',
    ],
  },
];

function motionReduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroParallaxRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let reduced = motionReduced();

    const applyParallax = (y) => {
      const root = heroParallaxRef.current;
      if (!root || reduced) return;
      const gridLayer = root.querySelector('.hero__parallax-layer--grid');
      const glowLayer = root.querySelector('.hero__parallax-layer--glow');
      if (gridLayer) gridLayer.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
      if (glowLayer) glowLayer.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
    };

    const clearParallax = () => {
      heroParallaxRef.current?.querySelectorAll('.hero__parallax-layer').forEach((el) => {
        el.style.transform = '';
      });
    };

    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 24);
      setShowBackTop(y > 520);
      applyParallax(y);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = documentHeight > 0 ? (y / documentHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => {
      reduced = mq.matches;
      if (reduced) clearParallax();
      else applyParallax(window.scrollY);
    };

    onScroll();
    mq.addEventListener('change', onMq);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      mq.removeEventListener('change', onMq);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal-on-scroll, .reveal-stagger');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      setCurrentTime(time);
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="site">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="time-display">{currentTime}</div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="loading-spinner-ring"></div>
            <div className="loading-spinner-ring"></div>
            <div className="loading-spinner-ring"></div>
            <div className="loading-center">
              <div className="loading-dot"></div>
            </div>
          </div>
          <p className="loading-text">Loading Portfolio</p>
        </div>
      )}

      <header className={`top-nav${navScrolled ? ' top-nav--scrolled' : ''}`}>
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} aria-hidden></div>
        <div className="top-nav__inner top-nav__inner--nav-only">
          <nav className="nav-links" aria-label="Primary">
            <button type="button" onClick={() => scrollTo('projects')}>
              Projects
            </button>
            <button type="button" onClick={() => scrollTo('internship')}>
              Internship
            </button>
            <button type="button" onClick={() => scrollTo('certs')}>
              Certifications
            </button>
            <button type="button" onClick={() => scrollTo('contact')}>
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="hero" className="hero" aria-labelledby="hero-heading">
          <div className="hero__orb hero__orb--a" aria-hidden />
          <div className="hero__orb hero__orb--b" aria-hidden />
          <div className="hero__orb hero__orb--c" aria-hidden />
          <div className="hero__parallax" ref={heroParallaxRef}>
            <div className="hero__parallax-layer hero__parallax-layer--grid" aria-hidden>
              <div className="hero__grid" />
            </div>
            <div className="hero__parallax-layer hero__parallax-layer--glow" aria-hidden>
              <div className="hero__glow" />
            </div>
          </div>
          <div className="hero__content">
            <h1 id="hero-heading" className="hero__title hero-intro hero-intro--1">
              <span className="hero__title-gradient">Abdul Maner</span>
            </h1>
            <p className="hero__subtitle hero-intro hero-intro--2">
              Entry-level developer and analyst focused on Python, SQL, Power BI, and modern web
              stacks. I like solving real problems and learning tools that make data and products
              clearer.
            </p>
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="section__title reveal-on-scroll">
            Projects
          </h2>
          <div className="grid grid--projects">
            {PROJECTS.map((p) => (
              <article key={p.title} className="card card--scroll reveal-on-scroll">
                <div className="card__head">
                  <h3 className="card__title">{p.title}</h3>
                  <div className="card__meta">
                    {p.status && <span className="badge badge--accent">{p.status}</span>}
                    {p.duration && <span className="badge">{p.duration}</span>}
                  </div>
                  <ul className="tech-row" aria-label="Technologies">
                    {p.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <ul className="bullet-list reveal-stagger">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {p.achievements && (
                  <>
                    <h4 className="card__subhead">Achievements</h4>
                    <ul className="bullet-list bullet-list--compact reveal-stagger">
                      {p.achievements.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="internship" className="section panel" aria-labelledby="internship-heading">
          <h2 id="internship-heading" className="section__title reveal-on-scroll">
            Internship
          </h2>
          <article className="timeline-card reveal-on-scroll">
            <div className="timeline-card__head">
              <h3>Python Intern – ZInovat Pvt. Ltd.</h3>
              <span className="badge">One month</span>
            </div>
            <ul className="bullet-list reveal-stagger">
              <li>Applied core Python: variables, loops, and functions on practical tasks.</li>
              <li>Used NumPy and Pandas to clean, process, and analyse structured datasets.</li>
              <li>
                Data filtering, transformation, and validation for accuracy and consistency.
              </li>
            </ul>
          </article>
        </section>

        <section id="certs" className="section" aria-labelledby="certs-heading">
          <h2 id="certs-heading" className="section__title reveal-on-scroll">
            Certifications
          </h2>
          <ul className="cert-list reveal-stagger cert-stagger">
            <li>
              <strong>Python</strong> (Basic to Intermediate) – variables, types, loops, functions,
              NumPy, Pandas.
            </li>
            <li>
              <strong>AWS Architecture</strong> – cloud fundamentals; scalable, secure, cost-aware
              designs using EC2, S3, RDS, and related core services.
            </li>
          </ul>
        </section>

        <section id="contact" className="section section--contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="section__title reveal-on-scroll">
            Contact
          </h2>
          <ul className="contact-list reveal-on-scroll">
            <li>
              <span className="contact-list__label">Email</span>
              <a href="mailto:abdulmaner12@gmail.com">abdulmaner127@gmail.com</a>
            </li>
            <li>
              <span className="contact-list__label">Phone</span>
              <a href="tel:+918767977477">+91 8767870440</a>
            </li>
            <li>
              <span className="contact-list__label">LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/abdul-maner-25m/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abdul Maner
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer reveal-on-scroll">
        <p>© {new Date().getFullYear()} Abdul Maner · Portfolio · Crafted with React</p>
      </footer>

      <button
        type="button"
        className={`back-top${showBackTop ? ' back-top--visible' : ''}`}
        onClick={() => scrollTo('hero')}
        aria-label="Back to top"
      >
        <svg className="back-top__icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden>
          <path fill="currentColor" d="M12 5.5 19.5 14h-4v6H8.5v-6h-4L12 5.5z" />
        </svg>
      </button>
    </div>
  );
}

export default App;
