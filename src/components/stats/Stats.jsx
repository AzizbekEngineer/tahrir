import { useEffect, useState } from "react";
import useReveal from "../../hooks/UseReval";
import "./stats.scss";

// DIQQAT: bu raqamlar namuna. Haqiqiy ko'rsatkichlaringiz bilan almashtiring
// yoki ishonchli ma'lumot bo'lmasa, shu bo'limni olib tashlang.
const STATS = [
  { value: 10000, suffix: "+", label: "Tekshirilgan hujjat" },
  { value: 4, suffix: "", label: "Qo'llab-quvvatlanadigan format" },
  { value: 99, suffix: "%", label: "Aniqlik darajasi" },
  { value: 24, suffix: "/7", label: "Har qanday qurilmada" },
];

const formatNumber = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const CountUp = ({ value, run, duration = 1600 }) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return undefined;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setN(value);
      return undefined;
    }

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value, duration]);

  return <>{formatNumber(n)}</>;
};

const Stats = () => {
  const [ref, visible] = useReveal(0.35);

  return (
    <section
      ref={ref}
      id="stats"
      className={`stats ${visible ? "is-visible" : ""}`}
    >
      <ul className="stats__grid">
        {STATS.map(({ value, suffix, label }) => (
          <li key={label} className="stat">
            <strong className="stat__value">
              <CountUp value={value} run={visible} />
              {suffix}
            </strong>
            <span className="stat__label">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Stats;
