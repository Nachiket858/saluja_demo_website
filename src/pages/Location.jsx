import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import NextCard from '../components/NextCard.jsx';
import CampusMap, { distanceKm } from '../components/CampusMap.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { IMG } from '../data/site.js';
import './Location.css';

const PLACES = [
  ['midc', 'Waluj MIDC', 'industry', 'Adjacent', 'Automotive, engineering and process industries on your doorstep.'],
  ['city', 'City centre', 'city', '≈ 30 min', 'Banks, offices, labour and last-mile reach for the city market.'],
  ['rail', 'Railway station', 'transport', '≈ 25 min', 'Rail link toward Manmad, Mumbai and the south.'],
  ['samruddhi', 'Samruddhi access', 'transport', '≈ 25 min', 'Expressway access toward Mumbai and Nagpur.'],
  ['chik', 'Chikalthana MIDC', 'industry', '≈ 40 min', 'Pharma, food and engineering units east of the city.'],
  ['air', 'Airport', 'transport', '≈ 45 min', 'Air cargo and quick access for visiting teams.'],
  ['shendra', 'Shendra · AURIC', 'industry', '≈ 55 min', 'The DMIC smart industrial city — new manufacturing coming online.'],
  ['bidkin', 'AURIC Bidkin', 'industry', '≈ 50 min', 'The larger, later phase of AURIC, south of the city.'],
];

const FILTERS = [['all', 'All'], ['industry', 'Industry'], ['transport', 'Transport'], ['city', 'City']];

const DESTS = [['Jalna', 1], ['Shirdi', 1.75], ['Ahmednagar', 2], ['Nashik', 3.5], ['Pune', 4.5], ['Mumbai', 5], ['Nagpur', 5.5]];

const CAT_DOT = { industry: 'var(--blue)', transport: 'var(--faint)', city: 'var(--ink)' };
const CAT_LABEL = { industry: 'Industry', transport: 'Transport', city: 'City' };

const REGION = [
  ['1513828583688-c52646db42da', 'Industrial process plant', 'Waluj MIDC, next door', 'One of Maharashtra’s largest industrial estates — automotive, engineering and process manufacturers who need stock close to the line.'],
  ['1541888946425-d81bb19240f5', 'Large industrial site under development', 'AURIC & the DMIC', 'The Shendra–Bidkin industrial city on the Delhi–Mumbai Industrial Corridor is bringing new manufacturing — and new storage demand.'],
  ['1519003722824-194d4455a60c', 'Truck on an open highway', 'Samruddhi Mahamarg', 'The Mumbai–Nagpur expressway puts the city within a day’s round trip of both ends of the state.'],
];

const hours = (h) => {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return mm ? `${hh}h ${mm}m` : `${hh}h`;
};

export default function Location() {
  usePageMeta(
    'Location & connectivity — Waluj, Chhatrapati Sambhajinagar | Saluja Warehousing',
    'Saluja Warehousing sits on the Aurangabad–Ahmednagar highway at Waluj MIDC, close to Shendra, AURIC, the airport and Samruddhi Mahamarg.'
  );
  const [pick, setPick] = useState('city');
  const [filter, setFilter] = useState('all');
  const [dest, setDest] = useState(4);

  const visible = PLACES.filter(([, , cat]) => filter === 'all' || filter === cat);
  const pickIndex = Math.max(0, visible.findIndex(([id]) => id === pick));
  const current = visible[pickIndex];
  const step = (dir) => setPick(visible[(pickIndex + dir + visible.length) % visible.length][0]);
  const chooseFilter = (k) => {
    setFilter(k);
    // keep the selection inside the filtered set
    const next = PLACES.filter(([, , cat]) => k === 'all' || k === cat);
    if (!next.some(([id]) => id === pick)) setPick(next[0][0]);
  };

  return (
    <>
      <PageHero
        id="l-h"
        image={IMG('1590496793929-36417d3117de', 2400)}
        alt="Aerial view of trucks in a logistics yard"
        crumb="Location"
        badge="N 19.84° · E 75.24° · Waluj"
        facts={[['Adjacent', 'Waluj MIDC'], ['≈ 25 min', 'Samruddhi'], ['≈ 45 min', 'Airport']]}
        title={<>At the centre of Marathwada's <span className="em">industry</span>.</>}
        text="On the Nagar Highway beside Waluj MIDC — a short haul from Shendra, AURIC, the airport and the Samruddhi expressway."
      />

      <section className="section" aria-labelledby="map-h">
        <div className="container split split--wide-right map-layout">
          <div className="stack">
            <span className="eyebrow">The neighbourhood</span>
            <h2 id="map-h" className="h2">What's <span className="em">around</span> you.</h2>
            <div className="seg" role="group" aria-label="Filter places">
              {FILTERS.map(([k, label]) => (
                <button key={k} type="button" className={`seg-btn${filter === k ? ' is-active' : ''}`} aria-pressed={filter === k} onClick={() => chooseFilter(k)}>
                  {label}
                </button>
              ))}
            </div>
            <ul className="place-list">
              {visible.map(([id, name, cat, time, note]) => (
                <li key={id}>
                  <button type="button" className={`reset-btn place-row${pick === id ? ' is-active' : ''}`} aria-pressed={pick === id} onClick={() => setPick(id)}>
                    <span className="place-head">
                      <span className="place-name">
                        <span className="place-dot" style={{ background: pick === id ? 'var(--orange)' : CAT_DOT[cat] }} />
                        {name}
                      </span>
                      <span className="place-time">{time}<span className="place-km"> · {distanceKm(id).toFixed(0)} km</span></span>
                    </span>
                    <span className="place-note">{note}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="map-frame">
            <CampusMap pick={pick} filter={filter} onPick={setPick} label="Interactive map of Saluja Waluj Campus and surroundings" />
            <div className="map-legend" aria-hidden="true">
              <span><i style={{ background: 'var(--orange)' }} />Saluja</span>
              <span><i style={{ background: CAT_DOT.industry }} />Industry</span>
              <span><i style={{ background: CAT_DOT.transport }} />Transport</span>
              <span><i style={{ background: CAT_DOT.city }} />City</span>
            </div>
            {current && (
              <div className="map-card" key={current[0]} aria-live="polite">
                <div className="map-card-top">
                  <span className="map-card-cat" style={{ color: CAT_DOT[current[2]] }}>{CAT_LABEL[current[2]]}</span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=19.842,75.236&destination=${encodeURIComponent(current[1] + ', Maharashtra')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="map-card-dir"
                    title="Open route in Google Maps"
                  >
                    Directions ↗
                  </a>
                </div>
                <span className="map-card-name">{current[1]}</span>
                <span className="map-card-note">{current[4]}</span>
                <dl className="map-card-stats">
                  <div><dd>{current[3]}</dd><dt>Drive time</dt></div>
                  <div><dd>{distanceKm(current[0]).toFixed(1)} km</dd><dt>Direct distance</dt></div>
                </dl>
                <div className="map-card-nav">
                  <button type="button" className="reset-btn" onClick={() => step(-1)} aria-label="Previous place">←</button>
                  <span>{pickIndex + 1} of {visible.length}</span>
                  <button type="button" className="reset-btn" onClick={() => step(1)} aria-label="Next place">→</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="band band--dark" aria-labelledby="t-h">
        <div className="container split split--wide-right">
          <div className="stack">
            <span className="eyebrow">Reach</span>
            <h2 id="t-h" className="h2">Hours, not <span className="em">days</span>.</h2>
            <p className="lead">Indicative truck drive times from the gate to the markets that matter.</p>
          </div>
          <div>
            <ul className="dest-list" aria-label={'Drive times from Waluj: ' + DESTS.map(([n, h]) => `${n} about ${h} hours`).join(', ')}>
              {DESTS.map(([n, h], i) => (
                <li key={n}>
                  <button
                    type="button"
                    className={`reset-btn dest-row${dest === i ? ' is-active' : ''}`}
                    onMouseEnter={() => setDest(i)}
                    onFocus={() => setDest(i)}
                    onClick={() => setDest(i)}
                  >
                    <span className="dest-name">{n}</span>
                    <span className="bar bar--dark">
                      <span style={{ width: `${(h / 6) * 100}%`, background: dest === i ? 'var(--orange)' : 'var(--blue)' }} />
                    </span>
                    <span className="dest-time">{hours(h)}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="dest-note">Indicative · verify before publishing</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="eco-h">
        <div className="container">
          <div className="stack stack--sm block-head">
            <span className="eyebrow">Why here</span>
            <h2 id="eco-h" className="h2">A region that's being <span className="em">built out</span>.</h2>
          </div>
          <div className="region-grid">
            {REGION.map(([id, alt, title, body]) => (
              <article key={title} className="region-card">
                <div className="region-card-img-wrap">
                  <img src={IMG(id, 1000)} alt={alt} loading="lazy" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NextCard to="/company" title={<>The <span className="em">company</span></>} />
    </>
  );
}
