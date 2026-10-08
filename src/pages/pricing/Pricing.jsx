import { useState } from "react";
import {
  Sparkles,
  Check,
  ShieldCheck,
  RefreshCw,
  Headphones,
} from "lucide-react";
import "./pricing.scss";

const PLANS = [
  {
    name: "Free",
    desc: "Boshlash uchun",
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

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const price = (m) => (yearly ? Math.round(m * (1 - YEARLY_DISCOUNT)) : m);

  return (
    <section className="pricing">
      <span className="pricing__badge">
        <Sparkles size={14} /> Siz uchun mos imkoniyatlar
      </span>
      <h1 className="pricing__title">Sizga mos rejani tanlang</h1>
      <p className="pricing__subtitle">
        Har kim uchun qulay va mos imkoniyatlar.
      </p>

      <div className="toggle">
        <button
          className={`toggle__btn ${!yearly ? "toggle__btn--active" : ""}`}
          onClick={() => setYearly(false)}
        >
          Oylik
        </button>
        <button
          className={`toggle__btn ${yearly ? "toggle__btn--active" : ""}`}
          onClick={() => setYearly(true)}
        >
          Yillik
        </button>
        <span className="toggle__save">20% tejash</span>
      </div>

      <div className="plans">
        {PLANS.map((p) => (
          <article
            key={p.name}
            className={`plan ${p.popular ? "plan--popular" : ""}`}
          >
            {p.popular && <span className="plan__tag">Eng mashhur</span>}
            <h2 className="plan__name">{p.name}</h2>
            <p className="plan__desc">{p.desc}</p>
            <div className="plan__price">
              ${price(p.monthly)} <span>/ oy</span>
            </div>
            <ul className="plan__list">
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={14} />
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
            <Icon size={20} />
            {title}
            <small>{text}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
