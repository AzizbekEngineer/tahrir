import { Send, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import "./footer.scss";

const LINKS = [
  {
    title: "Mahsulot",
    items: [
      { label: "Matn tekshirish", href: "#tekshir" },
      { label: "Hujjatlar bilan ishlash", href: "#hujjatlar" },
      { label: "AI qayta yozish", href: "#qayta-yozish" },
      { label: "Tahlil va xulosa", href: "#tahlil" },
    ],
  },
  {
    title: "Kompaniya",
    items: [
      { label: "Biz haqimizda", href: "#about" },
      { label: "Narxlar", href: "#pricing" },
      { label: "Blog", href: "#blog" },
      { label: "Aloqa", href: "#contact" },
    ],
  },
  {
    title: "Yordam",
    items: [
      { label: "Qanday ishlaydi?", href: "#how" },
      { label: "Ko'p so'raladigan savollar", href: "#faq" },
      { label: "Maxfiylik siyosati", href: "#privacy" },
      { label: "Foydalanish shartlari", href: "#terms" },
    ],
  },
];

const CONTACTS = [
  { icon: Mail, text: "info@tahrir.uz", href: "mailto:info@tahrir.uz" },
  { icon: Phone, text: "+998 90 123 45 67", href: "tel:+998901234567" },
  { icon: MapPin, text: "Toshkent, O'zbekiston" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <a
              href="/"
              className="footer__logo"
              aria-label="TAHRIR bosh sahifa"
            >
              TAHRIR<span>.</span>
            </a>
            <p className="footer__about">
              O'zbek tilidagi matnlar uchun ishonchli AI hamkor. Tekshiring,
              tuzating, qayta yozing va tahlil qiling.
            </p>

            <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="footer__form-label">
                Yangiliklardan xabardor bo'ling
              </label>
              <div className="footer__field">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email manzilingiz"
                  required
                />
                <button type="submit" aria-label="Obuna bo'lish">
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>

          <nav className="footer__nav" aria-label="Footer navigatsiya">
            {LINKS.map(({ title, items }) => (
              <div key={title} className="footer__col">
                <h3 className="footer__heading">{title}</h3>
                <ul>
                  {items.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer__col">
              <h3 className="footer__heading">Bog'lanish</h3>
              <ul className="footer__contacts">
                {CONTACTS.map(({ icon: Icon, text, href }) => (
                  <li key={text}>
                    <Icon size={16} />
                    {href ? <a href={href}>{text}</a> : <span>{text}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© {year} TAHRIR. Barcha huquqlar himoyalangan.</p>

          <div className="footer__bottom-right">
            <a
              href="https://t.me/tahrir_uz"
              className="footer__social"
              target="_blank"
              rel="noreferrer"
            >
              <Send size={14} /> Telegram
            </a>
            <button
              type="button"
              className="footer__top-btn"
              onClick={scrollTop}
              aria-label="Yuqoriga qaytish"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
