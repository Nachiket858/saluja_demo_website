import { useEffect } from 'react';
import { prefersReducedMotion } from '../data/site.js';

/** Writes --p (0 → 1 as the element scrolls out of view) onto the element. */
export default function useHeroScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = null;
    const update = () => {
      raf = null;
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height)));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
}
