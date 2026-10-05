import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/saluja-logo.png';
import { PHONE, TEL } from '../data/site.js';
import './Nav.css';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Facility', to: '/facility' },
  { label: 'Location', to: '/location' },
  { label: 'Company', to: '/company' },
  { label: 'Contact', to: '/contact' },
];

const linkClass = (base) => ({ isActive }) => base + (isActive ? ' is-active' : '');

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 1080px)');
    const onWide = (e) => e.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <nav className="nav-bar" aria-label="Primary">
        <Link to="/" className="nav-logo" aria-label="Saluja Warehousing home">
          <img src={logo} alt="Saluja Warehousing" width="121" height="32" />
        </Link>

        <div className="nav-links">
          {LINKS.slice(0, 4).map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkClass('nav-link')}>
              <span className="nav-dot" aria-hidden="true" />
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <a href={TEL} className="nav-phone" aria-label={`Call ${PHONE}`}>
            <span className="live-dot" aria-hidden="true" />
            {PHONE}
          </a>
          <Link to="/contact" className="nav-cta">
            <span className="nav-cta-long">Check availability</span>
            <span className="nav-cta-short">Enquire</span>
            <span className="nav-cta-arrow" aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      {open && (
        <div id="nav-menu" className="nav-menu">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkClass('nav-menu-link')}>
              <span className="nav-menu-label">
                <span className="nav-dot" aria-hidden="true" />
                {l.label}
              </span>
              <span className="nav-menu-arrow" aria-hidden="true">→</span>
            </NavLink>
          ))}
          <a href={TEL} className="nav-menu-phone">
            <span className="live-dot" aria-hidden="true" />
            {PHONE}
          </a>
        </div>
      )}
    </header>
  );
}
