import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Menu, Phone, Send, X } from "lucide-react";

// Birinchi ekran darrov yuklanadi (LCP uchun), qolganlari kerak bo'lganda.
import "./leazy.scss";

/* ============================================================
   Bo'limlar: har biri alohida chunk (React.lazy) bo'lib yuklanadi.
   Yo'llarni o'z loyihangiz tuzilishiga moslang.
   ============================================================ */


const NAV = [
  { id: "demo", label: "Demo" },
  { id: "how", label: "Qanday ishlaydi" },
  { id: "audience", label: "Kimlar uchun" },
  { id: "faq", label: "FAQ" },
];

/* ---------- Yuklanayotgan paytdagi skelet ---------- */
const Skeleton = ({ minHeight }) => (
  <div
    className="skeleton"
    style={{ minHeight }}
    aria-busy="true"
    aria-label="Yuklanmoqda"
  >
    <span className="skeleton__bar skeleton__bar--sm" />
    <span className="skeleton__bar skeleton__bar--lg" />
    <span className="skeleton__bar skeleton__bar--md" />
    <div className="skeleton__grid">
      <span className="skeleton__box" />
      <span className="skeleton__box" />
      <span className="skeleton__box" />
    </div>
  </div>
);

/* ---------- Chunk yuklanmasa (internet uzilsa) ---------- */
class Boundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="lazy__error">
          <p>Bo'limni yuklab bo'lmadi.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Qayta yuklash
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ---------- Ekranga yaqinlashganda yuklaydi ---------- */
const LazySection = ({ id, minHeight }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const Section = LAZY[id];

  useEffect(() => {
    if (show) return undefined;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [show]);

  return (
    <div
      ref={ref}
      id={`sec-${id}`}
      className="lazy"
      style={show ? undefined : { minHeight }}
    >
      {show && (
        <Boundary>
          <Suspense fallback={<Skeleton minHeight={minHeight} />}>
            <Section />
          </Suspense>
        </Boundary>
      )}
    </div>
  );
};

/* ---------- Logo ---------- */
const Logo = () => (
  <a href="#top" className="logo" aria-label="TAHRIR — bosh sahifa">
    <span className="logo__mark">T</span>
    <span className="logo__text">TAHRIR</span>
  </a>
);

/* ============================================================
   Sahifa
   ============================================================ */
const Leazy = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    document.title = "TAHRIR — o'zbek tilidagi matnlar uchun AI muharrir";
  }, []);

  // Bo'limlarni bo'sh vaqtda oldindan yuklab qo'yadi (havolaga bosganda kutmaslik uchun)
  

  // Menyuda joriy bo'limni belgilash (scroll-spy)
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace("sec-", ""));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(`sec-${id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="landing" id="top">
      <a className="landing__skip" href="#main">
        Asosiy mazmunga o'tish
      </a>
    </div>
  );
};

export default Leazy;
