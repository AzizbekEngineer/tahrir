import {
  ArrowRight,
  Play,
  ShieldCheck,
  FileText,
  PenLine,
  Sparkles,
} from "lucide-react";
import "./hero.scss";

/* ---------- Qog'ozlar ---------- */
const PAPERS = [
  {
    id: "check",
    label: "Tekshir",
    accent: "squiggle",
    x: 205,
    y: 112,
    r: -10,
    w: 140,
    h: 165,
    d: 0.5,
    t: 5,
  },
  {
    id: "fix",
    label: "Tuzat",
    accent: "green",
    x: 415,
    y: 122,
    r: 6,
    w: 130,
    h: 150,
    d: 0.65,
    t: 5.6,
  },
  {
    id: "rewrite",
    label: "Qayta yoz",
    accent: "peach",
    x: 140,
    y: 305,
    r: -14,
    w: 150,
    h: 170,
    d: 1.05,
    t: 6.2,
  },
  {
    id: "analyze",
    label: "Tahlil qil",
    accent: "chart",
    x: 425,
    y: 350,
    r: 12,
    w: 150,
    h: 165,
    d: 1.2,
    t: 5.3,
  },
];

const SPARKS = [
  { x: 92, y: 62, r: -55 },
  { x: 300, y: 56, r: 20 },
  { x: 480, y: 60, r: 38 },
  { x: 470, y: 250, r: 60 },
  { x: 500, y: 330, r: 35 },
  { x: 372, y: 212, r: 28 },
];

const Accent = ({ type, left, inner }) => {
  switch (type) {
    case "squiggle":
      return (
        <path
          className="art__squiggle"
          transform={`translate(${left + 50} 22)`}
          d="M0 0 q5 -9 10 0 t10 0 t10 0 t10 0"
        />
      );
    case "green":
      return (
        <g transform="translate(0 16)">
          <rect
            className="art__pill art__pill--green-soft"
            x={left + 10}
            y="-8"
            width={inner - 10}
            height="18"
            rx="9"
          />
          <rect
            className="art__pill art__pill--green"
            x={left + 18}
            y="-3"
            width={inner - 26}
            height="8"
            rx="4"
          />
        </g>
      );
    case "peach":
      return (
        <g transform="translate(0 16)">
          <rect
            className="art__pill art__pill--peach-soft"
            x={left + 10}
            y="-8"
            width={inner - 10}
            height="18"
            rx="9"
          />
          <rect
            className="art__pill art__pill--peach"
            x={left + 18}
            y="-3"
            width={inner - 26}
            height="8"
            rx="4"
          />
        </g>
      );
    case "chart":
      return (
        <g transform="translate(0 12)">
          <rect
            className="art__bar"
            x={left}
            y="14"
            width="8"
            height="18"
            rx="3"
          />
          <rect
            className="art__bar"
            x={left + 14}
            y="4"
            width="8"
            height="28"
            rx="3"
          />
          <rect
            className="art__bar art__bar--soft"
            x={left + 28}
            y="-8"
            width="8"
            height="40"
            rx="3"
          />
          <rect
            className="art__line"
            x={left + 46}
            y="4"
            width={inner - 46}
            height="6"
            rx="3"
          />
          <rect
            className="art__line"
            x={left + 46}
            y="18"
            width={(inner - 46) * 0.7}
            height="6"
            rx="3"
          />
        </g>
      );
    default:
      return null;
  }
};

const Paper = ({ label, accent, x, y, r, w, h, d, t }) => {
  const left = -w / 2 + 16;
  const inner = w - 32;
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${r})`}
      filter="url(#paper-shadow)"
    >
      <g className="art__float" style={{ "--d": `${d}s`, "--t": `${t}s` }}>
        <rect
          className="art__paper"
          x={-w / 2}
          y={-h / 2}
          width={w}
          height={h}
          rx="12"
        />
        <rect
          className="art__line"
          x={left}
          y={-h / 2 + 18}
          width={inner}
          height="6"
          rx="3"
        />
        <rect
          className="art__line"
          x={left}
          y={-h / 2 + 32}
          width={inner * 0.62}
          height="6"
          rx="3"
        />
        <text className="art__label" x={left} y="-4">
          {label}
        </text>
        <Accent type={accent} left={left} inner={inner} />
        {accent !== "chart" && (
          <>
            <rect
              className="art__line"
              x={left}
              y={h / 2 - 40}
              width={inner}
              height="6"
              rx="3"
            />
            <rect
              className="art__line"
              x={left}
              y={h / 2 - 26}
              width={inner * 0.7}
              height="6"
              rx="3"
            />
          </>
        )}
      </g>
    </g>
  );
};

const Spark = ({ x, y, r }) => (
  <g className="art__spark" transform={`translate(${x} ${y}) rotate(${r})`}>
    {[-32, 0, 32].map((a) => (
      <line
        key={a}
        x1="0"
        y1="-10"
        x2="0"
        y2="-21"
        transform={`rotate(${a})`}
      />
    ))}
  </g>
);

/* ---------- Markaziy "brauzer" oynasi ---------- */
const Browser = () => (
  <g transform="translate(290 242) rotate(-3)" filter="url(#paper-shadow)">
    <g className="art__float" style={{ "--d": "0.8s", "--t": "6.6s" }}>
      <rect
        className="art__paper"
        x="-135"
        y="-88"
        width="270"
        height="176"
        rx="16"
      />
      <path
        className="art__bar-top"
        d="M-135 -60 V-72 a16 16 0 0 1 16 -16 H119 a16 16 0 0 1 16 16 V-60 Z"
      />
      <circle cx="-114" cy="-74" r="4.5" fill="#ff6b5a" />
      <circle cx="-100" cy="-74" r="4.5" fill="#ffc233" />
      <circle cx="-86" cy="-74" r="4.5" fill="#2fd07a" />
      <rect
        className="art__line"
        x="-112"
        y="-44"
        width="200"
        height="8"
        rx="4"
      />
      <rect
        className="art__line"
        x="-112"
        y="-28"
        width="150"
        height="8"
        rx="4"
      />
      <rect
        className="art__line"
        x="-112"
        y="-12"
        width="120"
        height="8"
        rx="4"
      />
      <rect
        className="art__pill art__pill--green"
        x="-20"
        y="2"
        width="110"
        height="12"
        rx="6"
      />
      <rect
        className="art__pill art__pill--green-light"
        x="-50"
        y="22"
        width="110"
        height="12"
        rx="6"
      />
      <rect
        className="art__line"
        x="-112"
        y="46"
        width="170"
        height="8"
        rx="4"
      />
      <rect
        className="art__line"
        x="-112"
        y="62"
        width="130"
        height="8"
        rx="4"
      />
      <path
        className="art__cursor"
        transform="translate(92 14) rotate(-12)"
        d="M0 0 L0 26 L8 19 L14 31 L20 28 L14 17 L24 17 Z"
      />
      <g className="art__spark" transform="translate(112 4) rotate(20)">
        {[-32, 0, 32].map((a) => (
          <line
            key={a}
            x1="0"
            y1="-10"
            x2="0"
            y2="-20"
            transform={`rotate(${a})`}
          />
        ))}
      </g>
    </g>
  </g>
);

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Matn tekshirish",
    text: "Imlo va grammatikani tuzating",
  },
  {
    icon: FileText,
    title: "Hujjatlar bilan ishlash",
    text: "PDF, DOCX, XLSX, PPTX",
  },
  {
    icon: PenLine,
    title: "AI qayta yozish",
    text: "Fikringizni ravon ifodalang",
  },
  {
    icon: Sparkles,
    title: "Tahlil va xulosa",
    text: "Muhim ma'lumotlarni toping",
  },
];

const Hero = () => (
  <section className="hero">
    <div className="hero__inner container">
      <div className="hero__content">
        <span className="hero__badge">AI Document Intelligence</span>

        <h1 className="hero__title">
          Matnlaringiz bilan ishlashning <em>aqlli</em>{" "}
          <span className="hero__hl">
            usuli.
            <svg
              className="hero__underline"
              viewBox="0 0 300 14"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path pathLength="1" d="M3 9 C 70 2, 190 2, 297 8" />
            </svg>
          </span>
        </h1>

        <p className="hero__text">
          O'zbek tilida. Har qanday hujjat. Har qanday qurilma. TAHRIR
          vaqtingizni tejaydi, matn sifatini oshiradi va ishonch bilan ishlashga
          yordam beradi.
        </p>

        <div className="hero__cta">
          <button type="button" className="hero__btn hero__btn--primary">
            Bepul boshlash <ArrowRight size={18} />
          </button>
          <button type="button" className="hero__btn hero__btn--light">
            <Play size={14} /> Qanday ishlaydi?
          </button>
        </div>
      </div>

      <div className="hero__art" aria-hidden="true">
        <svg viewBox="0 0 520 460" role="presentation">
          <defs>
            <filter
              id="paper-shadow"
              x="-25%"
              y="-25%"
              width="150%"
              height="160%"
            >
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="11"
                floodColor="#d9531e"
                floodOpacity="0.16"
              />
            </filter>
          </defs>

          <circle className="art__blob" cx="290" cy="240" r="185" />
          <ellipse className="art__floor" cx="290" cy="428" rx="130" ry="14" />

          {/* Halqa: orqa yarmi */}
          <g transform="rotate(-12 290 250)">
            <path className="art__ring" d="M70 250 A220 82 0 0 1 510 250" />
          </g>

          <Paper {...PAPERS[0]} />
          <Paper {...PAPERS[1]} />
          <Browser />

          {/* Halqa: old yarmi */}
          <g transform="rotate(-12 290 250)">
            <path className="art__ring" d="M70 250 A220 82 0 0 0 510 250" />
          </g>

          <Paper {...PAPERS[2]} />
          <Paper {...PAPERS[3]} />

          {SPARKS.map((s, i) => (
            <Spark key={i} {...s} />
          ))}
        </svg>
      </div>
    </div>

    <ul className="hero__features container">
      {FEATURES.map(({ icon: Icon, title, text }) => (
        <li key={title} className="feature">
          <Icon size={28} strokeWidth={1.6} />
          <div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default Hero;
