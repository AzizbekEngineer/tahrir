import { useMemo, useState } from "react";
import "./blog.scss";

const CATEGORIES = [
  "All articles",
  "Writing tips",
  "Grammar",
  "AI tools",
  "Documents",
];

const ARTICLES = [
  {
    id: 1,
    category: "Documents",
    title: "A better way to edit long documents",
    text: "Tools, techniques, and workflows to make editing faster, easier, and more effective.",
    date: "Mar 12, 2024",
    read: "8 min read",
    cover: "peach",
    icon: "search",
  },
  {
    id: 2,
    category: "Writing tips",
    title: "How to write a professional email",
    text: "A simple guide to writing clear, polite, and effective emails for work, with helpful templates.",
    date: "Mar 5, 2024",
    read: "6 min read",
    cover: "peach",
    icon: "mail",
  },
  {
    id: 3,
    category: "AI tools",
    title: "What AI can—and cannot—fix",
    text: "A balanced look at where AI helps with writing, and where human judgment still matters.",
    date: "Feb 28, 2024",
    read: "7 min read",
    cover: "dark",
    icon: "bulb",
  },
];

const Icon = ({ name }) => {
  const paths = {
    search: (
      <>
        <circle
          cx="26"
          cy="26"
          r="16"
          fill="none"
          stroke="#ff5a1f"
          strokeWidth="6"
        />
        <line
          x1="38"
          y1="38"
          x2="56"
          y2="56"
          stroke="#1a1d2b"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </>
    ),
    mail: (
      <>
        <rect x="6" y="14" width="52" height="38" rx="5" fill="#ff5a1f" />
        <path
          d="M6 18l26 20 26-20"
          fill="none"
          stroke="#ff8a55"
          strokeWidth="4"
        />
      </>
    ),
    bulb: (
      <>
        <circle
          cx="32"
          cy="26"
          r="18"
          fill="none"
          stroke="#ff5a1f"
          strokeWidth="4"
        />
        <rect x="25" y="46" width="14" height="8" rx="2" fill="#ff5a1f" />
      </>
    ),
  };
  return (
    <svg className="blog__icon" viewBox="0 0 64 64" aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

const Calendar = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect
      x="2"
      y="3"
      width="12"
      height="11"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <path
      d="M3 10h13M11 5l5 5-5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Blog() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [query, setQuery] = useState("");

  const articles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter(
      (a) =>
        (category === CATEGORIES[0] || a.category === category) &&
        (!q ||
          a.title.toLowerCase().includes(q) ||
          a.text.toLowerCase().includes(q)),
    );
  }, [category, query]);

  return (
    <main className="blog">
      <div className="container">
        <section className="blog__hero">
          <div className="blog__hero-text">
            <h1 className="blog__title">
              Ideas for <br />
              <span className="blog__title-accent">better</span> writing
              <span className="blog__title-accent">.</span>
            </h1>
            <p className="blog__subtitle">
              Practical insights on language, clarity, and thoughtful
              communication.
            </p>
          </div>
          <div className="blog__star" aria-hidden="true">
            <span className="blog__dot blog__dot--lg" />
            <span className="blog__dot blog__dot--sm" />
            <svg viewBox="0 0 100 100">
              <path
                d="M50 0 C54 36 64 46 100 50 C64 54 54 64 50 100 C46 64 36 54 0 50 C36 46 46 36 50 0Z"
                fill="#ff5a1f"
              />
            </svg>
          </div>
        </section>

        <section className="blog__toolbar">
          <div className="blog__chips" role="tablist">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={c === category}
                className={`blog__chip ${c === category ? "is-active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="blog__search">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <circle
                cx="9"
                cy="9"
                r="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M14 14l4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="search"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </section>

        <section className="blog__featured-grid">
          <article className="blog__featured">
            <div className="blog__featured-body">
              <span className="blog__badge">★ FEATURED</span>
              <h2>Write with clarity and confidence</h2>
              <p>
                Practical strategies to express your ideas more clearly,
                structure your thoughts, and write with confidence in any
                situation.
              </p>
              <a href="#" className="blog__btn">
                Read article <Arrow />
              </a>
            </div>
            <div className="blog__featured-art" aria-hidden="true">
              <span className="blog__scroll" />
              <span className="blog__sheet">
                {[60, 85, 40, 85, 70, 85, 55, 85].map((w, i) => (
                  <i
                    key={i}
                    className={i === 2 || i === 7 ? "is-orange" : ""}
                    style={{ width: `${w}%` }}
                  />
                ))}
              </span>
              <span className="blog__pencil" />
            </div>
          </article>

          <div className="blog__side">
            <a href="#" className="blog__side-card blog__side-card--peach">
              <div>
                <small>WRITING TIPS</small>
                <h3>7 ways to improve your writing</h3>
                <p>
                  Simple, practical habits that instantly make your writing
                  clearer, stronger, and more effective.
                </p>
              </div>
              <div className="blog__bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </a>
            <a href="#" className="blog__side-card blog__side-card--lilac">
              <div>
                <small>GRAMMAR</small>
                <h3>Common grammar mistakes to avoid</h3>
                <p>
                  Learn the most frequent writing mistakes and how to fix them,
                  with clear examples.
                </p>
              </div>
              <div className="blog__aa" aria-hidden="true">
                <b>Aa</b>
                <em>!</em>
              </div>
            </a>
          </div>
        </section>

        <section className="blog__latest">
          <div className="blog__latest-head">
            <h2>Latest articles</h2>
            <a href="#">
              See all articles <Arrow />
            </a>
          </div>

          {articles.length ? (
            <div className="blog__cards">
              {articles.map((a) => (
                <a key={a.id} href="#" className="blog__card">
                  <div className={`blog__cover blog__cover--${a.cover}`}>
                    <Icon name={a.icon} />
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                  <span className="blog__meta">
                    <Calendar /> {a.date} <i>|</i> {a.read}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="blog__empty">
              No articles found. Try a different search or category.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
