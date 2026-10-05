import { Link } from 'react-router-dom';
import logoWhite from '../assets/saluja-logo-white.png';
import { PHONE, TEL, WHATSAPP } from '../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logoWhite} alt="Saluja Warehousing" width="138" height="36" />
            <p>High-clearance industrial warehousing on the Aurangabad–Ahmednagar highway beside Waluj MIDC. Operating since 2008.</p>
            <div className="footer-status">
              <span className="live-dot" aria-hidden="true" />
              <span>Campus active 24×7 · Secure yard & docks</span>
            </div>
          </div>
          <div className="footer-col">
            <span className="footer-label">Navigation</span>
            <Link to="/facility">Waluj Campus</Link>
            <Link to="/location">Location &amp; Reach</Link>
            <Link to="/company">Our Story</Link>
            <Link to="/contact">Check Availability</Link>
          </div>
          <div className="footer-col">
            <span className="footer-label">Direct Contact</span>
            <a href={TEL} className="footer-contact-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>{PHONE}</span>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-contact-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>WhatsApp Us</span>
            </a>
          </div>
          <address className="footer-col footer-address">
            <span className="footer-label">Campus Location</span>
            <span>
              Aurangabad–Ahmednagar Highway<br />
              Opp. Sai Services Petrol Pump, Waluj<br />
              Chhatrapati Sambhajinagar 431133<br />
              Maharashtra, India
            </span>
          </address>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Saluja Warehousing</span>
          <span>Imagery and figures are sample content for review</span>
        </div>
      </div>
    </footer>
  );
}
