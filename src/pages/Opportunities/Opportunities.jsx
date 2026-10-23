import GrammarEditor from "./GrammarEditor";
import "./opportunities.scss";

const ICONS = {
  shield:
    "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM8.5 12l2.5 2.5L16 9.5",
  pen: "M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19l-4 1zM14 7l3 3",
  doc: "M6 3h8l5 5v13H6V3zM14 3v5h5M9 13h7M9 17h7M9 9h2",
  chart: "M5 20V10M10 20V4M15 20V12M20 20V7",
  arrow: "M4 12h15M13 6l6 6-6 6",
  close: "M6 6l12 12M18 6L6 18",
  chevron: "M6 9l6 6 6-6",
  list: "M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01",
  link: "M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1",
};

function Icon({ name, size = 20, stroke = 1.7 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

const FILES = [
  { label: "PDF", letter: "A", color: "#e5322d" },
  { label: "DOCX", letter: "W", color: "#2b6cdf" },
  { label: "XLSX", letter: "X", color: "#1f9d55" },
  { label: "PPTX", letter: "P", color: "#ff5a1f" },
];

const STATS = [
  { label: "Grammatika", value: "3 ta taklif", tone: "red" },
  { label: "Ravshanlik", value: "2 ta taklif", tone: "yellow" },
  { label: "Ohang", value: "Yaxshi", tone: "green" },
  { label: "O'qilishi", value: "Yaxshi", tone: "green" },
];
//linklar bor
function Waves() {
  return (
    <svg
      className="op__waves"
      viewBox="0 0 1280 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="op-line" x1="0" x2="1">
          <stop offset="0" stopColor="#ff5a1f" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ff7a3c" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="op-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ff5a1f" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="150" rx="260" ry="120" fill="url(#op-glow)" />
      <ellipse cx="1150" cy="240" rx="320" ry="130" fill="url(#op-glow)" />
      <g fill="none" stroke="url(#op-line)" strokeWidth="2">
        <path d="M-20 230C180 160 300 70 520 40" />
        <path d="M-20 260C200 190 320 100 560 60" opacity="0.6" />
        <path d="M-20 200C150 140 260 40 470 20" opacity="0.5" />
        <path d="M1300 70C1150 90 1050 200 900 330" />
        <path d="M1300 120C1180 140 1090 240 960 340" opacity="0.6" />
        <path d="M1300 20C1130 40 1020 150 860 320" opacity="0.5" />
      </g>
    </svg>
  );
}

function GrammarCard() {
  return (
    <article className="op__card op__card--grammar">
      <header className="op__head">
        <span className="op__num">01</span>
        <span className="op__ico">
          <Icon name="shield" size={34} />
        </span>
        <div>
          <h3>Grammatika va ravshanlik</h3>
          <p>
            Imlo, grammatika va uslub xatolarini toping va tuzating. Matningizga
            mos, tabiiy takliflar oling.
          </p>
        </div>
      </header>

      <div className="op__editor-slot">
        <GrammarEditor />
      </div>
    </article>
  );
}

export default function Opportunities() {
  return (
    <div className="op">
      {/* ===== Hero ===== */}
      <section className="op__hero">
        <Waves />
        <p className="op__badge">
          <i /> YOZUVNI YAXSHILASH UCHUN HAMMASI BOR
        </p>
        <h1 className="op__title">
          Tuzatishdan ko'proq.
          <br />
          <span>To'liq</span> yozuv maydoni.
        </h1>
        <p className="op__lead">
          Matnni tekshiring, qayta yozing, tahlil qiling va hujjatlar bilan
          ishlang — hammasi bir joyda.
        </p>
        <a href="#" className="op__cta">
          Bepul sinab ko'ring <Icon name="arrow" size={18} />
        </a>
      </section>

      {/* ===== Imkoniyatlar ===== */}
      <section className="op__grid">
        <GrammarCard />

        <div className="op__right">
          <article className="op__card op__card--rewrite">
            <header className="op__head">
              <span className="op__num">02</span>
              <div>
                <h3>
                  <Icon name="pen" size={30} /> AI yordamida qayta yozish
                </h3>
                <p>
                  Matningizni turli maqsadlar uchun qayta yozing: soddaroq,
                  rasmiyroq, qisqaroq yoki batafsilroq — bir bosishda.
                </p>
              </div>
            </header>
            <div className="op__compare">
              <div className="op__box">
                <span className="op__tag">Asl matn</span>
                <p>
                  Loyiha biz uchun juda muhim edi va u bizga ko'p yangi
                  narsalarni o'rganishga yordam berdi.
                </p>
              </div>
              <span className="op__to">
                <Icon name="arrow" size={22} />
              </span>
              <div className="op__box op__box--good">
                <span className="op__tag op__tag--good">Yaxshilangan</span>
                <p>
                  Loyiha jamoamiz uchun muhim bosqich bo'ldi va qimmatli
                  bilimlar olishimizga yordam berdi.
                </p>
              </div>
            </div>
          </article>

          <div className="op__pair">
            <article className="op__card op__card--docs">
              <header className="op__head">
                <span className="op__num">03</span>
                <div>
                  <h3>
                    <span className="op__ico op__ico--sm">
                      <Icon name="doc" size={26} />
                    </span>
                    Hujjatlar bilan ishlash
                  </h3>
                  <p>
                    Hujjatlaringizni yuklang va ular bilan ishlang. AI yordamida
                    tahlil va takliflar oling.
                  </p>
                </div>
              </header>
              <ul className="op__files">
                {FILES.map((f) => (
                  <li key={f.label}>
                    <span className="op__file" style={{ "--c": f.color }}>
                      {f.letter}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </article>

            <article className="op__card op__card--stats">
              <header className="op__head">
                <span className="op__num">04</span>
                <div>
                  <h3>
                    <span className="op__ico op__ico--sm">
                      <Icon name="chart" size={26} stroke={2} />
                    </span>
                    Aqlli tahlil
                  </h3>
                  <p>Yozuvingiz tahlilini aniq tavsiyalar bilan oling.</p>
                </div>
              </header>
              <ul className="op__stats">
                {STATS.map((s) => (
                  <li key={s.label}>
                    <i className={`op__dot op__dot--${s.tone}`} />
                    <span>{s.label}</span>
                    <em>{s.value}</em>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
