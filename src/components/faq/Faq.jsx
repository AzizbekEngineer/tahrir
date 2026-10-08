import { useState } from "react";
import { ChevronDown } from "lucide-react";
import useReveal from "../../hooks/UseReval";
import "./faq.scss";

// DIQQAT: javoblarni mahsulotingizning haqiqiy imkoniyatlariga moslab tekshiring,
// ayniqsa maxfiylik va tillar haqidagi savollarni.
const QUESTIONS = [
  {
    q: "TAHRIR qaysi tilda ishlaydi?",
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
        <header className="faq__head">
          <span className="faq__badge">FAQ</span>
          <h2 className="faq__title">Ko'p so'raladigan savollar</h2>
          <p className="faq__text">
            Javob topa olmadingizmi? Bizga yozing — yordam beramiz.
          </p>
        </header>

        <ul className="faq__list">
          {QUESTIONS.map(({ q, a }, i) => {
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
                    <ChevronDown size={20} />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className="item__panel"
                >
                  <div className="item__panel-inner">
                    <p>{a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
