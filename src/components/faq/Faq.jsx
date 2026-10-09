import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import useReveal from "../../hooks/UseReval";
import "./faq.scss";

// DIQQAT: javoblarni mahsulotingizning haqiqiy imkoniyatlariga moslab tekshiring,
// ayniqsa maxfiylik va tillar haqidagi savollarni.
// "tag" ixtiyoriy: javob tepasida yashil belgi bo'lib chiqadi.
const QUESTIONS = [
  {
    q: "TAHRIR qaysi tilda ishlaydi?",
    tag: "O'zbek tili",
    a: "TAHRIR o'zbek tilidagi matnlar uchun yaratilgan. Imlo, grammatika va uslub tekshiruvi asosan o'zbek tiliga moslashtirilgan.",
  },
  {
    q: "Qaysi formatdagi hujjatlar bilan ishlay olaman?",
    a: "PDF, DOCX, XLSX va PPTX formatlari qo'llab-quvvatlanadi. Shuningdek, matnni to'g'ridan-to'g'ri kiritib ham tekshirishingiz mumkin.",
  },
  {
    q: "Hujjatlarim xavfsizmi?",
    a: "Hujjatlaringiz maxfiy hisoblanadi va faqat siz so'ragan amallarni bajarish uchun ishlatiladi. Batafsil ma'lumot uchun Maxfiylik siyosati bilan tanishing.",
  },
  {
    q: "Bepul tarif bormi?",
    a: "Ha. «Bepul boshlash» tugmasi orqali ro'yxatdan o'tib, asosiy imkoniyatlardan bepul foydalanishingiz mumkin. Ko'proq hajm va imkoniyatlar kerak bo'lsa, Pro tarifga o'tasiz.",
  },
  {
    q: "Telefondan foydalansa bo'ladimi?",
    a: "Ha, TAHRIR kompyuter, planshet va telefonda — brauzer orqali ishlaydi. Alohida dastur o'rnatish shart emas.",
  },
];

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

// "Yordam kerakmi?" kartasi uchun suhbat bulutchalari
const ChatArt = () => (
  <svg
    className="help__art"
    viewBox="0 0 130 120"
    role="presentation"
    aria-hidden="true"
  >
    <defs>
      <filter id="faq-shadow" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow
          dx="0"
          dy="8"
          stdDeviation="7"
          floodColor="#d9531e"
          floodOpacity="0.2"
        />
      </filter>
    </defs>
    <circle className="help__blob" cx="66" cy="62" r="50" />
    <g className="help__float">
      <g transform="rotate(-8 40 38)" filter="url(#faq-shadow)">
        <rect
          className="help__bubble help__bubble--back"
          x="12"
          y="14"
          width="62"
          height="48"
          rx="15"
        />
        <path
          className="help__bubble help__bubble--back"
          d="M24 58 l-6 16 l20 -12 Z"
        />
      </g>
      <g filter="url(#faq-shadow)">
        <rect
          className="help__bubble"
          x="40"
          y="42"
          width="72"
          height="50"
          rx="17"
        />
        <path className="help__bubble" d="M88 88 l12 16 l1 -18 Z" />
        <circle className="help__dot" cx="62" cy="67" r="5" />
        <circle className="help__dot" cx="77" cy="67" r="5" />
        <circle className="help__dot help__dot--lt" cx="92" cy="67" r="5" />
      </g>
    </g>
    <g className="help__spark" transform="translate(98 22) rotate(25)">
      {[-32, 0, 32].map((a) => (
        <line
          key={a}
          x1="0"
          y1="-8"
          x2="0"
          y2="-18"
          transform={`rotate(${a})`}
        />
      ))}
    </g>
    <g className="help__spark" transform="translate(14 96) rotate(-125)">
      {[-32, 0, 32].map((a) => (
        <line
          key={a}
          x1="0"
          y1="-8"
          x2="0"
          y2="-18"
          transform={`rotate(${a})`}
        />
      ))}
    </g>
  </svg>
);

const Faq = () => {
  const [ref, visible] = useReveal(0.15);
  const [open, setOpen] = useState(0);

  return (
    <section
      ref={ref}
      id="faq"
      className={`faq ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <div className="faq__layout">
          {/* ===== Chap ustun ===== */}
          <div className="faq__side">
            <header className="faq__head">
              <span className="faq__badge-wrap">
                <Spark className="spark--badge" />
                <span className="faq__badge">FAQ</span>
              </span>
              <h2 className="faq__title">
                <span>Ko'p</span>
                <span>so'raladigan</span>
                <em>savollar</em>
              </h2>
              <p className="faq__text">
                Javob topa olmadingizmi? Bizga yozing — yordam beramiz.
              </p>
            </header>

            <aside className="help">
              <ChatArt />
              <div className="help__body">
                <h3 className="help__title">Yordam kerakmi?</h3>
                <p className="help__text">
                  Savollaringiz bormi? Biz doim yordam berishga tayyormiz.
                </p>
                <a href="#contact" className="help__btn">
                  Bizga yozing <ArrowRight size={18} />
                </a>
              </div>
            </aside>
          </div>

          {/* ===== O'ng ustun: akkordeon ===== */}
          <div className="faq__main">
            <Spark className="spark--list" />
            <ul className="faq__list">
              {QUESTIONS.map(({ q, a, tag }, i) => {
                const isOpen = open === i;
                return (
                  <li key={q} className={`item ${isOpen ? "is-open" : ""}`}>
                    <h3 className="item__heading">
                      <button
                        type="button"
                        className="item__btn"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-btn-${i}`}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                      >
                        <span>{q}</span>
                        <span className="item__chev">
                          <ChevronDown size={20} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="item__panel"
                    >
                      <div className="item__panel-inner">
                        <div className="item__content">
                          {tag && (
                            <span className="item__tag">
                              <i />
                              {tag}
                            </span>
                          )}
                          <p>{a}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
