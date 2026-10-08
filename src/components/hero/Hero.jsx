import {
  ArrowRight,
  Play,
  ShieldCheck,
  FileText,
  PenLine,
  Sparkles,
} from "lucide-react";
import "./hero.scss";

const PAPERS = [
  { id: "check", label: "Tekshir", x: 165, y: 95, r: -10, w: 140, h: 165 },
  { id: "fix", label: "Tuzat", x: 280, y: 178, r: 8, w: 130, h: 160 },
  { id: "rewrite", label: "Qayta yoz", x: 135, y: 255, r: -14, w: 150, h: 180 },
  {
    id: "analyze",
    label: "Tahlil qil",
    x: 320,
    y: 326,
    r: -10,
    w: 150,
    h: 170,
  },
];

const Paper = ({ label, x, y, r, w, h }) => {
  const left = -w / 2 + 16;
  const inner = w - 32;
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${r})`}
      filter="url(#paper-shadow)"
    >
      <rect
        className="art__paper"
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx="10"
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
      <text className="art__label" x="0" y="6" textAnchor="middle">
        {label}
      </text>
      <rect
        className="art__line"
        x={left}
        y={h / 2 - 54}
        width={inner}
        height="6"
        rx="3"
      />
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
        width={inner * 0.55}
        height="6"
        rx="3"
      />
    </g>
  );
};

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
        <h1 className="hero__title">Matnlaringiz uchun ishonchli hamkor.</h1>
        <p className="hero__text">
          O'zbek tilida. Har qanday hujjat. Har qanday qurilma. TAHRIR sizning
          vaqtingizni tejaydi, matn sifatini oshiradi va yangi imkoniyatlar
          yaratadi.
        </p>
        <div className="hero__cta">
          <button type="button" className="hero__btn hero__btn--primary">
            Bepul boshlash <ArrowRight size={16} />
          </button>
          <button type="button" className="hero__btn hero__btn--light">
            <Play size={12} /> Qanday ishlaydi?
          </button>
        </div>
      </div>

      <div className="hero__art" aria-hidden="true">
        <svg viewBox="0 0 460 440" role="presentation">
          <defs>
            <filter
              id="paper-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="150%"
            >
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="9"
                floodColor="#171b19"
                floodOpacity="0.12"
              />
            </filter>
          </defs>
          <circle className="art__blob" cx="240" cy="240" r="165" />
          <ellipse className="art__floor" cx="225" cy="402" rx="125" ry="14" />
          <ellipse
            className="art__ring"
            cx="228"
            cy="218"
            rx="182"
            ry="56"
            transform="rotate(-8 228 218)"
          />
          {PAPERS.map((p) => (
            <Paper key={p.id} {...p} />
          ))}
          <path
            className="art__swoosh"
            d="M25 312 C 110 362, 270 362, 350 285 C 412 226, 402 150, 340 98"
          />
        </svg>
      </div>
    </div>

    <ul className="hero__features container">
      {FEATURES.map(({ icon: Icon, title, text }) => (
        <li key={title} className="feature">
          <Icon size={26} />
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
