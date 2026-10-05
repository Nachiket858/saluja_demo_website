import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useHeroScroll from '../hooks/useHeroScroll.js';
import './PageHero.css';

/**
 * Rounded photo hero for the inner pages (Facility, Location, Company).
 * - `crumb`: breadcrumb label for this page
 * - `facts`: [[value, label], …] shown in a glass panel on wide screens
 * - `aside`: replaces the facts panel with custom content (e.g. a CTA)
 */
export default function PageHero({ id, image, alt, badge, crumb, title, text, facts, tall = false, aside, children }) {
  const frameRef = useRef(null);
  useHeroScroll(frameRef);

  return (
    <section className="page-hero" aria-labelledby={id}>
      <div ref={frameRef} className={`page-hero-frame${tall ? ' is-tall' : ''}`}>
        <div className="page-hero-media">
          <img src={image} alt={alt} fetchPriority="high" className="page-hero-img" />
        </div>
        <div className="page-hero-shade" aria-hidden="true" />
        <div className="page-hero-grain" aria-hidden="true" />

        <div className="page-hero-body">
          <div className="page-hero-copy">
            {crumb && (
              <nav className="page-hero-crumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{crumb}</span>
              </nav>
            )}
            <span className="glass-chip page-hero-chip">
              <span className="page-hero-chip-dot" aria-hidden="true" />
              {badge}
            </span>
            <h1 id={id} className="page-hero-title">{title}</h1>
            <p className="page-hero-text">{text}</p>
          </div>

          {aside ??
            (facts && (
              <dl className="page-hero-facts">
                {facts.map(([v, l]) => (
                  <div key={l}>
                    <dd>{v}</dd>
                    <dt>{l}</dt>
                  </div>
                ))}
              </dl>
            ))}
        </div>

        {!tall && (
          <span className="page-hero-cue" aria-hidden="true">
            <span className="page-hero-cue-line" />
            Scroll
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
