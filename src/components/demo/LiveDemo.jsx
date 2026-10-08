import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import useReveal from "../../hooks/UseReval";
import "./liveDemo.scss";

// Matn bo'laklari: oddiy satr yoki { wrong, right } (xato va to'g'ri varianti)
const PARTS = [
  "Bugun yangi loyiha bo'yicha ",
  { wrong: "yigilish", right: "yig'ilish" },
  " bo'ldi. Ba'zi masalalar ",
  { wrong: "xal", right: "hal" },
  " bo'lmadi, ",
  { wrong: "shuning ucun", right: "shuning uchun" },
  " ertaga yana ",
  { wrong: "utkazamiz", right: "o'tkazamiz" },
  ".",
];

const TOTAL = PARTS.filter((p) => typeof p !== "string").length;

const LiveDemo = () => {
  const [ref, visible] = useReveal(0.3);
  const [fixed, setFixed] = useState(0);
  const [running, setRunning] = useState(false);

  // Ko'ringach avtomatik boshlanadi
  useEffect(() => {
    if (!visible) return undefined;
    const t = setTimeout(() => setRunning(true), 900);
    return () => clearTimeout(t);
  }, [visible]);

  // Xatolarni birma-bir tuzatadi
  useEffect(() => {
    if (!running) return undefined;
    if (fixed >= TOTAL) {
      setRunning(false);
      return undefined;
    }
    const t = setTimeout(() => setFixed((f) => f + 1), 950);
    return () => clearTimeout(t);
  }, [running, fixed]);

  const replay = () => {
    setFixed(0);
    setRunning(true);
  };

  const renderParts = (mode) => {
    let k = 0;
    return PARTS.map((p, i) => {
      if (typeof p === "string") return <span key={i}>{p}</span>;
      const idx = k;
      k += 1;
      if (mode === "original") {
        return (
          <mark key={i} className="demo__mark demo__mark--err">
            {p.wrong}
          </mark>
        );
      }
      const done = idx < fixed;
      return (
        <mark
          key={`${i}-${done}`}
          className={`demo__mark demo__mark--${done ? "ok" : "err"}`}
        >
          {done ? p.right : p.wrong}
        </mark>
      );
    });
  };

  const finished = fixed >= TOTAL;

  return (
    <section
      ref={ref}
      id="demo"
      className={`demo ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <header className="demo__head">
          <span className="demo__badge">Jonli demo</span>
          <h2 className="demo__title">Xatolar ko'z oldingizda tuzatiladi</h2>
          <p className="demo__text">
            Matnni kiriting, TAHRIR imlo va grammatik xatolarni topib, bir zumda
            to'g'rilab beradi.
          </p>
        </header>

        <div className="demo__panels">
          <article className="demo__panel">
            <div className="demo__label">
              <i className="demo__dot demo__dot--err" />
              Asl matn
              <span className="demo__count">{TOTAL} ta xato</span>
            </div>
            <p className="demo__sample">{renderParts("original")}</p>
          </article>

          <article className="demo__panel demo__panel--result">
            <div className="demo__label">
              <i className="demo__dot demo__dot--ok" />
              TAHRIR natijasi
              <span className="demo__count">
                {fixed}/{TOTAL} tuzatildi
              </span>
            </div>
            <p className="demo__sample">{renderParts("result")}</p>
          </article>
        </div>

        <div className="demo__bar">
          <div className="demo__track" aria-hidden="true">
            <div
              className="demo__fill"
              style={{ width: `${(fixed / TOTAL) * 100}%` }}
            />
          </div>
          <p className="demo__status" aria-live="polite">
            {finished
              ? "Barcha xatolar tuzatildi ✓"
              : running
                ? "Tekshirilmoqda..."
                : "Boshlashga tayyor"}
          </p>
          <button
            type="button"
            className="demo__replay"
            onClick={replay}
            disabled={running}
          >
            <RotateCcw size={14} /> Qayta ko'rish
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
