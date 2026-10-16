import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BrandMark from '../components/BrandMark.jsx';
import NextCard from '../components/NextCard.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { POSTS, findPost, formatDate, readTime } from '../data/blog.js';
import { IMG } from '../data/site.js';
import { PostCard } from './Blog.jsx';
import NotFound from './NotFound.jsx';
import './Blog.css';

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const BLOCKS = {
  p: (text, key) => <p key={key}>{text}</p>,
  h2: (text, key) => <h2 key={key} id={slugify(text)}>{text}</h2>,
  ul: (items, key) => <ul key={key}>{items.map((t) => <li key={t}>{t}</li>)}</ul>,
  quote: (text, key) => <blockquote key={key}>{text}</blockquote>,
};

/** Highlight the contents entry for the section being read. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const onScroll = () => {
      const current = els.filter((el) => el.getBoundingClientRect().top < window.innerHeight * 0.35).at(-1);
      setActive(current?.id ?? ids[0]);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}

function Article({ post }) {
  usePageMeta(`${post.title} | Saluja Warehousing`, post.excerpt);
  const others = POSTS.filter((p) => p !== post);
  const sections = useMemo(() => post.body.filter(([type]) => type === 'h2').map(([, text]) => [slugify(text), text]), [post]);
  const ids = useMemo(() => sections.map(([id]) => id), [sections]);
  const active = useActiveSection(ids);

  return (
    <>
      <article aria-labelledby="article-h">
        <header className="article-hero">
          <div className="article-hero-frame">
            <div className="article-head">
              <nav className="blog-crumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link to="/blog">Blog</Link>
              </nav>
              <span className="post-tag">{post.category}</span>
              <h1 id="article-h" className="article-title">{post.title}</h1>
              <p className="article-lead">{post.excerpt}</p>
              <dl className="article-facts">
                <div><dt>Published</dt><dd><time dateTime={post.date}>{formatDate(post.date)}</time></dd></div>
                <div><dt>Reading time</dt><dd>{readTime(post)}</dd></div>
                <div><dt>Written by</dt><dd>Saluja team</dd></div>
              </dl>
            </div>
            <div className="article-media">
              <img src={post.image} alt={post.alt} fetchPriority="high" />
            </div>
          </div>
        </header>

        <div className="container article-layout">
          <aside className="article-aside">
            <nav className="article-toc" aria-label="In this article">
              <span className="article-aside-label">In this article</span>
              {sections.map(([id, text]) => (
                <a key={id} href={`#${id}`} className={id === active ? 'is-active' : undefined}>{text}</a>
              ))}
            </nav>
            <Link to="/blog" className="article-back"><span aria-hidden="true">←</span> All articles</Link>
          </aside>

          <div className="article-body">
            {post.body.map(([type, value], i) => BLOCKS[type](value, i))}

            <div className="article-cta">
              <BrandMark className="article-cta-mark" />
              <div>
                <p className="article-cta-title">Looking for warehouse space near Waluj MIDC?</p>
                <p className="article-cta-text">See the campus, check what is free and get a quote within a day.</p>
              </div>
              <Link to="/contact" className="btn btn--dark">Check availability <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </article>

      <section className="section" aria-labelledby="more-h">
        <div className="container">
          <div className="section-head">
            <h2 id="more-h" className="h2">More from the <span className="em">blog</span></h2>
            <Link to="/blog" className="btn btn--outline">All articles <span aria-hidden="true">→</span></Link>
          </div>
          <div className="blog-grid">
            {others.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
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

export default function BlogPost() {
  const post = findPost(useParams().slug);
  // Keyed so the contents list resets when moving between articles
  return post ? <Article key={post.slug} post={post} /> : <NotFound />;
}
