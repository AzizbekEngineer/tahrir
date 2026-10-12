import { useMemo, useState } from "react";
import "./help.scss";

const TOPICS = [
  { id: "start", label: "Boshlash", icon: "book" },
  { id: "tools", label: "Yozuv vositalari", icon: "pen" },
  { id: "docs", label: "Hujjatlar va yuklash", icon: "doc" },
  { id: "billing", label: "Tariflar va to'lov", icon: "card" },
  { id: "account", label: "Hisob va maxfiylik", icon: "user" },
];

const TABS = [
  { id: "popular", label: "Ommabop savollar" },
  { id: "guides", label: "Sozlash qo'llanmalari" },
  { id: "trouble", label: "Muammolarni hal qilish" },
];

const FAQS = {
  popular: [
    {
      id: "p1",
      q: "Tahrir qaysi tillarni qo'llab-quvvatlaydi?",
      a: "Tahrir o'zbek tilida aniqroq yozishga yordam beradi: imlo, grammatika va uslub bo'yicha tavsiyalar beradi.",
    },
    {
      id: "p2",
      q: "Hujjatni qanday yuklayman?",
      a: "«Hujjat yuklash» tugmasini bosing va .docx yoki .txt faylni tanlang. Fayl yuklangach, matn avtomatik tekshiriladi.",
    },
    {
      id: "p3",
      q: "Tahrirni bepul sinab ko'rsam bo'ladimi?",
      a: "Ha. Ro'yxatdan o'tgach, bepul tarifda asosiy imlo va grammatika tekshiruvidan foydalanishingiz mumkin.",
    },
    {
      id: "p4",
      q: "Obunamni qanday boshqaraman?",
      a: "Hisob sozlamalarida «Tariflar va to'lov» bo'limiga o'ting. U yerda tarifni almashtirish yoki obunani bekor qilish mumkin.",
    },
    {
      id: "p5",
      q: "Yozganlarim maxfiy va xavfsizmi?",
      a: "Ha. Matnlaringiz shifrlangan holda saqlanadi va uchinchi shaxslarga berilmaydi. Istalgan vaqtda ularni o'chirib tashlashingiz mumkin.",
    },
  ],
  guides: [
    {
      id: "g1",
      q: "Brauzer kengaytmasini qanday o'rnataman?",
      a: "Brauzeringizning kengaytmalar do'konidan Tahrir'ni qidiring, «O'rnatish» tugmasini bosing va hisobingizga kiring.",
    },
    {
      id: "g2",
      q: "Tahrirni Word bilan qanday ishlataman?",
      a: "Hujjatingizni .docx formatida yuklang. Tuzatilgan matnni xuddi shu formatda qayta yuklab olishingiz mumkin.",
    },
  ],
  trouble: [
    {
      id: "t1",
      q: "Hujjat yuklanmayapti, nima qilish kerak?",
      a: "Fayl hajmi va formatini tekshiring. Muammo davom etsa, sahifani yangilab qayta urinib ko'ring yoki yordam xizmatiga yozing.",
    },
    {
      id: "t2",
      q: "Hisobimga kira olmayapman.",
      a: "Kirish sahifasidagi «Parolni unutdingizmi?» havolasidan foydalaning. Xat kelmasa, «Spam» papkasini ham tekshiring.",
    },
  ],
};

const ICONS = {
  book: "M3 5.5C5.5 4 8.5 4 11 5.5V19c-2.5-1.5-5.5-1.5-8 0V5.5zM21 5.5C18.5 4 15.5 4 13 5.5V19c2.5-1.5 5.5-1.5 8 0V5.5z",
  pen: "M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19l-4 1zM14 7l3 3",
  doc: "M6 3h8l5 5v13H6V3zM14 3v5h5M9 13h7M9 17h7M9 9h2",
  card: "M3 6h18v12H3V6zM3 10h18M7 15h3",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.5-6 8-6s8 2 8 6",
  chat: "M4 5h16v11H11l-4 4v-4H4V5z",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4",
  chevron: "M9 6l6 6-6 6",
  arrow: "M5 19L19 5M9 5h10v10",
  arrowRight: "M4 12h15M13 6l6 6-6 6",
};

function Icon({ name, size = 22 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

// Hero fondagi yorug' orbitalar
function Orbits() {
  return (
    <svg
      className="hp__orbits"
      viewBox="0 0 1280 230"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="1230" cy="230" r="230" fill="url(#hp-glow)" />
      <circle cx="40" cy="170" r="190" fill="url(#hp-glow)" opacity="0.5" />
      <g fill="none" stroke="#ff5a1f" strokeLinecap="round">
        <circle cx="1230" cy="250" r="190" strokeWidth="2" opacity="0.9" />
        <circle cx="1100" cy="190" r="150" strokeWidth="1" opacity="0.6" />
        <ellipse
          cx="1090"
          cy="140"
          rx="110"
          ry="60"
          strokeWidth="1"
          opacity="0.7"
        />
        <circle cx="30" cy="190" r="200" strokeWidth="2" opacity="0.7" />
        <circle cx="30" cy="190" r="150" strokeWidth="1" opacity="0.4" />
      </g>
      <g fill="#ff5a1f">
        <circle cx="1030" cy="54" r="7" />
        <circle cx="990" cy="152" r="4" />
        <circle cx="1222" cy="160" r="7" />
      </g>
    </svg>
  );
}

export default function Help() {
  const [topic, setTopic] = useState("start");
  const [tab, setTab] = useState("popular");
  const [openId, setOpenId] = useState("p1");
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS[tab];
    return Object.values(FAQS)
      .flat()
      .filter(
        (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
      );
  }, [tab, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(input);
  };

  const handleTab = (id) => {
    setTab(id);
    setQuery("");
    setInput("");
    setOpenId(FAQS[id][0].id);
  };

  return (
    <div className="hp">
      {/* ===== Hero ===== */}
      <section className="hp__hero">
        <Orbits />
        <p className="hp__eyebrow">TAHRIR YORDAM</p>
        <h1 className="hp__title">Sizga qanday yordam bera olamiz?</h1>

        <form className="hp__search" onSubmit={handleSearch} role="search">
          <Icon name="search" />
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Yordam maqolalari va javoblarni qidiring..."
            aria-label="Yordam bo'yicha qidiruv"
          />
          <button type="submit">Qidirish</button>
        </form>
      </section>

      {/* ===== Asosiy qism ===== */}
      <div className="hp__body">
        <aside className="hp__aside">
          <nav className="hp__topics" aria-label="Mavzular">
            <h2 className="hp__topics-title">Mavzularni ko'rish</h2>
            <ul>
              {TOPICS.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={`hp__topic${topic === t.id ? " is-active" : ""}`}
                    onClick={() => setTopic(t.id)}
                  >
                    <Icon name={t.icon} />
                    <span>{t.label}</span>
                    <Icon name="chevron" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hp__contact">
            <span className="hp__contact-icon">
              <Icon name="chat" size={30} />
            </span>
            <h3>Yordam kerakmi?</h3>
            <p>Jamoamiz yordam berishga tayyor.</p>
            <a href="#" className="hp__btn">
              Yordamga murojaat <Icon name="arrow" size={16} />
            </a>
          </div>
        </aside>

        <section className="hp__faq">
          <h2 className="hp__faq-title">Ko'p so'raladigan savollar</h2>
          <p className="hp__faq-sub">
            Tahrirdan maksimal foydalanish uchun tezkor javoblar.
          </p>

          <div className="hp__tabs" role="tablist">
            {TABS.map((t) => {
              const active = tab === t.id && !query;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`hp__tab${active ? " is-active" : ""}`}
                  onClick={() => handleTab(t.id)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="hp__list">
            {items.length === 0 && (
              <p className="hp__empty">
                «{query}» bo'yicha hech narsa topilmadi. Boshqa so'z bilan
                qidirib ko'ring.
              </p>
            )}

            {items.map((f) => {
              const open = openId === f.id;
              return (
                <div key={f.id} className={`hp__item${open ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="hp__q"
                    aria-expanded={open}
                    aria-controls={`hp-ans-${f.id}`}
                    onClick={() => setOpenId(open ? null : f.id)}
                  >
                    <span>{f.q}</span>
                    <i className="hp__toggle" aria-hidden="true" />
                  </button>
                  <div id={`hp-ans-${f.id}`} className="hp__a">
                    <div className="hp__a-inner">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <a href="#" className="hp__all">
            Barcha yordam maqolalarini ko'rish{" "}
            <Icon name="arrowRight" size={16} />
          </a>
        </section>
      </div>
    </div>
  );
}
