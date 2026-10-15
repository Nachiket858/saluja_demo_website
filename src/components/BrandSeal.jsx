import BrandMark from './BrandMark.jsx';
import { SEAL_MARK } from '../data/brand.js';
import ring from '../assets/brand/seal-ring.svg';
import ringLight from '../assets/brand/seal-ring-white.svg';
import './BrandSeal.css';

/**
 * The circular company seal: the mark inside a slowly turning
 * "Saluja Warehousing · Commercials Pvt. Ltd." ring. Decorative.
 * - `tone`: 'color' for light discs, 'light' for dark discs
 */
export default function BrandSeal({ tone = 'color', className = '' }) {
  return (
    <span className={`seal ${className}`} aria-hidden="true">
      <img className="seal-ring" src={tone === 'light' ? ringLight : ring} alt="" />
      <BrandMark
        tone={tone}
        className="seal-mark"
        style={{ left: `${SEAL_MARK.left}%`, top: `${SEAL_MARK.top}%`, width: `${SEAL_MARK.width}%` }}
      />
    </span>
  );
}
