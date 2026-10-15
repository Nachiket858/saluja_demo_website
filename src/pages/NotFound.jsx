import { Link } from 'react-router-dom';
import BrandMark from '../components/BrandMark.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { PHONE, TEL } from '../data/site.js';
import './NotFound.css';

export default function NotFound() {
  usePageMeta('Page not found | Saluja Warehousing');
  return (
    <section className="nf" aria-labelledby="nf-h">
      <div className="container nf-inner">
        <BrandMark className="nf-mark" />
        <span className="eyebrow">Error 404</span>
        <h1 id="nf-h" className="h2 nf-title">This aisle is <span className="em">empty</span>.</h1>
        <p className="lead">The page you were looking for has moved or never existed. The campus, though, is right where it has been since 2008.</p>
        <div className="nf-actions">
          <Link to="/" className="btn btn--dark">Back to home <span aria-hidden="true">→</span></Link>
          <Link to="/contact" className="btn btn--outline">Check availability</Link>
        </div>
        <a href={TEL} className="note nf-call">or call {PHONE}</a>
      </div>
    </section>
  );
}
