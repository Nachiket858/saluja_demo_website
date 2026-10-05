import { Link } from 'react-router-dom';
import './NextCard.css';

/** Big end-of-page link to the next page. Pass `image` for the photo variant. */
export default function NextCard({ to, kicker = 'Next', title, image }) {
  return (
    <section className="page-end">
      <Link to={to} className={`next-card${image ? ' next-card--image' : ''}`}>
        {image && (
          <>
            <img src={image} alt="" loading="lazy" className="next-card-img" />
            <span className="next-card-shade" aria-hidden="true" />
          </>
        )}
        <span className="next-card-text">
          <span className="next-card-kicker">{kicker}</span>
          <span className="next-card-title">{title}</span>
        </span>
        <span className="next-card-arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
