import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import { IMG, PHONE, TEL, WHATSAPP } from '../data/site.js';
import './Contact.css';

const SECTORS = { automotive: 'Automotive', manufacturing: 'Manufacturing', fmcg: 'FMCG', ecommerce: 'E-commerce', commodities: 'Commodities' };
const DOCS = { brochure: 'Campus brochure', siteplan: 'Site & unit plan', compliance: 'Compliance pack' };
const USES = ['Storage', 'Distribution', 'Raw material buffer', 'Finished goods'];
const TIMES = {
  Immediately: 'starting immediately',
  '1–3 months': 'within 3 months',
  '3–6 months': 'in 3–6 months',
  'Planning ahead': 'as part of future planning',
};
const FIELDS = [
  ['name', 'Name *', 'text', 'name', 'Full name'],
  ['company', 'Company', 'text', 'organization', 'Company name'],
  ['phone', 'Phone *', 'tel', 'tel', '+91'],
  ['email', 'Email', 'email', 'email', 'you@company.com'],
];

const clampArea = (v) => Math.max(5000, Math.min(100000, +v || 20000));

function Chip({ active, onClick, children }) {
  return (
    <button type="button" className={`chip${active ? ' is-active' : ''}`} aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  );
}

function ContactForm() {
  usePageMeta(
    'Check availability — Brief us | Saluja Warehousing',
    'Tell Saluja Warehousing how much space you need at Waluj, Chhatrapati Sambhajinagar. We reply within one working day.'
  );
  const [params] = useSearchParams();

  const context = useMemo(() => {
    const ctx = [];
    if (params.get('unit')) ctx.push('Unit ' + params.get('unit').split('').join(' + '));
    if (params.get('waitlist')) ctx.push('Waitlist · Unit ' + params.get('waitlist'));
    if (DOCS[params.get('doc')]) ctx.push('Requesting: ' + DOCS[params.get('doc')]);
    return ctx;
  }, [params]);

  const [form, setForm] = useState(() => ({
    area: params.get('size') ? clampArea(params.get('size')) : 20000,
    use: 'Storage',
    sector: SECTORS[params.get('sector')] ? params.get('sector') : '',
    time: '1–3 months',
    name: '',
    company: '',
    phone: '',
    email: '',
    note: '',
  }));
  const [tried, setTried] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const sArea = form.area.toLocaleString('en-IN') + (form.area >= 100000 ? '+' : '');
  const sUse = form.use.toLowerCase();
  const sSector = form.sector ? SECTORS[form.sector].toLowerCase() : 'our business';
  const sTime = TIMES[form.time];
  const filled = [true, !!form.use, !!form.sector, !!form.time, !!(form.name && (form.phone || form.email)), !!form.note].filter(Boolean).length;
  const isBad = (k) => tried && ((k === 'name' && !form.name.trim()) || (k === 'phone' && !form.phone.trim() && !form.email.trim()));
  const ref = 'SW-' + String(form.area / 1000).padStart(3, '0') + String((form.name.length * 37) % 97).padStart(2, '0');

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !(form.phone.trim() || form.email.trim())) {
      setTried(true);
      setError('Add your name and a phone number or email so we can reach you.');
      return;
    }
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="contact">
      <div className="contact-grid">
        <aside className="contact-side">
          <div className="contact-side-media">
            <img src={IMG('1592838064575-70ed626d3a0e', 1600)} alt="Truck on the highway at dusk" />
          </div>
          <div className="contact-side-shade" aria-hidden="true" />
          <div className="contact-side-body">
            <nav className="contact-crumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
            <span className="glass-chip contact-chip"><span className="contact-chip-dot" aria-hidden="true" />Reply within one working day</span>
            <h1 className="contact-title">Tell us what has to <span className="em">fit</span>.</h1>
            <p className="contact-quote" aria-live="polite">
              “We need about <mark>{sArea} sq ft</mark> for <mark>{sUse}</mark> in <mark>{sSector}</mark>, <mark>{sTime}</mark>.”
            </p>
            {context.length > 0 && (
              <div className="contact-tags">
                {context.map((c) => <span key={c}>{c}</span>)}
              </div>
            )}
            <div className="contact-links">
              <a href={TEL} className="contact-link contact-link--solid">Call {PHONE}</a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="contact-link">WhatsApp</a>
            </div>
            <dl className="contact-facts">
              <div><dd>1 day</dd><dt>Reply time</dt></div>
              <div><dd>54,000</dd><dt>Sq ft free now</dt></div>
              <div><dd>Mon–Sat</dd><dt>Site visits</dt></div>
            </dl>
          </div>
        </aside>

        {!sent ? (
          <form className="brief" onSubmit={submit} noValidate>
            <div className="brief-progress">
              <div className="brief-progress-head"><span>Your brief</span><span>{filled} of 6</span></div>
              <div className="brief-progress-bar"><div style={{ width: `${(filled / 6) * 100}%` }} /></div>
            </div>

            <div className="brief-field">
              <label htmlFor="area" className="brief-area-label">
                <span>Space required</span>
                <span className="brief-area-value">{sArea} <span className="unit">sq ft</span></span>
              </label>
              <input id="area" type="range" min="5000" max="100000" step="1000" value={form.area} onChange={(e) => set({ area: +e.target.value })} />
              <div className="brief-range-ends"><span>5,000</span><span>1,00,000+</span></div>
            </div>

            <fieldset className="brief-group">
              <legend>Use</legend>
              <div className="chips">
                {USES.map((u) => <Chip key={u} active={form.use === u} onClick={() => set({ use: u })}>{u}</Chip>)}
              </div>
            </fieldset>
            <fieldset className="brief-group">
              <legend>Sector</legend>
              <div className="chips">
                {Object.entries(SECTORS).map(([k, l]) => (
                  <Chip key={k} active={form.sector === k} onClick={() => set({ sector: form.sector === k ? '' : k })}>{l}</Chip>
                ))}
              </div>
            </fieldset>
            <fieldset className="brief-group">
              <legend>Start</legend>
              <div className="chips">
                {Object.keys(TIMES).map((t) => <Chip key={t} active={form.time === t} onClick={() => set({ time: t })}>{t}</Chip>)}
              </div>
            </fieldset>

            <div className="brief-inputs">
              {FIELDS.map(([k, label, type, ac, ph]) => (
                <label key={k} className="brief-input">
                  <span>{label}</span>
                  <input
                    type={type}
                    value={form[k]}
                    autoComplete={ac}
                    placeholder={ph}
                    aria-invalid={isBad(k)}
                    className={isBad(k) ? 'is-invalid' : ''}
                    onChange={(e) => {
                      set({ [k]: e.target.value });
                      setError('');
                    }}
                  />
                </label>
              ))}
            </div>

            <label className="brief-input">
              <span>Anything else</span>
              <textarea rows={3} value={form.note} placeholder="Racking, temperature, hazardous goods, shift timings…" onChange={(e) => set({ note: e.target.value })} />
            </label>

            {error && <span role="alert" className="brief-error">{error}</span>}

            <button type="submit" className="reset-btn brief-submit">
              <span>Send brief</span>
              <span aria-hidden="true" className="brief-submit-arrow">→</span>
            </button>
          </form>
        ) : (
          <div className="brief-sent" role="status">
            <span className="brief-sent-ref">Brief received · Ref {ref}</span>
            <span className="brief-sent-title">Thank you, <span className="em">{form.name.trim().split(' ')[0] || 'there'}</span>.</span>
            <span className="brief-sent-text">We'll call you within one working day to arrange a site visit.</span>
            <span className="brief-sent-summary">{sArea} sq ft · {sUse} · {sSector} · {sTime}</span>
            <button type="button" className="reset-btn brief-edit" onClick={() => setSent(false)}>Edit brief</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* Re-mount when the query string changes (e.g. clicking a size chip while already on /contact) */
export default function Contact() {
  const [params] = useSearchParams();
  return <ContactForm key={params.toString()} />;
}
