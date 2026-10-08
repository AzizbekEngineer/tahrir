import { GraduationCap, Newspaper, Briefcase, Languages } from "lucide-react";
import useReveal from "../../hooks/UseReval";
import "./audience.scss";

const AUDIENCE = [
  {
    icon: GraduationCap,
    title: "Talabalar",
    text: "Referat, kurs ishi va esselarni imlo xatosiz, ravon tilda topshiring.",
    tag: "Referat · Kurs ishi",
  },
  {
    icon: Newspaper,
    title: "Jurnalistlar",
    text: "Maqolalarni tez tahrir qiling, uslubni silliqlang va xatolarni oldindan toping.",
    tag: "Maqola · Press-reliz",
  },
  {
    icon: Briefcase,
    title: "Ofis xodimlari",
    text: "Rasmiy xat, hisobot va taqdimotlarni professional ko'rinishga keltiring.",
    tag: "Hisobot · Rasmiy xat",
  },
  {
    icon: Languages,
    title: "Mualliflar va tarjimonlar",
    text: "Tarjima va asl matnlarni ravonlashtiring, atamalarni tekshiring.",
    tag: "Tarjima · Kontent",
  },
];

const Audience = () => {
  const [ref, visible] = useReveal(0.2);

  return (
    <section
      ref={ref}
      id="audience"
      className={`audience ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <header className="audience__head">
          <span className="audience__badge">Kimlar uchun?</span>
          <h2 className="audience__title">
            Matn bilan ishlaydigan har kim uchun
          </h2>
          <p className="audience__text">
            Qaysi sohada bo'lishingizdan qat'i nazar, TAHRIR sizning ish
            jarayoningizga mos tushadi.
          </p>
        </header>

        <ul className="audience__grid">
          {AUDIENCE.map(({ icon: Icon, title, text, tag }) => (
            <li key={title} className="card">
              <div className="card__icon">
                <Icon size={24} />
              </div>
              <h3 className="card__title">{title}</h3>
              <p className="card__text">{text}</p>
              <span className="card__tag">{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Audience;
