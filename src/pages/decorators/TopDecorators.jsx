import { useEffect, useState } from "react";

const AVATAR_COLORS = [
  { bg: "#E6F1FB", text: "#0C447C" },
  { bg: "#E1F5EE", text: "#085041" },
  { bg: "#FAEEDA", text: "#633806" },
  { bg: "#FBEAF0", text: "#72243E" },
  { bg: "#EEEDFE", text: "#3C3489" },
  { bg: "#FAECE7", text: "#712B13" },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRating({ rating }) {
  const r = parseFloat(rating) || 0;
  return (
    <div className="td-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="td-star"
          style={{ color: r >= i ? "#BA7517" : "#d1d0ca" }}
        >
          ★
        </span>
      ))}
      <span className="td-rating-val">{r.toFixed(1)}</span>
    </div>
  );
}

function RankBadge({ index }) {
  const medals = ["🥇", "🥈", "🥉"];
  const colors = ["#BA7517", "#888780", "#854F0B"];
  return (
    <span
      className="td-rank"
      style={{ color: index < 3 ? colors[index] : "#888780" }}
    >
      {index < 3 ? `${medals[index]} #${index + 1}` : `#${index + 1}`}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="td-card td-card-skeleton">
      <div className="skeleton circle" />
      <div className="skeleton line" style={{ width: "70%", height: 14 }} />
      <div className="skeleton line" style={{ width: "45%", height: 11 }} />
      <div className="skeleton line" style={{ width: "80%", height: 11 }} />
      <div className="skeleton pill" />
    </div>
  );
}

function DecoratorCard({ decorator, index }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const specialties = Array.isArray(decorator.specialties)
    ? decorator.specialties.slice(0, 2)
    : [];

  return (
    <div className="td-card">
      <RankBadge index={index} />
      <div
        className="td-avatar"
        style={{ background: color.bg, color: color.text }}
      >
        {getInitials(decorator.name)}
      </div>
      <p className="td-name">{decorator.name || "Decorator"}</p>
      <p className="td-location">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ verticalAlign: "middle", marginRight: 3 }}
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        {decorator.location || "Bangladesh"}
      </p>
      <StarRating rating={decorator.rating} />
      {specialties.length > 0 && (
        <div className="td-tags">
          {specialties.map((s) => (
            <span key={s} className="td-tag">
              {s}
            </span>
          ))}
        </div>
      )}
      <p className="td-projects">
        <span>{decorator.totalProjects ?? 0}</span> projects completed
      </p>
    </div>
  );
}

export default function TopDecorators() {
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDecorators = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/decorators/top?limit=6"
        );
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setDecorators(Array.isArray(data) ? data : []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDecorators();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .td-section {
          padding: 5rem 1.5rem 4rem;
          font-family: 'DM Sans', sans-serif;
          max-width: 1100px;
          margin: 0 auto;
        }

        .td-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .td-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #888780;
          margin: 0 0 0.75rem;
        }

        .td-title {
          font-family: 'Playfair Display', serif;
          font-size: 40px;
          font-weight: 600;
          color: #1a1a18;
          margin: 0 0 0.5rem;
          line-height: 1.2;
        }

        .td-subtitle {
          font-size: 15px;
          color: #5f5e5a;
          font-weight: 300;
          margin: 0;
        }

        .td-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 16px;
        }

        .td-card {
          background: #ffffff;
          border: 0.5px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 1.5rem 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
        }

        .td-card:hover {
          border-color: rgba(0,0,0,0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.07);
        }

        .td-rank {
          position: absolute;
          top: 10px;
          left: 12px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .td-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 0.75rem;
          flex-shrink: 0;
        }

        .td-name {
          font-size: 15px;
          font-weight: 500;
          color: #1a1a18;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .td-location {
          font-size: 12px;
          color: #888780;
          margin: 0 0 10px;
        }

        .td-stars {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
          margin-bottom: 10px;
        }

        .td-star {
          font-size: 13px;
          line-height: 1;
        }

        .td-rating-val {
          font-size: 13px;
          font-weight: 500;
          color: #1a1a18;
          margin-left: 5px;
        }

        .td-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 5px;
          margin-bottom: 12px;
        }

        .td-tag {
          font-size: 10px;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 6px;
          background: #f1efe8;
          color: #5f5e5a;
          border: 0.5px solid rgba(0,0,0,0.08);
        }

        .td-projects {
          font-size: 12px;
          color: #888780;
          margin: 0;
        }

        .td-projects span {
          font-weight: 500;
          color: #5f5e5a;
        }

        /* Skeleton */
        .td-card-skeleton {
          gap: 10px;
          pointer-events: none;
        }

        .skeleton {
          background: #e8e6df;
          border-radius: 6px;
          animation: td-pulse 1.4s ease-in-out infinite;
        }

        .skeleton.circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }

        .skeleton.line {
          align-self: center;
        }

        .skeleton.pill {
          width: 60%;
          height: 20px;
          border-radius: 20px;
        }

        @keyframes td-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* Error / Empty */
        .td-message {
          text-align: center;
          padding: 3rem;
          color: #888780;
          font-size: 14px;
          grid-column: 1 / -1;
        }

        .td-message-icon {
          font-size: 28px;
          display: block;
          margin-bottom: 8px;
        }

        /* Footer button */
        .td-footer {
          text-align: center;
          margin-top: 2.5rem;
        }

        .td-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 28px;
          border-radius: 8px;
          border: 0.5px solid rgba(0,0,0,0.18);
          background: transparent;
          color: #1a1a18;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          text-decoration: none;
        }

        .td-btn:hover {
          background: #f1efe8;
        }

        .td-btn:active {
          transform: scale(0.98);
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .td-title { color: #f1efe8; }
          .td-name { color: #f1efe8; }
          .td-card { background: #1e1e1c; border-color: rgba(255,255,255,0.08); }
          .td-card:hover { border-color: rgba(255,255,255,0.18); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
          .td-tag { background: #2c2c2a; color: #b4b2a9; border-color: rgba(255,255,255,0.06); }
          .td-btn { color: #f1efe8; border-color: rgba(255,255,255,0.18); }
          .td-btn:hover { background: #2c2c2a; }
          .skeleton { background: #2c2c2a; }
          .td-rating-val { color: #f1efe8; }
          .td-projects span { color: #b4b2a9; }
        }

        @media (max-width: 600px) {
          .td-title { font-size: 28px; }
          .td-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <section className="td-section">
        <div className="td-header">
          <p className="td-eyebrow">Our finest talent</p>
          <h2 className="td-title">Top Decorators</h2>
          <p className="td-subtitle">
            Handpicked experts rated by clients across every style
          </p>
        </div>

        <div className="td-grid">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <div className="td-message">
              <span className="td-message-icon">📡</span>
              Could not load decorators. Please check your server connection.
            </div>
          ) : decorators.length === 0 ? (
            <div className="td-message">
              <span className="td-message-icon">🔍</span>
              No decorators found.
            </div>
          ) : (
            decorators.map((d, i) => (
              <DecoratorCard key={d._id || i} decorator={d} index={i} />
            ))
          )}
        </div>

        <div className="td-footer">
          <a href="/decorators" className="td-btn">
            Browse all decorators →
          </a>
        </div>
      </section>
    </>
  );
}