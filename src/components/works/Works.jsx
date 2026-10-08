import { Upload, MousePointerClick, Download } from "lucide-react";
import useReveal from "../../hooks/UseReval";
import "./works.scss";

const STEPS = [
  {
    icon: Upload,
    title: "Hujjatni yuklang",
    text: "PDF, DOCX, XLSX yoki PPTX faylni tashlang yoki matnni to'g'ridan-to'g'ri joylashtiring.",
  },
  {
    icon: MousePointerClick,
    title: "Amalni tanlang",
    text: "Tekshirish, tuzatish, qayta yozish yoki tahlil qilish — kerakli rejimni bir bosishda tanlang.",
  },
  {
    icon: Download,
    title: "Natijani oling",
    text: "O'zgarishlarni ko'rib chiqing, kerakligini qabul qiling va tayyor hujjatni yuklab oling.",
  },
];

const Works = () => {
  const [ref, visible] = useReveal(0.25);

  return (
    <section
      ref={ref}
      id="how"
      className={`how ${visible ? "is-visible" : ""}`}
    >
      <div className="how__inner">
        <header className="how__head">
          <span className="how__badge">Qanday ishlaydi?</span>
          <h2 className="how__title">Uch qadamda tayyor matn</h2>
          <p className="how__text">
            Murakkab sozlamalar yo'q. Yuklang, tanlang va natijani oling.
          </p>
        </header>

        <ol className="how__steps">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="step">
              <div className="step__icon">
                <Icon size={28} />
                <span className="step__num">{i + 1}</span>
              </div>
              <h3 className="step__title">{title}</h3>
              <p className="step__text">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Works;
