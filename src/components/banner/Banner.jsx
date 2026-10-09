import {
  ArrowRight,
  Check,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import useReveal from "../../hooks/UseReval";
import "./banner.scss";

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

// O'ng tomondagi "muharrir oynasi" namunasi
const Mock = () => (
  <div className="cta__visual" aria-hidden="true">
    <div className="mock">
      <div className="mock__top">
        <span className="mock__dots">
          <i />
          <i />
          <i />
        </span>
        <div className="mock__tools">
          <span className="mock__check">
            <ShieldCheck size={16} />
            Imlo tekshiruvi
          </span>
          <span className="mock__fmt">
            <FileText size={16} />
            <b>B</b>
            <em>I</em>
            <u>U</u>
            <span>···</span>
          </span>
        </div>
      </div>

      <div className="mock__body">
        <i className="ln ln--w70" />
        <i className="ln ln--w100" />
        <div className="mock__row">
          <i className="ln ln--sm" />
          <mark className="mock__err">mijozlarimizga</mark>
          <i className="ln ln--grow" />
        </div>
        <i className="ln ln--w85" />
        <i className="ln ln--w60" />
        <i className="ln ln--w75" />
        <i className="ln ln--w50" />

        <svg className="mock__arrow" viewBox="0 0 100 70">
          <path pathLength="1" d="M8 6 C 12 44, 44 60, 84 54" />
          <path className="mock__arrow-head" d="M72 42 L88 54 L70 64" />
        </svg>
      </div>

      <div className="mock__fix">
        <span className="fix__tag">
          <span className="fix__tick">
            <Check size={12} strokeWidth={3.5} />
          </span>
          Tuzatildi
        </span>
        <span className="fix__ok">mijozlarimiz uchun</span>
        <i className="ln ln--w100" />
        <i className="ln ln--w60" />
      </div>
    </div>
    <Spark className="spark--mock" />
  </div>
);

const CtaBanner = () => {
  const [ref, visible] = useReveal(0.3);

  return (
    <section
      ref={ref}
      id="cta"
      className={`cta ${visible ? "is-visible" : ""}`}
    >
      <div className="cta__card">
        <span className="cta__orb cta__orb--1" aria-hidden="true" />
        <span className="cta__orb cta__orb--2" aria-hidden="true" />
        <span className="cta__orb cta__orb--3" aria-hidden="true" />

        <div className="cta__content">
          <span className="cta__badge">
            <Sparkles size={16} />
            TAHRIR bilan boshlang
          </span>

          <h2 className="cta__title">
            <span>Matnlaringizni</span>
            <span className="cta__hl">
              bugunoq
              <svg
                className="cta__underline"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path pathLength="1" d="M3 9 C 70 2, 190 2, 297 8" />
              </svg>
            </span>
            <span>yaxshilang</span>
          </h2>

          <p className="cta__text">
            Ro'yxatdan o'ting va birinchi hujjatingizni bir necha soniyada
            tekshirib ko'ring.
          </p>

          <p className="cta__note">
            <ShieldCheck size={22} strokeWidth={1.6} />
            Karta talab qilinmaydi.
          </p>

          <button type="button" className="cta__btn">
            Bepul boshlash <ArrowRight size={18} />
          </button>
        </div>

        <Mock />
      </div>
    </section>
  );
};

export default CtaBanner;
