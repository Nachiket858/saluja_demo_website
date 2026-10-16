import { Link, useParams } from 'react-router-dom';
import NextCard from '../components/NextCard.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { POSTS, findPost } from '../data/blog.js';
import { IMG } from '../data/site.js';
import { PostCard, PostMeta } from './Blog.jsx';
import NotFound from './NotFound.jsx';
import './Blog.css';

const BLOCKS = {
  p: (text, key) => <p key={key}>{text}</p>,
  h2: (text, key) => <h2 key={key}>{text}</h2>,
  ul: (items, key) => <ul key={key}>{items.map((t) => <li key={t}>{t}</li>)}</ul>,
  quote: (text, key) => <blockquote key={key}>{text}</blockquote>,
};

function Article({ post }) {
  usePageMeta(`${post.title} | Saluja Warehousing`, post.excerpt);
  const others = POSTS.filter((p) => p !== post);

  return (
    <>
      <article className="article" aria-labelledby="article-h">
        <header className="container article-head">
          <nav className="blog-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog">Blog</Link>
          </nav>
          <PostMeta post={post} />
          <h1 id="article-h" className="article-title">{post.title}</h1>
          <p className="lead article-lead">{post.excerpt}</p>
        </header>

        <div className="article-media">
          <img src={post.image} alt={post.alt} fetchPriority="high" />
        </div>

        <div className="container">
          <div className="article-body">
            {post.body.map(([type, value], i) => BLOCKS[type](value, i))}
          </div>
          <div className="article-foot">
            <span>By the Saluja Warehousing team</span>
            <Link to="/blog" className="btn btn--outline"><span aria-hidden="true">←</span> All articles</Link>
          </div>
        </div>
      </article>

      <section className="section" aria-labelledby="more-h">
        <div className="container">
          <div className="section-head">
            <h2 id="more-h" className="h2">More from the <span className="em">blog</span></h2>
          </div>
          <div className="blog-grid blog-grid--more">
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
  return post ? <Article post={post} /> : <NotFound />;
}
