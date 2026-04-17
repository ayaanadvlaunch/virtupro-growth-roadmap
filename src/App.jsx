import { useState, useEffect } from 'react'
import './App.css'
import virtuproLogo from './assets/virtupro-logo.png'
import ahmedLondon   from './assets/ahmed-london.png'
import ahmedMain     from './assets/ahmed-main.png'
import caseZoom      from './assets/case-zoom.jpeg'

const GHL_FORM_ID = 'DtSKk7FAqjtiph1IZj3i'
const GHL_LOC_ID  = 'vLiQq0oLjfhklTrtgQUA'

const ROADMAPS = [
  {
    range: '1–10',
    label: '1–10 properties',
    tag: 'What VirtuPro handles at this stage',
    headline: 'Your inbox, your pricing, your claims. All of it off your plate.',
    points: [
      'Guest communications answered in under 3 minutes, 24/7 — by our team, not you',
      '87%+ average occupancy delivered through VirtuPro\'s pricing and listing management',
      'Every guest complaint intercepted and resolved before it becomes a public review',
      'Every damage claim filed, managed, and won — 9 out of 10, without a single message from you',
      'Operations built to scale: adding properties adds income, not hours to your week',
    ],
    result: 'Our clients at this stage get their evenings back within the first 30 days.',
  },
  {
    range: '10–30',
    label: '10–30 properties',
    tag: 'What VirtuPro handles at this stage',
    headline: 'A full operations team behind your portfolio. For a flat monthly fee.',
    points: [
      'Full guest communications team: ratings maintained or improved from day one',
      'VirtuPro\'s operating system deployed across your listings — the same framework behind 2,000+ units',
      'Cleaning, maintenance, and contractor coordination managed entirely by our team',
      'Dynamic pricing managed weekly across every listing — no software costs, no manual work',
      'Review management that keeps your 4.9 intact as the portfolio grows',
    ],
    result: 'Our clients grow from 10 to 30 properties without adding a single working hour.',
  },
  {
    range: '30+',
    label: '30+ properties',
    tag: 'What VirtuPro handles at this stage',
    headline: 'Enterprise-level operations behind your portfolio. Still a flat fee.',
    points: [
      'Dedicated team with defined roles, shifts, and accountability — none of it managed by you',
      'Our SOPs handle 90% of guest interactions correctly, without your involvement',
      'Full revenue optimisation across every unit: occupancy, pricing, upsells, and 9/10 damage claims won',
      'Monthly reporting from our team: which properties earn, which drain, and what we are doing about it',
      'True passive income at scale — you review a monthly report, we run the operation',
    ],
    result: 'At 30+ properties, our clients stop working in the business entirely.',
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
      if (window.fbq) window.fbq('track', 'Lead')
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

  useEffect(() => {
    if (window.fbq) window.fbq('track', 'PageView')
  }, [])

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
            <h1>The Roadmap to Handing Your Portfolio to a Team That Runs It for You.</h1>
            <p className="subline">
              Managing 5 properties needs a different operation to managing 25. This roadmap shows exactly what VirtuPro takes off your plate at each stage.
            </p>
            <p className="desc">
              VirtuPro runs 2,000+ UK holiday lets end-to-end — guest comms, pricing, damage claims, reviews, all of it. This is the exact handover path, by portfolio size, that moves owners from involved to completely passive.
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
                <h2>More properties shouldn't mean more of your time. But without the right backend, they do.</h2>
              </div>
              <div className="pain-rows">
                {[
                  {
                    i: '01',
                    heading: 'At 10 properties, guest messages alone take 3+ hours a day.',
                    body: 'VirtuPro\'s team handles every guest message in under 3 minutes, around the clock. No templates, no delays — trained agents who know your properties. At this stage, the roadmap shows exactly how the handover works.',
                  },
                  {
                    i: '02',
                    heading: 'Growth without a backend just adds chaos.',
                    body: 'Reviews drop, pricing goes stale, damage claims go unfiled. VirtuPro deploys the same operating system across your listings from day one — pricing managed weekly, claims filed and won, quality maintained as the portfolio grows.',
                  },
                  {
                    i: '03',
                    heading: 'At 30+ properties, you need a team with defined roles and shifts. Not more tools.',
                    body: 'VirtuPro provides a dedicated team — not a platform, not software. Defined roles, 3 shifts, full accountability. Our clients at this stage stop working in the business entirely. The roadmap shows the exact handover structure.',
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
              <img src={ahmedMain} alt="Ahmed Khilji, VirtuPro Founder" className="ahmed-photo" />
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
              <li>The 1–10 properties roadmap: get to 90% occupancy and stop managing at weekends</li>
              <li>The 10–30 properties roadmap: scale without adding hours to your day</li>
              <li>The 30+ properties roadmap: remove yourself from operations without income dropping</li>
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
