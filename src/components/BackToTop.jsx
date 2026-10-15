import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../data/site.js';
import './BackToTop.css';

/** Floating bottom-right button; appears after the first screen, ring shows scroll progress. */
export default function BackToTop() {
  const [shown, setShown] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setShown(y > window.innerHeight * 0.8);
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(100 - (max > 0 ? (y / max) * 100 : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

  return (
    <button
      type="button"
      className={`reset-btn to-top${shown ? ' is-shown' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
    >
      <svg className="to-top-ring" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="16" pathLength="100" />
        <circle ref={ringRef} cx="18" cy="18" r="16" pathLength="100" className="to-top-ring-fill" />
      </svg>
      <span aria-hidden="true">↑</span>
    </button>
  );
}
