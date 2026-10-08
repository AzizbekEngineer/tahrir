import { ArrowRight } from "lucide-react";
import useReveal from "../../hooks/UseReval";
import "./banner.scss";

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
          <h2 className="cta__title">Matnlaringizni bugunoq yaxshilang</h2>
          <p className="cta__text">
            Ro'yxatdan o'ting va birinchi hujjatingizni bir necha soniyada
            tekshirib ko'ring. Karta talab qilinmaydi.
          </p>
          <button type="button" className="cta__btn">
            Bepul boshlash <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
