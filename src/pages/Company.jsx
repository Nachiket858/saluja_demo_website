import { useEffect, useRef, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import NextCard from '../components/NextCard.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { IMG } from '../data/site.js';
import portrait from '../assets/jeetendrasingh-saluja.png';
import './Company.css';

const TIMELINE = [
  ['2008', 'Doors open on the Nagar Highway', 'Saluja begins warehousing operations at Waluj, serving manufacturers in the neighbouring MIDC.'],
  ['2014', 'The campus grows', 'Additional sheds and yard space to keep pace with Waluj’s supplier base.'],
  ['2019', 'Built for heavier loads', 'Dock upgrades, a larger truck apron and CCTV across the gate, yard and docks.'],
  ['2023', 'New-generation sheds', 'Higher clear heights and FM2 floors for racked, high-density storage.'],
  ['2026', 'Planning the next phase', 'Preparing for demand from AURIC and the Samruddhi corridor.'],
];

const PRINCIPLES = [
  ['Answer the phone.', 'A named person for every client, reachable on the day — not a ticket queue.'],
  ['Keep the yard moving.', 'Gate, dock and yard run so your trucks are in and out on schedule.'],
  ['Sign for the long term.', 'Most relationships here run for years; terms are built for that.'],
];

const SUSTAINABILITY = [
  ['LED high-bay lighting', 'Installed', 100, 'var(--blue)'],
  ['Rainwater harvesting', 'Installed', 100, 'var(--blue)'],
  ['Rooftop solar', 'In planning', 35, 'var(--orange)'],
  ['EV-ready truck bays', 'Scoping', 15, 'var(--orange)'],
];

export default function Company() {
  usePageMeta(
    'Company — Owner-run warehousing since 2008 | Saluja Warehousing',
    'Saluja Warehousing has operated warehousing on the Aurangabad–Ahmednagar highway at Waluj since 2008. Led by proprietor Jeetendrasingh Saluja.'
  );
  const [active, setActive] = useState(0);
  const [principle, setPrinciple] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const mid = window.innerHeight * 0.55;
        let a = 0;
        itemRefs.current.forEach((el, i) => {
          if (el && el.getBoundingClientRect().top < mid) a = i;
        });
        setActive(a);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <PageHero
        variant="split"
        id="c-h"
        image={IMG('1541888946425-d81bb19240f5', 2400)}
        alt="Aerial view of an industrial site with a team on the ground"
        crumb="Company"
        badge="Family-owned · Waluj"
        facts={[['2008', 'Founded'], ['18+ yrs', 'On the highway'], ['1', 'Name on the gate']]}
        title={<>Owner-run since <span className="em">2008</span>.</>}
        text="Nearly two decades on the same highway, with the same family behind every lease."
      />

      <section className="section" aria-labelledby="story-h">
        <div className="container split story">
          <div className="story-side">
            <div className="story-sticky">
              <span className="eyebrow">Our story</span>
              <h2 id="story-h" className="story-year">{TIMELINE[active][0]}</h2>
              <div className="story-progress">
                <div style={{ width: `${((active + 1) / TIMELINE.length) * 100}%` }} />
              </div>
            </div>
          </div>
          <div>
            <ol className="timeline">
              {TIMELINE.map(([y, title, body], i) => (
                <li
                  key={y}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className={`timeline-item${i === active ? ' is-active' : ''}${i > active ? ' is-ahead' : ''}`}
                >
                  <span className="timeline-year">{y}</span>
                  <span className="timeline-title">{title}</span>
                  <span className="timeline-body">{body}</span>
                </li>
              ))}
            </ol>
            <p className="note timeline-note">Milestones after 2008 are sample content for review</p>
          </div>
        </div>
      </section>

      <section className="band band--dark" aria-labelledby="lead-h">
        <div className="container split">
          <div className="lead-media">
            <img src={portrait} alt="Jeetendrasingh Saluja, Proprietor of Saluja Warehousing" loading="lazy" width="800" height="800" />
            <div className="lead-monogram"><span className="lead-monogram-kicker">Since</span><span>2008</span></div>
          </div>
          <div className="stack">
            <span className="eyebrow">Leadership</span>
            <h2 id="lead-h" className="h2">The name on the gate <span className="em">signs</span> the lease.</h2>
            <p className="lead">
              Clients deal directly with the people who own and run the site — decisions on space, fit-out and terms happen in one conversation.
            </p>
            <div className="lead-person">
              <span>Jeetendrasingh Saluja</span>
              <span>Proprietor</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pr-h">
        <div className="container">
          <div className="stack stack--sm block-head">
            <span className="eyebrow">How we work</span>
            <h2 id="pr-h" className="h2">Three <span className="em">promises</span>.</h2>
          </div>
          <ol className="promises">
            {PRINCIPLES.map(([t, b], i) => (
              <li key={t} className={i === principle ? 'is-active' : ''} onMouseEnter={() => setPrinciple(i)}>
                <span className="promise-n">0{i + 1}</span>
                <span className="promise-t">{t}</span>
                <span className="promise-b">{b}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section--flush-top" aria-labelledby="sus-h">
        <div className="band">
          <div className="container split">
            <div className="stack">
              <span className="eyebrow">Sustainability</span>
              <h2 id="sus-h" className="h2">Lighter on the <span className="em">land</span>.</h2>
              <p className="lead">Large roofs and big yards are an opportunity. Here's where the campus stands today.</p>
            </div>
            <ul className="sus-list">
              {SUSTAINABILITY.map(([t, s, w, c]) => (
                <li key={t}>
                  <span className="sus-head">
                    <span>{t}</span>
                    <span style={{ color: c }}>{s}</span>
                  </span>
                  <span className="bar"><span style={{ width: `${w}%`, background: c }} /></span>
                </li>
              ))}
              <li className="note">Sample status for review</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="company-gap" />
      <NextCard to="/contact" kicker="Work with us" title={<>Check <span className="em">availability</span></>} />
    </>
  );
}
