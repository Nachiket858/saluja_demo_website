import { MARK } from '../data/brand.js';

const TONES = {
  color: ['var(--navy)', 'var(--orange)'],
  light: ['var(--bg)', 'var(--bg)'],
};

/**
 * The five-triangle Saluja mark.
 * - `tone`: 'color' (navy with the orange triangle) or 'light' (all off-white, for dark grounds)
 * - `title`: accessible name; omit when the mark is decorative
 */
export default function BrandMark({ tone = 'color', title, className, style }) {
  const [body, accent] = TONES[tone];
  return (
    <svg
      className={className}
      style={style}
      viewBox={`0 0 ${MARK.w} ${MARK.h}`}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      <path fill={body} d={MARK.body} />
      <path fill={accent} d={MARK.accent} />
    </svg>
  );
}
