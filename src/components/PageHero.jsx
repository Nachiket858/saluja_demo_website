import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useHeroScroll from '../hooks/useHeroScroll.js';
import './PageHero.css';

/**
 * Hero for the inner pages. Each page gets its own layout via `variant`:
 * - 'split' (Company): copy on the left, tall photo panel on the right
 * - 'stack' (Facility): oversized title row above a wide cinematic photo
 * - 'orbit' (Location): dark panel with a round photo inside range rings
 *
 * - `crumb`: breadcrumb label for this page
 * - `badge`: small caption (on the photo, or as a chip on the dark panel)
 * - `facts`: [[value, label], …] shown as a ruled row
 * - `aside`: custom content (e.g. a CTA) floated on the photo
 * - `tall`: taller photo panel ('split' only)
 */
export default function PageHero({ variant = 'split', id, image, alt, badge, crumb, title, text, facts, tall = false, aside, children }) {
  const frameRef = useRef(null);
  useHeroScroll(frameRef);

  const crumbs = crumb && (
    <nav className="page-hero-crumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{crumb}</span>
    </nav>
  );
  const heading = <h1 id={id} className="page-hero-title">{title}</h1>;
  const lead = <p className="page-hero-text">{text}</p>;
  const factList = facts && (
    <dl className="page-hero-facts">
      {facts.map(([v, l]) => (
        <div key={l}>
          <dd>{v}</dd>
          <dt>{l}</dt>
        </div>
      ))}
    </dl>
  );
  const badgeChip = badge && (
    <span className="page-hero-badge">
      <span className="page-hero-badge-dot" aria-hidden="true" />
      {badge}
    </span>
  );
  const photo = <img src={image} alt={alt} fetchPriority="high" className="page-hero-img" />;

  let body;
  if (variant === 'stack') {
    body = (
      <>
        <div className="page-hero-head">
          <div className="page-hero-copy">
            {crumbs}
            {heading}
          </div>
          <div className="page-hero-side">
            {lead}
            {factList}
          </div>
        </div>
        <div className="page-hero-media">
          {photo}
          <div className="page-hero-shade" aria-hidden="true" />
          {badgeChip}
          {aside && <div className="page-hero-aside">{aside}</div>}
        </div>
      </>
    );
  } else if (variant === 'orbit') {
    body = (
      <>
        <div className="page-hero-copy">
          {crumbs}
          {badgeChip}
          {heading}
          {lead}
          {factList}
        </div>
        <div className="page-hero-orbit">
          <svg className="page-hero-rings" viewBox="0 0 400 400" aria-hidden="true">
            <circle cx="200" cy="200" r="196" />
            <circle cx="200" cy="200" r="168" className="is-dashed" />
            <g className="page-hero-ticks">
              {Array.from({ length: 72 }, (_, i) => (
                <line key={i} x1="200" y1="4" x2="200" y2={i % 6 ? 10 : 18} transform={`rotate(${i * 5} 200 200)`} />
              ))}
            </g>
          </svg>
          <span className="page-hero-compass is-n" aria-hidden="true">N</span>
          <span className="page-hero-compass is-e" aria-hidden="true">E</span>
          <span className="page-hero-compass is-s" aria-hidden="true">S</span>
          <span className="page-hero-compass is-w" aria-hidden="true">W</span>
          <div className="page-hero-media">
            {photo}
            <div className="page-hero-shade" aria-hidden="true" />
          </div>
          <span className="page-hero-pin" aria-hidden="true"><i /></span>
          {aside && <div className="page-hero-aside">{aside}</div>}
        </div>
      </>
    );
  } else {
    body = (
      <>
        <div className="page-hero-copy">
          {crumbs}
          {heading}
          {lead}
          {factList}
        </div>
        <div className="page-hero-media">
          {photo}
          <div className="page-hero-shade" aria-hidden="true" />
          {badgeChip}
          {aside && <div className="page-hero-aside">{aside}</div>}
        </div>
      </>
    );
  }

  return (
    <section className={`page-hero page-hero--${variant}`} aria-labelledby={id}>
      <div ref={frameRef} className={`page-hero-frame${tall ? ' is-tall' : ''}`}>
        {body}
      </div>
      {children}
    </section>
  );
}
