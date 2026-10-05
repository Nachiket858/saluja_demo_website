import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CampusMap from '../components/CampusMap.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { IMG, PHONE, TEL, fmt, prefersReducedMotion } from '../data/site.js';
import './Home.css';

/* ---------- Content ---------- */

const FEATURES = [
  {
    title: 'Secure premises',
    text: '24×7 CCTV across gate, yard & docks',
    icon: <><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    title: 'Heavy-vehicle access',
    text: 'Direct from the Nagar Highway',
    icon: <><path d="M2 7h11v9H2z" /><path d="M13 10h4l3 3v3h-7" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" /></>,
  },
  {
    title: 'Prime location',
    text: 'Beside Waluj MIDC',
    icon: <><path d="M12 21s-6-5.5-6-11a6 6 0 1 1 12 0c0 5.5-6 11-6 11z" /><circle cx="12" cy="10" r="2.2" /></>,
  },
];

const HERO_STATS = [
  { key: 'campus', value: '1,50,000', label: 'Sq ft campus', icon: <><path d="M3 10l9-6 9 6v10H3z" /><path d="M7 20v-6h10v6" /><path d="M7 17h10" /></> },
  { key: 'avail', value: '54,000', label: 'Sq ft available now', icon: <><path d="M3 21V9l9-6 9 6v12" /><path d="M8 21v-8h8v8" /><path d="M12 13v8" /></> },
  { key: 'height', value: '12 m', label: 'Clear height', icon: <><path d="M12 3v18" /><path d="M8 7l4-4 4 4" /><path d="M8 17l4 4 4-4" /></> },
  { key: 'since', value: '2008', label: 'Operating since', icon: <><circle cx="12" cy="9" r="5" /><path d="M9 13.5L8 21l4-2 4 2-1-7.5" /></> },
];

const STATS = [
  { v: 2008, u: '', l: 'Operating on the Nagar Highway since' },
  { v: 150000, u: 'sq ft', l: 'Campus area' },
  { v: 12, u: 'm', l: 'Clear height' },
  { v: 54000, u: 'sq ft', l: 'Available now' },
];

const SPECS = [
  ['Clear height', '12', 'm', 'Six pallet levels under the eaves.', '1553413077-190dd305871c', 'Tall racking aisle'],
  ['Floor load', '5', 't/m²', 'FM2 trowelled floor for laden forklifts.', '1504307651254-35680f356dfd', 'Warehouse floor from above'],
  ['Loading docks', '12', 'bays', 'Hydraulic levellers, covered loading.', '1601584115197-04ecc0da31d7', 'Truck at a loading bay'],
  ['Power', '500', 'kVA', 'Sanctioned load with full DG backup.', '1621905251189-08b45d6a269e', 'Electrician at a power panel'],
  ['Security', '24×7', '', 'CCTV across gate, yard and docks.', '1590496793929-36417d3117de', 'Trucks in a secured yard from above'],
].map(([label, v, u, note, id, alt]) => ({ label, v, u, note, src: IMG(id, 1400), alt }));

const DRIVES = [
  ['Waluj MIDC', 0.08, 'Adjacent', 'near'],
  ['City centre', 0.5, '30 min', 'near'],
  ['Airport', 0.75, '45 min', 'near'],
  ['Ahmednagar', 2, '2 h', 'far'],
  ['Pune', 4.5, '4.5 h', 'far'],
  ['Mumbai', 5, '5 h', 'far'],
];

const INDUSTRIES = [
  ['Automotive & components', 'Buffer stock and sub-assemblies close to the Waluj line.', '1616401784845-180882ba9ba8', 'automotive'],
  ['Engineering & manufacturing', 'Raw material and finished goods beside the plant.', '1513828583688-c52646db42da', 'manufacturing'],
  ['FMCG & distribution', 'A Marathwada hub for stock in from Mumbai and Pune.', '1586528116311-ad8dd3c8310d', 'fmcg'],
  ['E-commerce & 3PL', 'Fulfilment and returns with city and expressway reach.', '1566576721346-d4a3b4eaeb55', 'ecommerce'],
  ['Commodities & bulk', 'Secure, seasonal storage for regional goods.', '1580674285054-bed31e145f59', 'commodities'],
];

const SIZES = [
  ['Under 10k sq ft', 10000],
  ['10–25k', 20000],
  ['25–50k', 40000],
  ['50k+', 54000],
];

const Icon = ({ size = 22, stroke = 1.6, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

/* ---------- Hero ---------- */

function useIstClock() {
  const get = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
  const [clock, setClock] = useState(get);
  useEffect(() => {
    const iv = setInterval(() => setClock(get()), 20000);
    return () => clearInterval(iv);
  }, []);
  return clock;
}

function Hero() {
  const clock = useIstClock();
  const [lettersIn, setLettersIn] = useState(false);
  const r = {
    img: useRef(null), shade: useRef(null), mask: useRef(null), hud: useRef(null), act2: useRef(null),
    campus: useRef(null), avail: useRef(null), since: useRef(null),
  };

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const cl = (v) => Math.max(0, Math.min(1, v));
    let p = reduced ? 1 : 0;
    let raf;

    // p runs 0 → 1 once: letters zoom away, photo settles, headline fades in
    const frame = () => {
      const a = cl(p / 0.45);
      const fade = 1 - cl((p - 0.1) / 0.3);
      const m = r.mask.current;
      if (m) {
        m.style.transform = `scale(${1 + Math.pow(a, 2.2) * 14})`;
        m.style.opacity = fade;
        m.style.visibility = fade <= 0 ? 'hidden' : 'visible';
      }
      if (r.img.current) r.img.current.style.transform = `scale(${1.25 - 0.25 * cl(p / 0.6)})`;
      if (r.hud.current) r.hud.current.style.opacity = 1 - cl(p / 0.1);
      if (r.shade.current) r.shade.current.style.opacity = cl((p - 0.35) / 0.2);
      const q = cl((p - 0.45) / 0.22);
      const x = r.act2.current;
      if (x) {
        x.style.opacity = q;
        x.style.transform = `translateY(${(1 - q) * 40}px)`;
        x.style.pointerEvents = q > 0.5 ? 'auto' : 'none';
      }
      const c = 1 - Math.pow(1 - cl((p - 0.5) / 0.3), 3);
      if (r.since.current) r.since.current.textContent = String(Math.round(1990 + 18 * c));
      if (r.campus.current) r.campus.current.textContent = fmt(150000 * c);
      if (r.avail.current) r.avail.current.textContent = fmt(54000 * c);
    };

    frame();
    const t1 = setTimeout(() => setLettersIn(true), 150);
    const t2 = reduced
      ? null
      : setTimeout(() => {
          const t0 = performance.now();
          const D = 3200;
          const run = (t) => {
            const k = Math.min(1, (t - t0) / D);
            p = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
            frame();
            if (k < 1) raf = requestAnimationFrame(run);
          };
          raf = requestAnimationFrame(run);
        }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-h">
      <div ref={r.img} className="hero-img" role="img" aria-label="Tall racking aisle inside a Saluja warehouse" />
      <div ref={r.shade} className="hero-shade" aria-hidden="true" />

      <div ref={r.mask} className="hero-mask" aria-hidden="true">
        <div className="hero-word">
          {'SALUJA'.split('').map((ch, i) => (
            <span key={i} className="hero-letter">
              <span style={{ transform: lettersIn ? 'translateY(0)' : 'translateY(105%)', transitionDelay: `${i * 70}ms` }}>{ch}</span>
            </span>
          ))}
        </div>
      </div>

      <div ref={r.hud} className="hero-hud" aria-hidden="true">
        <div className="hero-hud-row">
          <span>N 19.84° · E 75.24°<br />Waluj — Chh. Sambhajinagar</span>
          <span className="hero-hud-right">Local time<br /><span className="hero-hud-clock">{clock} IST</span></span>
        </div>
        <div className="hero-hud-row hero-hud-row--end">
          <span className="hero-hud-tag">Industrial warehousing on the Nagar Highway. Operating since 2008.</span>
          <span className="hero-hud-enter">Entering the campus <span className="hero-hud-arrow">↓</span></span>
        </div>
      </div>

      <div ref={r.act2} className="hero-act2">
        <div className="container hero-main">
          <div className="hero-copy">
            <span className="hero-kicker">
              <span className="hero-kicker-line" />Waluj Campus<span className="hero-kicker-sep">·</span>Nagar Highway
            </span>
            <h1 id="hero-h" className="hero-title">
              Warehousing built for what <span className="em hero-title-em">moves</span> Maharashtra.
            </h1>
            <p className="hero-text">
              Secure, high-clearance space beside Waluj MIDC — reachable by heavy vehicles, run by people who pick up the phone.
            </p>
            <div className="hero-actions">
              <Link to="/facility" className="hero-btn hero-btn--primary">Explore the campus <span aria-hidden="true">→</span></Link>
              <Link to="/contact" className="hero-btn hero-btn--ghost">
                <span className="hero-btn-play" aria-hidden="true">▶</span>Talk to us
              </Link>
            </div>
          </div>

          <ul className="hero-feats">
            {FEATURES.map((f) => (
              <li key={f.title}>
                <span className="hero-feat-icon"><Icon>{f.icon}</Icon></span>
                <span className="hero-feat-text">
                  <strong>{f.title}</strong>
                  <span>{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-stats">
          <div className="container divided">
            <ul className="hero-stats-grid">
              {HERO_STATS.map((s) => (
                <li key={s.key} className="hero-stat">
                  <span className="hero-stat-icon"><Icon size={34} stroke={1.4}>{s.icon}</Icon></span>
                  <span className="hero-stat-text">
                    <span ref={r[s.key] ?? null} className="hero-stat-value">{s.value}</span>
                    <span className="hero-stat-label">{s.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sections ---------- */

function Intro() {
  const statsRef = useRef(null);
  const valueRefs = useRef([]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    let raf;
    const countUp = () => {
      const t0 = performance.now();
      const D = 1600;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / D);
        const e = 1 - Math.pow(1 - k, 3);
        STATS.forEach(({ v }, i) => {
          const node = valueRefs.current[i];
          if (!node) return;
          node.textContent = v === 2008 ? String(Math.round(1990 + 18 * e)) : fmt(v * e);
        });
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        countUp();
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="section" aria-labelledby="intro-h">
      <div className="container">
        <div className="split">
          <div className="stack intro-copy">
            <span className="eyebrow">About Saluja</span>
            <h2 id="intro-h" className="h2">The space between <span className="em">production</span> and delivery.</h2>
            <p className="lead">
              For nearly two decades, manufacturers, distributors and logistics operators have trusted Saluja with the stock that keeps
              their lines and routes running — stored securely, reachable by heavy vehicles, and managed by people who pick up the phone.
            </p>
            <Link to="/company" className="btn btn--outline">Our story <span aria-hidden="true">→</span></Link>
          </div>
          <div className="intro-collage">
            <img className="intro-img-main" src={IMG('1587293852726-70cdb56c2866', 1400)} alt="High pallet racking stocked with cartons" loading="lazy" />
            <img className="intro-img-sub" src={IMG('1616401784845-180882ba9ba8', 900)} alt="Reach truck working an aisle" loading="lazy" />
            <div className="intro-badge">
              <span>Since</span>
              <strong>2008</strong>
            </div>
          </div>
        </div>

        <dl ref={statsRef} className="intro-stats">
          {STATS.map((s, i) => (
            <div key={s.l} className="intro-stat">
              <dt>{s.l}</dt>
              <dd>
                <span ref={(n) => (valueRefs.current[i] = n)}>{s.v === 2008 ? '2008' : fmt(s.v)}</span>
                {s.u && <span className="intro-stat-unit">{s.u}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Specs() {
  const [active, setActive] = useState(0);
  const cur = SPECS[active];

  return (
    <section className="section section--flush-top" aria-labelledby="spec-h">
      <div className="container split">
        <div className="spec-media">
          {SPECS.map((s, i) => (
            <img key={s.label} src={s.src} alt={s.alt} loading="lazy" className={i === active ? 'is-active' : ''} />
          ))}
          <div className="spec-caption">
            <span>{cur.label} · {cur.v}{cur.u && ` ${cur.u}`}</span>
            <span className="spec-caption-n">0{active + 1} / 0{SPECS.length}</span>
          </div>
        </div>

        <div className="stack">
          <span className="eyebrow">Waluj Campus</span>
          <h2 id="spec-h" className="h2">Specified for <span className="em">serious</span> operations.</h2>
          <ul className="spec-list">
            {SPECS.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  className={`reset-btn spec-row${i === active ? ' is-active' : ''}`}
                  aria-pressed={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="spec-dot" />
                  <span className="spec-label">
                    <span>{s.label}</span>
                    <span className="spec-note">{s.note}</span>
                  </span>
                  <span className="spec-value">{s.v}{s.u && <span className="unit">{s.u}</span>}</span>
                </button>
              </li>
            ))}
          </ul>
          <Link to="/facility" className="btn btn--dark">Full specification <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}

function LocationBand() {
  const [pick, setPick] = useState('midc');

  const driveKeyMap = {
    'Waluj MIDC': 'midc',
    'City centre': 'city',
    'Airport': 'air',
    'Ahmednagar': 'rail',
    'Pune': 'bidkin',
    'Mumbai': 'samruddhi',
  };

  return (
    <section className="band" aria-labelledby="loc-h">
      <div className="container split">
        <div className="stack">
          <span className="eyebrow">Location &amp; Connectivity</span>
          <h2 id="loc-h" className="h2">Two highways. <span className="em">One</span> address.</h2>
          <p className="lead">On the Nagar Highway beside Waluj MIDC, with the Samruddhi expressway minutes away.</p>
          <ul className="drive-list" aria-label="Drive times from campus">
            {DRIVES.map(([n, h, t, kind]) => {
              const placeKey = driveKeyMap[n];
              const isSelected = placeKey && pick === placeKey;
              return (
                <li key={n}>
                  <button
                    type="button"
                    className={`reset-btn drive-row${isSelected ? ' is-active' : ''}`}
                    onClick={() => placeKey && setPick(placeKey)}
                    onMouseEnter={() => placeKey && setPick(placeKey)}
                  >
                    <span className="drive-name">{n}</span>
                    <span className="bar">
                      <span style={{ width: `${Math.max(3, (h / 5.5) * 100)}%`, background: isSelected || kind === 'near' ? 'var(--orange)' : 'var(--blue)' }} />
                    </span>
                    <span className="drive-time">{t}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <Link to="/location" className="btn btn--outline">Interactive location map <span aria-hidden="true">→</span></Link>
        </div>
        <div className="home-map">
          <CampusMap pick={pick} onPick={setPick} label="Map of Saluja Waluj Campus and nearby locations" />
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const railRef = useRef(null);
  const scroll = (dir) => {
    const rail = railRef.current;
    if (rail) rail.scrollBy({ left: dir * Math.min(400, rail.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="section" aria-labelledby="ind-h">
      <div className="container section-head">
        <div className="stack stack--sm">
          <span className="eyebrow">Industries</span>
          <h2 id="ind-h" className="h2">Built around how <span className="em">you</span> work.</h2>
        </div>
        <div className="rail-controls">
          <button type="button" className="icon-btn" aria-label="Previous" onClick={() => scroll(-1)}>←</button>
          <button type="button" className="icon-btn icon-btn--dark" aria-label="Next" onClick={() => scroll(1)}>→</button>
        </div>
      </div>
      <div ref={railRef} className="rail">
        {INDUSTRIES.map(([name, need, id, key]) => (
          <Link key={key} to={`/contact?sector=${key}`} className="rail-card">
            <img src={IMG(id, 900)} alt="" loading="lazy" />
            <span className="rail-card-shade" aria-hidden="true" />
            <span className="rail-card-body">
              <span className="rail-card-name">{name}</span>
              <span className="rail-card-need">{need}</span>
              <span className="rail-card-cta">Start a brief →</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="page-end section--flush-top" aria-labelledby="cta-h">
      <div className="home-cta">
        <img src={IMG('1592838064575-70ed626d3a0e', 2000)} alt="" loading="lazy" />
        <span className="home-cta-shade" aria-hidden="true" />
        <div className="home-cta-body">
          <h2 id="cta-h" className="home-cta-title">
            Let's find the right space for your <span className="em">operation</span>.
          </h2>
          <div className="home-cta-chips">
            {SIZES.map(([label, size]) => (
              <Link key={size} to={`/contact?size=${size}`} className="home-cta-chip">{label}</Link>
            ))}
          </div>
          <a href={TEL} className="home-cta-call">or call {PHONE}</a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    'Saluja Warehousing — Industrial warehousing at Waluj, Chhatrapati Sambhajinagar',
    'Industrial warehousing on the Aurangabad–Ahmednagar highway at Waluj MIDC, Chhatrapati Sambhajinagar. Operating since 2008. Explore the campus and check available space.'
  );
  return (
    <>
      <Hero />
      <Intro />
      <Specs />
      <LocationBand />
      <Industries />
      <Cta />
    </>
  );
}
