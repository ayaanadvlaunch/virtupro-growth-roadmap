import { useState, useEffect } from 'react'
import './App.css'
import virtuproLogo from './assets/virtupro-logo.png'
import ahmedLondon   from './assets/ahmed-london.png'
import caseZoom      from './assets/case-zoom.jpeg'

const GHL_FORM_ID = 'DtSKk7FAqjtiph1IZj3i'
const GHL_LOC_ID  = 'vLiQq0oLjfhklTrtgQUA'

const ROADMAPS = [
  {
    range: '1–10',
    label: '1–10 properties',
    tag: 'Building the foundation',
    headline: 'Stop reacting. Start running a system.',
    points: [
      'The reply-time rule that protects your Airbnb ranking every hour',
      'How to get to 90%+ occupancy without touching your nightly rate',
      'The 5 things guests complain about that never show up in checkout messages',
      'The damage claim process that recovers £1,000+ per claim, step by step',
      'What to build now so adding properties later doesn\'t add hours to your week',
    ],
    result: 'From 60+ hours/week to a portfolio that runs without you at the weekend.',
  },
  {
    range: '10–30',
    label: '10–30 properties',
    tag: 'Scaling without burning out',
    headline: 'Your next 20 units shouldn\'t cost you your evenings.',
    points: [
      'How to hand off guest communications without ratings dropping',
      'The SOP framework VirtuPro uses across 2,000+ units — stripped down for independent owners',
      'Cleaning and maintenance coordination that doesn\'t require you to chase anyone',
      'How to run dynamic pricing across 10+ listings without paying for expensive tools',
      'The review management system that keeps 4.9 intact as volume grows',
    ],
    result: 'Grow from 10 to 30 properties without needing to be online at midnight.',
  },
  {
    range: '30+',
    label: '30+ properties',
    tag: 'True passive income',
    headline: 'At this scale, you\'re running a business. It needs to work like one.',
    points: [
      'The team structure VirtuPro uses — roles, shifts, and accountability without micromanagement',
      'How to build SOPs that let junior staff handle 90% of guest interactions correctly',
      'Revenue optimisation at scale — occupancy, pricing, upsells, and claim recovery across 30+ units',
      'The reporting framework that tells you which properties earn, which drain, and why',
      'What "passive income" actually looks like at this size, and what still requires your attention',
    ],
    result: 'A portfolio that grows monthly without adding to your personal workload.',
  },
]

function scrollToForm() {
  document.getElementById('get-roadmap').scrollIntoView({ behavior: 'smooth' })
}

function SectionCTA({ label = 'Get My Free Roadmap' }) {
  return (
    <div className="section-cta-wrap">
      <button className="section-cta-btn" onClick={scrollToForm}>{label}</button>
      <p className="cta-subtext">Free. Sent straight to your inbox. No card required.</p>
    </div>
  )
}

function RoadmapPicker() {
  const [active, setActive] = useState(null)
  const map = active !== null ? ROADMAPS[active] : null

  return (
    <div className="rmp-shell">
      <p className="rmp-prompt">How many properties do you manage right now?</p>
      <div className="rmp-tabs">
        {ROADMAPS.map((r, i) => (
          <button
            key={r.range}
            className={`rmp-tab ${active === i ? 'rmp-tab--active' : ''}`}
            onClick={() => setActive(i)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {map && (
        <div className="rmp-card">
          <p className="rmp-tag">{map.tag}</p>
          <p className="rmp-headline">{map.headline}</p>
          <ul className="rmp-points">
            {map.points.map(pt => (
              <li key={pt}><span className="rmp-check">✓</span>{pt}</li>
            ))}
          </ul>
          <p className="rmp-result">{map.result}</p>
          <button className="rmp-cta" onClick={scrollToForm}>
            Send me the {map.label} roadmap
          </button>
        </div>
      )}

      {!map && (
        <div className="rmp-placeholder">
          <p>Select your portfolio size above to see your roadmap.</p>
        </div>
      )}
    </div>
  )
}

function LeadForm({ onSuccess }) {
  const [values, setValues] = useState({
    full_name: '', email: '', number_whats_app: '', CG6GeFiqxFrpb5m9YVMl: '',
  })
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('failed')
      onSuccess(values)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <input
        type="text" name="full_name" placeholder="Full name"
        value={values.full_name} onChange={handleChange} required
      />
      <input
        type="email" name="email" placeholder="Email address"
        value={values.email} onChange={handleChange} required
      />
      <input
        type="tel" name="number_whats_app" placeholder="WhatsApp number"
        value={values.number_whats_app} onChange={handleChange} required
      />
      <select
        name="CG6GeFiqxFrpb5m9YVMl"
        value={values.CG6GeFiqxFrpb5m9YVMl}
        onChange={handleChange}
        required
      >
        <option value="" disabled>How many properties do you manage?</option>
        <option value="1–10 properties">1–10 properties</option>
        <option value="10–20 properties">10–20 properties</option>
        <option value="20–50 properties">20–50 properties</option>
        <option value="50+ properties">50+ properties</option>
      </select>
      <button className="submit-btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send Me the Roadmap'}
      </button>
      {status === 'error' && (
        <p className="form-error">Something went wrong. Please try again.</p>
      )}
      <p className="form-note">No credit card. No sales call. Roadmap straight to your inbox.</p>
    </form>
  )
}

function ThankYouPage({ data }) {
  const firstName = data.full_name.trim().split(' ')[0]
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="ty-page">
      <header className="site-header">
        <div className="container header-inner">
          <img src={virtuproLogo} alt="VirtuPro" className="site-logo-img" />
        </div>
      </header>

      <section className="ty-hero">
        <div className="container ty-hero-inner">
          <p className="eyebrow">Your roadmap is on its way, {firstName}</p>
          <h1 className="ty-heading">Check {data.email}.</h1>
          <p className="ty-sub">Your tailored growth roadmap will be there in a few minutes.</p>
          <div className="ty-stars" aria-hidden="true">★★★★★</div>
        </div>
      </section>

      <section className="ty-pitch">
        <div className="container ty-pitch-single">
          <p className="eyebrow">One more thing</p>
          <h2 className="ty-pitch-heading">
            Someone from Ahmed's team will reach out shortly.
          </h2>
          <p className="ty-pitch-body">
            A 30-minute call, usually reserved for VirtuPro's existing clients. Free for qualified UK holiday let owners.
          </p>
          <p className="ty-pitch-body ty-pitch-body-strong">
            No obligation. No sales pitch. Just answers.
          </p>
          <ul className="ty-list">
            <li>Roadmap in your inbox now</li>
            <li>We'll WhatsApp you within 24 hours</li>
            <li>We ask questions first. Every time.</li>
          </ul>
          <div className="ty-qualify-box">
            <p className="ty-qualify-title">You've been added to the priority list.</p>
            <p className="ty-qualify-body">
              Ahmed only allows a handful of calls each week.
              Expect to hear from us on <strong>{data.number_whats_app}</strong> within 24 hours to lock in a time.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <img src={virtuproLogo} alt="VirtuPro" className="footer-logo" />
          <p className="footer-copy">
            &copy; 2025 VirtuPro. Full-service Airbnb co-hosting for UK &amp; UAE holiday let owners.
          </p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  const [submitted, setSubmitted] = useState(null)
  if (submitted) return <ThankYouPage data={submitted} />

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <img src={virtuproLogo} alt="VirtuPro" className="site-logo-img" />
          <button className="header-cta" onClick={scrollToForm}>Get Free Roadmap</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Free for UK Holiday Let Owners</p>
            <h1>The Growth Roadmap for Where You Are Right Now.</h1>
            <p className="subline">
              Managing 5 properties is a different problem to managing 25. Most advice doesn't know the difference. This roadmap does.
            </p>
            <p className="desc">
              VirtuPro manages 2,000+ UK holiday lets. This is the exact path — by portfolio size — that takes owners from overwhelmed to genuinely passive.
            </p>
            <div className="hero-trust">
              <span className="hero-trust-item">2,000+ units managed</span>
              <span className="hero-trust-item">3 roadmaps, by portfolio stage</span>
              <span className="hero-trust-item">Free, no card required</span>
            </div>
          </div>

          <div>
            <div className="form-card hero-form-card">
              <p className="form-card-heading">Get Your Free Roadmap</p>
              <p className="form-card-sub">Pick your stage. We'll send the right one.</p>
              <LeadForm onSuccess={setSubmitted} />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar">
        <div className="container stats-grid">
          {[
            { num: '2,000+', label: 'Properties managed' },
            { num: '55→130',  label: 'Properties, one client, 3 months' },
            { num: '48 hrs',  label: 'To go live from sign-up' },
            { num: '9/10',    label: 'Damage claims won' },
          ].map(s => (
            <div key={s.num}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP PICKER */}
      <section className="roadmap-section">
        <div className="container">
          <div className="roadmap-heading">
            <p className="eyebrow">Your personalised roadmap</p>
            <h2>The path is different depending on where you start.</h2>
            <p className="roadmap-sub">
              Select your current portfolio size and see exactly what's inside your roadmap.
            </p>
          </div>
          <RoadmapPicker />
          <SectionCTA label="Send Me My Roadmap" />
        </div>
      </section>

      {/* PAIN */}
      <section className="pain">
        <div className="container">
          <div className="pain-inner">
            <div className="pain-content">
              <div className="pain-heading-row">
                <p className="eyebrow">Why most owners stay stuck</p>
                <h2>The advice that helped you get to 5 properties will not help you get to 20.</h2>
              </div>
              <div className="pain-rows">
                {[
                  {
                    i: '01',
                    heading: 'What works at 3 properties breaks at 10.',
                    body: 'Handling messages yourself is fine when you have 3 properties. At 10, it\'s 60+ messages a day. The systems don\'t scale — and neither do you. The roadmap shows you what to build before the volume hits.',
                  },
                  {
                    i: '02',
                    heading: 'Growth without a system just means more chaos.',
                    body: 'Most owners add properties without changing how they operate. Reviews drop, reply times slow, claims pile up. The answer isn\'t fewer properties. It\'s the operating model that lets you hold more without working more hours.',
                  },
                  {
                    i: '03',
                    heading: '30+ properties with no team is a job, not an investment.',
                    body: 'At scale, the constraint isn\'t bookings or nightly rate. It\'s your time. The roadmap for 30+ is entirely about removing yourself from day-to-day operations without losing quality or income.',
                  },
                ].map(row => (
                  <div className="pain-row" key={row.i}>
                    <span className="pain-index">{row.i}</span>
                    <div>
                      <h3>{row.heading}</h3>
                      <p>{row.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <SectionCTA label="Get the Roadmap That Fits" />
            </div>
            <div className="pain-photo-wrap">
              <img src={ahmedLondon} alt="Ahmed Khilji, VirtuPro Founder" className="pain-photo" />
            </div>
          </div>
        </div>
      </section>

      {/* CASE */}
      <section className="client-result-section">
        <div className="container">
          <div className="client-result-heading">
            <p className="eyebrow">What the roadmap produces.</p>
            <h2>55 to 130+. After Ahmed stepped in.</h2>
          </div>
          <div className="ahmed-case">
            <div className="ahmed-case-img">
              <img src={caseZoom} alt="55 to 130+ properties" />
            </div>
            <div className="ahmed-case-copy">
              <p className="eyebrow">Client result</p>
              <p className="case-result">55 to 130+ in 3 months.</p>
              <p>One portfolio. Same properties. Ahmed audited the operations, fixed the systems, and rebuilt from scratch using exactly the frameworks in this roadmap. The difference between 55 and 130 wasn't more properties. It was the operating model that made each one run without manual effort.</p>
              <p className="case-quote">"The roadmap told me what to fix first. It was the first time I had a plan that actually matched where I was."</p>
              <p className="case-attribution">James R., UK Holiday Let Owner</p>
            </div>
          </div>
          <SectionCTA label="Get My Free Roadmap" />
        </div>
      </section>

      {/* AHMED */}
      <section className="ahmed">
        <div className="container">
          <div className="ahmed-intro">
            <div className="ahmed-photo-wrap">
              <img src={ahmedLondon} alt="Ahmed Khilji, VirtuPro Founder" className="ahmed-photo" />
            </div>
            <div className="ahmed-bio">
              <p className="eyebrow">Built from experience, not theory</p>
              <h2>Ahmed Khilji hit every stage of this roadmap. He wrote down what actually worked at each one.</h2>
              <p>He started with one property. Burned out at 40 units trying to manage everything himself. Rebuilt from scratch with systems, trained agents, and 24/7 ops. Scaled to 2,000+ units across the UK and UAE.</p>
              <p>Every page of this roadmap is what worked at that specific stage. Not what sounded logical. What the data and the portfolio said was true.</p>
              <div className="ahmed-badges">
                <div className="ahmed-badge"><span className="badge-num">2,000+</span><span className="badge-label">Units managed</span></div>
                <div className="ahmed-badge"><span className="badge-num">100+</span><span className="badge-label">Agents, 3 shifts</span></div>
                <div className="ahmed-badge"><span className="badge-num">48 hrs</span><span className="badge-label">To go live</span></div>
                <div className="ahmed-badge"><span className="badge-num">9/10</span><span className="badge-label">Claims won</span></div>
              </div>
            </div>
          </div>
          <SectionCTA label="Get My Free Roadmap" />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="get-roadmap">
        <div className="container final-cta-grid">
          <div className="final-copy">
            <p className="eyebrow">Free download</p>
            <h2>Stop following advice written for a different stage than yours.</h2>
            <p className="desc">Get the roadmap built for your exact portfolio size. Free, instant, no card.</p>
            <ul className="final-list">
              <li>The 1–10 properties roadmap — get to 90% occupancy and stop managing at weekends</li>
              <li>The 10–30 properties roadmap — scale without adding hours to your day</li>
              <li>The 30+ properties roadmap — remove yourself from operations without income dropping</li>
              <li>Each includes the specific systems, SOPs, and communication frameworks VirtuPro uses</li>
            </ul>
          </div>
          <div>
            <div className="form-card">
              <p className="form-card-heading">Get Your Free Roadmap</p>
              <p className="form-card-sub">Pick your stage. We'll send the right one.</p>
              <LeadForm onSuccess={setSubmitted} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <img src={virtuproLogo} alt="VirtuPro" className="footer-logo" />
          <p className="footer-copy">
            &copy; 2025 VirtuPro. Full-service Airbnb co-hosting for UK &amp; UAE holiday let owners.
          </p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
