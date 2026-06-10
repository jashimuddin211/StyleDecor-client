import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AVATAR_STYLES = [
  "bg-primary/10 text-primary",
  "bg-secondary/10 text-secondary",
  "bg-accent/10 text-accent",
  "bg-info/10 text-info",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
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
    <div className="flex items-center justify-center gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-xs ${r >= i ? "text-warning" : "text-base-300"}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs font-semibold text-base-content ml-1.5">{r.toFixed(1)}</span>
    </div>
  );
}

function RankBadge({ index }) {
  const medals = ["🥇", "🥈", "🥉"];
  const badgeClasses = [
    "bg-warning/20 text-warning border-warning/30",
    "bg-base-300 text-base-content border-base-300",
    "bg-amber-700/20 text-amber-700 border-amber-700/30",
  ];

  if (index < 3) {
    return (
      <span className={`badge badge-sm border ${badgeClasses[index]} font-bold gap-1 rounded-full`}>
        {medals[index]} #{index + 1}
      </span>
    );
  }

  return (
    <span className="badge badge-sm badge-ghost text-base-content/50 border border-base-300 font-semibold rounded-full">
      #{index + 1}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-base-100 border border-base-300 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
      <div className="skeleton w-16 h-16 rounded-full" />
      <div className="skeleton h-4 w-2/3 rounded-md" />
      <div className="skeleton h-3 w-1/2 rounded-md" />
      <div className="skeleton h-3 w-4/5 rounded-md" />
      <div className="skeleton h-6 w-1/3 rounded-full" />
    </div>
  );
}

function DecoratorCard({ decorator, index }) {
  const avatarStyle = AVATAR_STYLES[index % AVATAR_STYLES.length];
  const specialties = Array.isArray(decorator.specialties)
    ? decorator.specialties.slice(0, 2)
    : [];

  return (
    <div className="bg-base-100 border border-base-300 rounded-2xl p-6 flex flex-col items-center text-center relative hover:shadow-md hover:border-base-content/20 transition-all duration-200 group">
      <div className="absolute top-3 left-3">
        <RankBadge index={index} />
      </div>
      
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-3 ${avatarStyle}`}>
        {getInitials(decorator.name)}
      </div>
      
      <p className="text-base font-semibold text-base-content mb-1 leading-tight group-hover:text-primary transition-colors">
        {decorator.name || "Decorator"}
      </p>
      
      <p className="text-xs text-base-content/50 flex items-center gap-1 mb-2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        {decorator.location || "Bangladesh"}
      </p>
      
      <StarRating rating={decorator.rating} />
      
      {specialties.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 mb-3">
          {specialties.map((s) => (
            <span key={s} className="text-xs font-semibold px-2 py-0.5 bg-base-200 text-base-content/70 rounded-full border border-base-300">
              {s}
            </span>
          ))}
        </div>
      )}
      
      <p className="text-xs text-base-content/50 mt-auto">
        <span className="font-semibold text-base-content/85">{decorator.totalProjects ?? 0}</span> projects completed
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
          "https://style-decor-server-sepia.vercel.app/decorators/top?limit=6"
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
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-base-content/50">
          Our finest talent
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
          Top Decorators
        </h2>
        <p className="text-sm md:text-base text-base-content/60 max-w-xl mx-auto">
          Handpicked experts rated by clients across every style
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : error ? (
          <div className="text-center py-12 text-sm text-base-content/50 col-span-full">
            <span className="text-3xl block mb-2">📡</span>
            Could not load decorators. Please check your server connection.
          </div>
        ) : decorators.length === 0 ? (
          <div className="text-center py-12 text-sm text-base-content/50 col-span-full">
            <span className="text-3xl block mb-2">🔍</span>
            No decorators found.
          </div>
        ) : (
          decorators.map((d, i) => (
            <DecoratorCard key={d._id || i} decorator={d} index={i} />
          ))
        )}
      </div>

      <div className="text-center mt-10">
        <Link to="/decorators" className="btn btn-outline btn-primary px-8 rounded-xl">
          Browse all decorators →
        </Link>
      </div>
    </section>
  );
}