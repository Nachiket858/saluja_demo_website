import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import NextCard from '../components/NextCard.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { IMG, fmt } from '../data/site.js';
import './Facility.css';

const SPOTS = [
  ['55%', '9%', '12 m clear height', 'Six pallet levels under the eaves — buy less land, store more.'],
  ['40%', '33%', 'Selective racking', 'Racking-ready layout; we can install or you can bring your own system.'],
  ['67%', '45%', 'Reach-truck aisles', 'Aisle widths planned for reach trucks and counterbalance forklifts.'],
  ['22%', '72%', 'Rack protection', 'Upright guards at every aisle end keep impact damage off your stock.'],
  ['32%', '90%', 'FM2 floor · 5 t/m²', 'Laser-levelled, trowelled concrete rated for heavy point loads.'],
];

const STRIP = [
  ['Campus', '1,50,000', 'sq ft'],
  ['Clear height', '12', 'm'],
  ['Floor load', '5', 't/m²'],
  ['Docks', '12', 'bays'],
  ['Power', '500', 'kVA'],
  ['Security', '24×7', 'CCTV'],
];

const DOCS = [
  ['Campus brochure', 'PDF · 12 pages', 'brochure'],
  ['Site & unit plan', 'PDF · A1', 'siteplan'],
  ['Compliance pack', 'Fire NOC & approvals', 'compliance'],
];

const TICKS = [0, 2, 4, 6, 8, 10, 12, 14];

export default function Facility() {
  usePageMeta(
    'Waluj Campus — Specifications & availability | Saluja Warehousing',
    'Saluja Waluj Campus on the Aurangabad–Ahmednagar highway: clear height, floor load, docks, power, units and availability.'
  );
  const [spot, setSpot] = useState(0);

  return (
    <>
      <PageHero
        id="f-h"
        tall
        image={IMG('1553413077-190dd305871c', 2400)}
        alt="Tall racking aisle inside the Waluj Campus"
        crumb="Facility"
        badge="Facility 01 · Nagar Highway, Waluj"
        title={<>Waluj <span className="em">Campus</span></>}
        text="1,50,000 sq ft of high-clearance warehousing beside Waluj MIDC, with direct heavy-vehicle access from the highway."
        aside={
          <Link to="/contact" className="avail-pill">
            <span className="avail-pill-text">
              <span className="avail-pill-kicker">Available now</span>
              <span className="avail-pill-value">54,000 sq ft</span>
            </span>
            <span className="avail-pill-arrow" aria-hidden="true">→</span>
          </Link>
        }
      >
        <div className="spec-strip">
          <div className="divided">
            <dl className="spec-strip-grid">
              {STRIP.map(([l, v, u]) => (
                <div key={l} className="spec-strip-item">
                  <dt>{l}</dt>
                  <dd>{v}<span className="unit">{u}</span></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </PageHero>

      {/* Walk the floor */}
      <section className="section" aria-labelledby="walk-h">
        <div className="container split split--wide-left">
          <div className="walk-media">
            <img src={IMG('1616401784845-180882ba9ba8', 1800)} alt="Pallet racking aisle with a reach truck" loading="lazy" />
            {SPOTS.map(([x, y, title], i) => (
              <button
                key={title}
                type="button"
                className={`reset-btn hotspot${spot === i ? ' is-active' : ''}`}
                style={{ left: x, top: y }}
                aria-label={title}
                aria-pressed={spot === i}
                onClick={() => setSpot(i)}
                onMouseEnter={() => setSpot(i)}
              >
                <span className="hotspot-ring" />
                <span className="hotspot-dot">{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="stack">
            <span className="eyebrow">Inside</span>
            <h2 id="walk-h" className="h2">Walk the <span className="em">floor</span>.</h2>
            <ul className="walk-list">
              {SPOTS.map(([, , title, body], i) => (
                <li key={title}>
                  <button
                    type="button"
                    className={`reset-btn walk-row${spot === i ? ' is-active' : ''}`}
                    aria-expanded={spot === i}
                    onClick={() => setSpot(i)}
                    onMouseEnter={() => setSpot(i)}
                  >
                    <span className="walk-row-head">
                      <span className="walk-num">{i + 1}</span>
                      <span className="walk-title">{title}</span>
                    </span>
                    <span className="walk-body">{body}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="band" aria-labelledby="num-h">
        <div className="container">
          <div className="section-head">
            <div className="stack stack--sm">
              <span className="eyebrow">Specification</span>
              <h2 id="num-h" className="h2">The numbers, <span className="em">drawn</span>.</h2>
            </div>
            <span className="note">Sample figures for design review</span>
          </div>

          <div className="num-grid">
            <figure className="num-card num-card--tall">
              <figcaption className="num-head">
                <span>Clear height</span>
                <span className="num-value">12<span className="unit">m</span></span>
              </figcaption>
              <div className="height-chart" role="img" aria-label="12 metre clear height fits six pallet levels, against three in a typical 7 metre shed">
                <div className="height-axis">
                  {TICKS.map((m) => (
                    <span key={m} style={{ bottom: `${(m / 14) * 100}%` }}>{m} m</span>
                  ))}
                </div>
                <div className="height-col" style={{ height: '85.7%' }}>
                  <span className="height-col-label is-ours">Saluja · 6 levels</span>
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} style={{ background: i % 2 ? '#E8875A' : 'var(--orange)' }} />
                  ))}
                </div>
                <div className="height-col" style={{ height: '50%' }}>
                  <span className="height-col-label">Typical shed · 3</span>
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} style={{ background: 'var(--stone)' }} />
                  ))}
                </div>
              </div>
              <p className="num-text">Twice the stacking height of a typical shed — the same footprint holds roughly double the pallets.</p>
            </figure>

            <figure className="num-card">
              <figcaption className="num-head">
                <span>Floor load · FM2</span>
                <span className="num-value">5<span className="unit">t/m²</span></span>
              </figcaption>
              <div className="load-bars" role="img" aria-label="5 tonnes per square metre, against 3 for a typical shed, on a scale to 8">
                <div className="load-row">
                  <span>Saluja</span>
                  <span className="bar bar--lg"><span style={{ width: '62.5%', background: 'var(--orange)' }} /></span>
                  <span>5</span>
                </div>
                <div className="load-row is-muted">
                  <span>Typical shed</span>
                  <span className="bar bar--lg"><span style={{ width: '37.5%', background: '#C9C3B8' }} /></span>
                  <span>3</span>
                </div>
              </div>
            </figure>

            <figure className="num-card">
              <figcaption className="num-head">
                <span>Loading docks</span>
                <span className="num-value">12<span className="unit">bays</span></span>
              </figcaption>
              <div className="dock-grid" role="img" aria-label="Twelve loading bays, six currently in use">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} style={{ background: i < 6 ? 'var(--blue)' : 'var(--stone)', '--i': i }} />
                ))}
              </div>
              <span className="note num-note">Hydraulic levellers · 1 bay per 12,500 sq ft</span>
            </figure>

            <figure className="num-card num-card--row">
              <div className="power-ring" role="img" aria-label="500 of 750 kVA capacity">
                <div>
                  <span className="power-ring-value">500</span>
                  <span className="power-ring-unit">kVA</span>
                </div>
              </div>
              <figcaption className="power-text">
                <span>Power</span>
                <span>500 kVA sanctioned with headroom to 750 kVA and full DG backup.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section" aria-label="Gallery">
        <div className="container gallery">
          <div className="gallery-frame">
            <img src={IMG('1586528116311-ad8dd3c8310d', 1400)} alt="Warehouse interior stocked with goods" loading="lazy" />
          </div>
          <div className="gallery-frame">
            <img src={IMG('1601584115197-04ecc0da31d7', 900)} alt="Truck arriving at the campus" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section section--flush-top" aria-labelledby="doc-h">
        <div className="container split split--wide-right docs">
          <div className="stack stack--sm">
            <span className="eyebrow">Documents</span>
            <h2 id="doc-h" className="h2">Take it to your <span className="em">board</span>.</h2>
          </div>
          <ul className="doc-list">
            {DOCS.map(([t, m, k]) => (
              <li key={k}>
                <Link to={`/contact?doc=${k}`} className="doc-row">
                  <span className="doc-title">{t}</span>
                  <span className="doc-meta">{m}</span>
                  <span className="doc-btn">Request</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NextCard
        to="/location"
        image={IMG('1590496793929-36417d3117de', 2000)}
        title={<>Location &amp; <span className="em">connectivity</span></>}
      />
    </>
  );
}
