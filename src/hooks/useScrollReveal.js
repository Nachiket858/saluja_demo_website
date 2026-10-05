import { useEffect } from 'react';
import { prefersReducedMotion } from '../data/site.js';

/*
 * Everything that should rise into view as you scroll. Kept in one list so
 * pages stay free of animation markup. Siblings matched together are staggered.
 * Hero content is deliberately not listed — heroes have their own entrance.
 */
const SELECTORS = [
  // shared
  '.section .eyebrow', '.band .eyebrow', '.h2', '.lead', '.section .btn', '.band .btn',
  '.rail-controls', '.next-card',
  // home
  '.intro-collage', '.intro-stat', '.spec-media', '.spec-list li', '.drive-list', '.home-map',
  '.rail-card', '.home-cta',
  // facility
  '.spec-strip', '.walk-media', '.walk-list li', '.num-card', '.height-chart', '.load-bars', '.dock-grid',
  '.gallery', '.doc-list li',
  // location
  '.seg', '.place-list li', '.map-frame', '.dest-list', '.region-card',
  // company
  '.story-sticky', '.lead-media', '.lead-person', '.promises li', '.sus-list',
];

export default function useScrollReveal(key) {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.dataset.rv = '1';
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    // Wait a frame so the new route has painted
    const raf = requestAnimationFrame(() => {
      const els = new Set(document.querySelectorAll(SELECTORS.join(',')));
      const siblingIndex = new Map();
      els.forEach((el) => {
        if (el.dataset.rv) return;
        const parent = el.parentElement;
        const i = siblingIndex.get(parent) ?? 0;
        siblingIndex.set(parent, i + 1);
        el.style.setProperty('--rv-d', `${Math.min(i, 6) * 80}ms`);
        el.dataset.rv = '0';
        io.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [key]);
}
