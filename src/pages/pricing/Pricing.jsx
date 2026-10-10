import { useState } from "react";
import {
  Sparkles,
  Check,
  ShieldCheck,
  RefreshCw,
  Headphones,
  FileText,
  Crown,
  Users,
} from "lucide-react";
import "./pricing.scss";

const PLANS = [
  {
    name: "Free",
    desc: "Boshlash uchun",
    icon: FileText,
    monthly: 0,
    cta: "Boshlash",
    features: [
      "5 ta hujjat / oy",
      "Asosiy tekshirish",
      "AI tavsiyalar",
      "PDF / DOCX yuklash",
    ],
  },
  {
    name: "Plus",
    desc: "Kundalik ish uchun",
    icon: FileText,
    monthly: 9,
    cta: "Tanlash",
    primary: true,
    features: [
      "200 ta hujjat / oy",
      "Barcha AI imkoniyatlari",
      "Hujjat bilan chat",
      "Eksport va shablonlar",
    ],
  },
  {
    name: "Pro",
    desc: "Ko'proq imkoniyatlar",
    icon: Crown,
    monthly: 19,
    cta: "Tanlash",
    primary: true,
    popular: true,
    features: [
      "1 000 ta hujjat / oy",
      "Kengaytirilgan AI",
      "XLSX tahlili",
      "Ustuvor qo'llab-quvvatlash",
    ],
  },
  {
    name: "Team",
    desc: "Jamoangiz uchun",
    icon: Users,
    monthly: 49,
    cta: "Biz bilan bog'lanish",
    features: [
      "5 ta foydalanuvchi",
      "B2B funksiyalar",
      "Admin panel",
      "Maxsus integratsiya",
    ],
  },
];

const PERKS = [
  {
    icon: ShieldCheck,
    title: "Xavfsiz to'lov",
    text: "Ma'lumotlaringiz himoyalangan",
  },
  {
    icon: RefreshCw,
    title: "Istalgan vaqtda bekor qilish",
    text: "Qiyinchiliksiz boshqaruv",
  },
  {
    icon: Headphones,
    title: "24/7 qo'llab-quvvatlash",
    text: "Biz siz bilan birgamiz",
  },
];

const YEARLY_DISCOUNT = 0.2;

// Kichik "uchqun" chiziqlari (bezak)
const Spark = ({ className }) => (
  <svg
    className={`spark ${className}`}
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 12 L10 8" />
    <path d="M14 6 L14 1" />
    <path d="M20 12 L26 8" />
  </svg>
);

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const price = (m) => (yearly ? Math.round(m * (1 - YEARLY_DISCOUNT)) : m);

  return (
    <section className="pricing">
      <div className="pricing__head">
        <Spark className="spark--badge" />
        <span className="pricing__badge">
          <Sparkles size={14} /> Siz uchun mos imkoniyatlar
        </span>

        <h1 className="pricing__title">
          Sizga{" "}
          <span className="pricing__accent">
            mos rejani
            <svg
              className="pricing__underline"
              viewBox="0 0 300 14"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 9 C60 2, 140 14, 298 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          tanlang
        </h1>
        <p className="pricing__subtitle">
          Har kim uchun qulay va mos imkoniyatlar.
        </p>

        <div className="toggle" role="group" aria-label="To'lov davri">
          <button
            className={`toggle__btn ${!yearly ? "toggle__btn--active" : ""}`}
            onClick={() => setYearly(false)}
            aria-pressed={!yearly}
          >
            Oylik
          </button>
          <button
            className={`toggle__btn ${yearly ? "toggle__btn--active" : ""}`}
            onClick={() => setYearly(true)}
            aria-pressed={yearly}
          >
            Yillik
          </button>
          <span className="toggle__save">20% tejash</span>
        </div>
      </div>

      <div className="plans">
        {PLANS.map(({ icon: Icon, ...p }) => (
          <article
            key={p.name}
            className={`plan ${p.popular ? "plan--popular" : ""}`}
          >
            {p.popular && <span className="plan__tag">Eng mashhur</span>}

            <span className="plan__dash" aria-hidden="true" />
            <span className="plan__icon" aria-hidden="true">
              <Icon size={26} />
            </span>

            <h2 className="plan__name">{p.name}</h2>
            <p className="plan__desc">{p.desc}</p>

            <div className="plan__price">
              ${price(p.monthly)} <span>/ oy</span>
            </div>

            <ul className="plan__list">
              {p.features.map((f) => (
                <li key={f}>
                  <span className="plan__check">
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <button className={`btn ${p.primary ? "btn--primary" : ""}`}>
              {p.cta}
            </button>
          </article>
        ))}
      </div>

      <div className="perks">
        {PERKS.map(({ icon: Icon, title, text }) => (
          <div className="perks__item" key={title}>
            <span className="perks__icon">
              <Icon size={22} />
            </span>
            <div className="perks__text">
              <strong>{title}</strong>
              <small>{text}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
