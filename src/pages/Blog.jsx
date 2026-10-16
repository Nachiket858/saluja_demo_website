import { Link } from 'react-router-dom';
import NextCard from '../components/NextCard.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { POSTS, formatDate, readTime } from '../data/blog.js';
import { IMG } from '../data/site.js';
import './Blog.css';

export function PostMeta({ post }) {
  return (
    <span className="post-meta">
      <span className="post-tag">{post.category}</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{readTime(post)}</span>
    </span>
  );
}

export function PostCard({ post, featured = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className={`post-card${featured ? ' is-featured' : ''}`}>
      <span className="post-card-media">
        <img src={post.image} alt={post.alt} loading={featured ? 'eager' : 'lazy'} />
      </span>
      <span className="post-card-body">
        <PostMeta post={post} />
        <span className="post-card-title">{post.title}</span>
        <span className="post-card-excerpt">{post.excerpt}</span>
        <span className="post-card-more">Read article <span aria-hidden="true">→</span></span>
      </span>
    </Link>
  );
}

export default function Blog() {
  usePageMeta(
    'Blog — Warehousing insights from Waluj | Saluja Warehousing',
    'Practical articles on choosing warehouse space, the Chhatrapati Sambhajinagar logistics market and planning storage for a growing business.'
  );
  const [first, ...rest] = POSTS;

  return (
    <>
      <section className="blog-head" aria-labelledby="blog-h">
        <div className="container blog-head-inner">
          <nav className="blog-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Blog</span>
          </nav>
          <h1 id="blog-h" className="blog-title">Notes from the <span className="em">warehouse</span>.</h1>
          <p className="lead">Practical thinking on storage, logistics and running a business around Waluj, from the team that has operated here since 2008.</p>
        </div>
      </section>

      <section className="section section--flush-top" aria-label="Articles">
        <div className="container blog-grid">
          <PostCard post={first} featured />
          {rest.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      </section>

      <NextCard
        to="/contact"
        kicker="Looking for space?"
        title={<>Tell us what you store. <span className="em">We’ll show you where.</span></>}
        image={IMG('1592838064575-70ed626d3a0e', 2000)}
      />
    </>
  );
}
