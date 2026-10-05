export const PHONE = '+91 84604 27855';
export const TEL = 'tel:+918460427855';
export const WHATSAPP = 'https://wa.me/918460427855';

export const IMG = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

export const fmt = (n) => Math.round(n).toLocaleString('en-IN');

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
