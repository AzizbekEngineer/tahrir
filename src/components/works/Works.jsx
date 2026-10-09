import { Fragment } from "react";
import { ArrowRight, Check, Download, Pencil, Upload, Zap } from "lucide-react";
import useReveal from "../../hooks/UseReval";
import "./works.scss";

/* ---------- Kichik bezaklar ---------- */
const Spark = ({ className }) => (
  <svg
    className={`spark ${className || ""}`}
    viewBox="0 0 40 40"
    aria-hidden="true"
  >
    {[-35, 0, 35].map((a) => (
      <line
        key={a}
        x1="20"
        y1="14"
        x2="20"
        y2="4"
        transform={`rotate(${a} 20 34)`}
      />
    ))}
  </svg>
);

const Cursor = () => (
  <svg className="art__cursor" viewBox="0 0 32 36" aria-hidden="true">
    <path d="M3 2 L3 28 L10 22 L15 33 L21 30 L16 20 L26 20 Z" />
  </svg>
);

/* ---------- 1-qadam: yuklash ---------- */
const FILES = [
  {
    name: "PDF",
    letter: "P",
    color: "#e5484d",
    top: "6%",
    right: "20%",
    r: "-8deg",
    d: "0s",
  },
  {
    name: "DOCX",
    letter: "W",
    color: "#2b6cde",
    top: "27%",
    right: "2%",
    r: "-6deg",
    d: "0.6s",
  },
  {
    name: "XLSX",
    letter: "X",
    color: "#1f9d63",
    top: "49%",
    right: "0%",
    r: "5deg",
    d: "1.2s",
  },
  {
    name: "PPTX",
    letter: "P",
    color: "#f08a24",
    top: "71%",
    right: "16%",
    r: "-3deg",
    d: "1.8s",
  },
];

const UploadArt = () => (
  <div className="art art--upload">
    <span className="art__blob" />
    <Spark className="spark--up" />
    <div className="art__tile">
      <Upload size={54} strokeWidth={2.2} />
    </div>
    {FILES.map((f) => (
      <span
        key={f.name}
        className="chip"
        style={{ top: f.top, right: f.right, "--r": f.r, "--d": f.d }}
      >
        <i className="chip__ico" style={{ background: f.color }}>
          {f.letter}
        </i>
        {f.name}
      </span>
    ))}
  </div>
);

/* ---------- 2-qadam: amal tanlash ---------- */
const MENU = [
  { label: "Tekshir", icon: <Check size={14} strokeWidth={3} /> },
  { label: "Tuzat", icon: <Zap size={14} strokeWidth={2.6} /> },
  { label: "Qayta yoz", icon: <Pencil size={14} strokeWidth={2.6} /> },
  {
    label: "Tahlil qil",
    icon: (
      <span className="bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    ),
  },
];

const ActionArt = () => (
  <div className="art art--action">
    <span className="art__blob" />
    <div className="menu">
      <div className="menu__dots">
        <i />
        <i />
        <i />
      </div>
      <ul>
        {MENU.map((m) => (
          <li key={m.label} className="menu__item">
            <span className="menu__ico">{m.icon}</span>
            {m.label}
          </li>
        ))}
      </ul>
    </div>
    <Cursor />
    <Spark className="spark--click" />
  </div>
);

/* ---------- 3-qadam: natija ---------- */
const ResultArt = () => (
  <div className="art art--result">
    <span className="art__blob art__blob--green" />
    <div className="doc">
      <span className="doc__check">
        <Check size={20} strokeWidth={3.2} />
      </span>
      <i className="doc__line" />
      <i className="doc__line doc__line--md" />
      <i className="doc__line doc__line--sm" />
      <i className="doc__line doc__line--xs" />
    </div>
    <div className="dl">
      <Download size={30} strokeWidth={2.2} />
    </div>
    <Spark className="spark--res" />
  </div>
);

/* ---------- Qadamlar ---------- */
const STEPS = [
  {
    art: <UploadArt />,
    title: "Hujjatni yuklang",
    text: "PDF, DOCX, XLSX yoki PPTX faylni tashlang — yoki matnni shunchaki joylashtiring.",
  },
  {
    art: <ActionArt />,
    title: "Amalni tanlang",
    text: "Tekshirish, tuzatish, qayta yozish yoki tahlil qilish — bir bosishda.",
  },
  {
    art: <ResultArt />,
    title: "Natijani oling",
    text: "O'zgarishlarni ko'rib chiqing va tayyor hujjatni yuklab oling.",
  },
];

const Works = () => {
  const [ref, visible] = useReveal(0.25);

  return (
    <section
      ref={ref}
      id="how"
      className={`how ${visible ? "is-visible" : ""}`}
    >
      <div className="how__inner">
        <header className="how__head">
          <span className="how__badge-wrap">
            <Spark className="spark--badge" />
            <span className="how__badge">Qanday ishlaydi?</span>
          </span>

          <h2 className="how__title">
            Hujjatdan natijagacha —{" "}
            <span className="how__hl">
              uch qadamda.
              <Spark className="spark--title" />
              <svg
                className="how__underline"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path pathLength="1" d="M3 9 C 70 2, 190 2, 297 8" />
              </svg>
            </span>
          </h2>

          <p className="how__text">
            Murakkab sozlamalar yo'q. Faqat yuklang, tanlang va natijani oling.
          </p>
        </header>

        <ol className="how__steps">
          {STEPS.map(({ art, title, text }, i) => (
            <Fragment key={title}>
              <li className={`step step--${i + 1}`}>
                <span className="step__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="step__art">{art}</div>
                <h3 className="step__title">{title}</h3>
                <p className="step__text">{text}</p>
                <div className="step__progress" aria-hidden="true">
                  <i />
                </div>
              </li>
              {i < STEPS.length - 1 && (
                <li
                  className={`how__arrow how__arrow--${i + 1}`}
                  aria-hidden="true"
                >
                  <ArrowRight size={26} strokeWidth={1.6} />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Works;
