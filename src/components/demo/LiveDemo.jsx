import { useEffect, useState } from "react";
import { ArrowRight, Check, RotateCw } from "lucide-react";
import useReveal from "../../hooks/UseReval";
import "./liveDemo.scss";

// Matn bo'laklari: oddiy satr yoki { wrong, right } (xato va to'g'ri varianti)
const EXAMPLES = [
  [
    "Bugun yangi loyiha bo'yicha ",
    { wrong: "yigilish", right: "yig'ilish" },
    " bo'ldi. Ba'zi masalalar ",
    { wrong: "xal", right: "hal" },
    " bo'lmadi, ",
    { wrong: "shuning ucun", right: "shuning uchun" },
    " ertaga yana ",
    { wrong: "utkazamiz", right: "o'tkazamiz" },
    ".",
  ],
  [
    "Men kecha ",
    { wrong: "kutubhonaga", right: "kutubxonaga" },
    " bordim. U yerda juda ",
    { wrong: "kup", right: "ko'p" },
    " qiziqarli kitoblar bor ekan, lekin hammasini o'qib ",
    { wrong: "bulmaydi", right: "bo'lmaydi" },
    ".",
  ],
  [
    "Biz hujjatni tekshirdik. ",
    { wrong: "Xar", right: "Har" },
    " bir bet toza chiqdi, shuning uchun mijoz juda ",
    { wrong: "hursand", right: "xursand" },
    " ",
    { wrong: "buldi", right: "bo'ldi" },
    ".",
  ],
];

const countErrors = (parts) =>
  parts.filter((p) => typeof p !== "string").length;

const Spark = ({ className }) => (
  <svg
    className={`demo__spark ${className || ""}`}
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

const Key = ({ children }) => (
  <kbd className="demo__key">
    <span>⌘</span>
    <span>{children}</span>
  </kbd>
);

const LiveDemo = () => {
  const [ref, visible] = useReveal(0.3);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [fixed, setFixed] = useState(0);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const parts = EXAMPLES[exampleIdx];
  const total = countErrors(parts);

  // Ko'ringach avtomatik boshlanadi
  useEffect(() => {
    if (!visible) return undefined;
    const t = setTimeout(() => setRunning(true), 900);
    return () => clearTimeout(t);
  }, [visible]);

  // Xatolarni birma-bir tuzatadi
  useEffect(() => {
    if (!running) return undefined;
    if (fixed >= total) {
      setRunning(false);
      return undefined;
    }
    const t = setTimeout(() => setFixed((f) => f + 1), 950);
    return () => clearTimeout(t);
  }, [running, fixed, total]);

  // Keyingi misolga o'tadi
  const nextExample = () => {
    setExampleIdx((i) => (i + 1) % EXAMPLES.length);
    setFixed(0);
    setCopied(false);
    setRunning(true);
  };

  // Matn va belgilar soni
  let k = 0;
  const originalText = parts
    .map((p) => (typeof p === "string" ? p : p.wrong))
    .join("");
  const resultText = parts
    .map((p) => {
      if (typeof p === "string") return p;
      const done = k < fixed;
      k += 1;
      return done ? p.right : p.wrong;
    })
    .join("");

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard mavjud emas */
    }
  };

  const renderParts = (mode) => {
    let idxCounter = 0;
    return parts.map((p, i) => {
      if (typeof p === "string") return <span key={i}>{p}</span>;
      const idx = idxCounter;
      idxCounter += 1;
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

  const finished = fixed >= total;

  return (
    <section
      ref={ref}
      id="demo"
      className={`demo ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <header className="demo__head">
          <span className="demo__badge-wrap">
            <Spark className="demo__spark--badge" />
            <span className="demo__badge">Jonli demo</span>
          </span>

          <h2 className="demo__title">
            Har bir tuzatishni ko'ring —{" "}
            <span className="demo__hl">
              bir zumda.
              <Spark className="demo__spark--title" />
              <svg
                className="demo__underline"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path pathLength="1" d="M3 9 C 70 2, 190 2, 297 8" />
              </svg>
            </span>
          </h2>

          <p className="demo__text">
            Matningizni kiriting. TAHRIR uni aniqroq, ravonroq va xatosiz qiladi
            &mdash; bir necha soniyada.
          </p>
        </header>

        <div className="demo__panels">
          <article className="demo__panel">
            <div className="demo__label">
              <span className="demo__icon demo__icon--err">
                <i className="demo__dot demo__dot--err" />
              </span>
              <span className="demo__name">Asl matn</span>
              <span className="demo__pill demo__pill--err">
                {total} ta xato topildi
              </span>
            </div>
            <div className="demo__body">
              <p className="demo__sample">{renderParts("original")}</p>
              <div className="demo__foot">
                <Key>V</Key>
                <span className="demo__hint">O'z matningizni kiriting</span>
                <span className="demo__chars">
                  {originalText.length} ta belgi
                </span>
              </div>
            </div>
          </article>

          <div className="demo__arrow" aria-hidden="true">
            <ArrowRight size={26} strokeWidth={1.5} />
          </div>

          <article className="demo__panel demo__panel--result">
            <div className="demo__label">
              <span className="demo__icon demo__icon--ok">
                <i className="demo__dot demo__dot--ok" />
              </span>
              <span className="demo__name">TAHRIR natijasi</span>
              <span className="demo__pill demo__pill--ok">
                {finished && <Check size={14} strokeWidth={2.5} />}
                {fixed}/{total} tuzatildi
              </span>
            </div>
            <div className="demo__body">
              <p className="demo__sample">{renderParts("result")}</p>
              <div className="demo__foot">
                <button
                  type="button"
                  className="demo__copy"
                  onClick={copyResult}
                >
                  <Key>C</Key>
                  <span className="demo__hint">
                    {copied ? "Nusxalandi ✓" : "Natijani nusxalash"}
                  </span>
                </button>
                <span className="demo__chars">
                  {resultText.length} ta belgi
                </span>
              </div>
            </div>
          </article>
        </div>

        <div className="demo__bar">
          <div className="demo__track" aria-hidden="true">
            <div
              className="demo__mask"
              style={{ "--p": total ? fixed / total : 0 }}
            />
          </div>

          <p
            className={`demo__status ${finished ? "is-done" : ""}`}
            aria-live="polite"
          >
            {finished ? (
              <>
                <span className="demo__check">
                  <Check size={14} strokeWidth={3} />
                </span>
                Barcha {total} ta xato hal qilindi
              </>
            ) : running ? (
              "Tekshirilmoqda..."
            ) : (
              "Boshlashga tayyor"
            )}
          </p>

          <button
            type="button"
            className="demo__replay"
            onClick={nextExample}
            disabled={running}
          >
            <RotateCw size={16} /> Boshqa misol
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
