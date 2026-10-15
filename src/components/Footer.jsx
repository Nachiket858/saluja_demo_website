import { Link } from 'react-router-dom';
import logoWhite from '../assets/brand/logo-horizontal-white.svg';
import { WORDMARK } from '../data/brand.js';
import { DIRECTIONS, PHONE, TEL, WHATSAPP } from '../data/site.js';
import './Footer.css';

const LINKS = [
  ['Home', '/'],
  ['Facility', '/facility'],
  ['Location', '/location'],
  ['Company', '/company'],
  ['Contact', '/contact'],
];

// Lay the wordmark letters side by side in one SVG
const WORD_X = WORDMARK.letters.reduce((xs, l, i) => [...xs, i ? xs[i - 1] + WORDMARK.letters[i - 1].w : 0], []);
const WORD_W = WORD_X.at(-1) + WORDMARK.letters.at(-1).w;

const Icon = ({ children }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <Link to="/" className="footer-logo" aria-label="Saluja Warehousing home">
            <img src={logoWhite} alt="Saluja Warehousing" width="207" height="44" />
          </Link>
          <span className="footer-status">
            <span className="live-dot" aria-hidden="true" />
            Campus active 24×7 · Secure yard &amp; docks
          </span>
        </div>

        <div className="footer-grid">
          <div className="footer-about">
            <p className="footer-statement">
              Industrial warehousing on the Nagar Highway, <span className="em">since 2008</span>.
            </p>
            <p className="footer-blurb">High-clearance space beside Waluj MIDC, reachable by heavy vehicles and run by the family that owns it.</p>
          </div>

          <nav className="footer-col footer-nav" aria-label="Footer">
            <span className="footer-label">Explore</span>
            {LINKS.map(([label, to]) => (
              <Link key={to} to={to} className="footer-link">{label}</Link>
            ))}
          </nav>

          <div className="footer-col">
            <span className="footer-label">Get in touch</span>
            <a href={TEL} className="footer-pill">
              <Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>
              {PHONE}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-pill">
              <Icon><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Icon>
              WhatsApp us
            </a>
            <span className="footer-note">Site visits Mon–Sat · Replies within a day</span>
          </div>

          <address className="footer-col">
            <span className="footer-label">Visit the campus</span>
            <span className="footer-address">
              Aurangabad–Ahmednagar Highway<br />
              Opp. Sai Services Petrol Pump, Waluj<br />
              Chhatrapati Sambhajinagar 431133<br />
              Maharashtra, India
            </span>
            <a href={DIRECTIONS} target="_blank" rel="noreferrer" className="footer-link footer-directions">
              Get directions <span aria-hidden="true">↗</span>
            </a>
          </address>
        </div>

        <svg className="footer-wordmark" viewBox={`0 0 ${WORD_W} ${WORDMARK.h}`} aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="footer-wordmark-tone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopOpacity="0.09" />
              <stop offset="1" stopOpacity="0.035" />
            </linearGradient>
          </defs>
          {WORDMARK.letters.map((l, i) => (
            <path key={i} d={l.d} fill="url(#footer-wordmark-tone)" transform={`translate(${WORD_X[i]} 0)`} />
          ))}
        </svg>

        <div className="footer-base">
          <span>© {new Date().getFullYear()} Saluja Warehousing. All rights reserved.</span>
          <span className="footer-credit">
            Developed and maintained by{' '}
            <a href="https://idyllictechnology.com/" target="_blank" rel="noopener">Idyllic Technology Solution</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
