import useReveal from "../../hooks/UseReval";
import "./audience.scss";

/* ---------- Umumiy bezaklar ---------- */
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

// SVG ichidagi nur chiziqlari
const S = ({ x, y, r }) => (
  <g className="il__spark" transform={`translate(${x} ${y}) rotate(${r})`}>
    {[-32, 0, 32].map((a) => (
      <line key={a} x1="0" y1="-9" x2="0" y2="-19" transform={`rotate(${a})`} />
    ))}
  </g>
);

const Defs = ({ id }) => (
  <defs>
    <filter id={`sh-${id}`} x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow
        dx="0"
        dy="8"
        stdDeviation="8"
        floodColor="#d9531e"
        floodOpacity="0.18"
      />
    </filter>
  </defs>
);

const Base = ({ id, children }) => (
  <svg
    viewBox="0 0 300 220"
    className="il"
    role="presentation"
    aria-hidden="true"
  >
    <Defs id={id} />
    <circle className="il__blob" cx="150" cy="118" r="92" />
    <ellipse className="il__floor" cx="150" cy="206" rx="100" ry="9" />
    <g className="il__float">{children}</g>
  </svg>
);

/* ---------- 1. Talabalar ---------- */
const StudentArt = () => (
  <Base id="s">
    <g filter="url(#sh-s)">
      <path
        className="il__cover il__cover--orange"
        d="M34 118 Q92 100 150 130 Q208 100 266 118 L266 190 Q208 172 150 202 Q92 172 34 190 Z"
      />
      <path
        className="il__paper"
        d="M44 112 Q98 98 150 126 L150 196 Q98 168 44 182 Z"
      />
      <path
        className="il__paper il__paper--warm"
        d="M150 126 Q202 98 256 112 L256 182 Q202 168 150 196 Z"
      />
    </g>
    {[0, 1, 2, 4].map((i) => (
      <path
        key={`l${i}`}
        className="il__ln"
        d={`M56 ${128 + i * 12} L136 ${138.5 + i * 12}`}
      />
    ))}
    <path className="il__ln il__ln--o" d="M56 164 L116 172" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={`r${i}`}
        className="il__ln"
        d={`M164 ${140 + i * 12} L244 ${129.5 + i * 12}`}
      />
    ))}
    {/* Magistr qalpoqchasi */}
    <g filter="url(#sh-s)">
      <path
        className="il__dark2"
        d="M170 70 L170 92 Q205 108 240 92 L240 70 L205 84 Z"
      />
      <path className="il__dark" d="M205 38 L268 60 L205 84 L142 60 Z" />
      <path
        className="il__ln il__ln--o"
        d="M205 61 L258 68 L258 100"
        style={{ strokeWidth: 3.5 }}
      />
      <rect
        className="il__orange"
        x="254"
        y="98"
        width="8"
        height="18"
        rx="3"
      />
    </g>
    {/* Eslatma kartasi */}
    <g transform="translate(250 166) rotate(6)" filter="url(#sh-s)">
      <rect
        className="il__paper"
        x="-36"
        y="-28"
        width="72"
        height="56"
        rx="10"
      />
      <circle className="il__orange" cx="-20" cy="-13" r="8" />
      <path className="il__check" d="M-24 -13 l3 3 l6 -7" />
      <path
        className="il__ln"
        d="M-6 -14 L26 -14 M-24 4 L26 4 M-24 16 L10 16"
      />
    </g>
    <S x={46} y={96} r={-35} />
    <S x={262} y={40} r={35} />
  </Base>
);

/* ---------- 2. Jurnalistlar ---------- */
const JournalistArt = () => (
  <Base id="j">
    <g filter="url(#sh-j)">
      <rect
        className="il__soft"
        x="96"
        y="46"
        width="130"
        height="150"
        rx="12"
        transform="rotate(4 160 120)"
      />
      <rect
        className="il__paper"
        x="88"
        y="38"
        width="134"
        height="154"
        rx="12"
        transform="rotate(-3 155 115)"
      />
    </g>
    <g transform="rotate(-3 155 115)">
      <text className="il__news" x="102" y="72">
        NEWS
      </text>
      <rect className="il__img" x="150" y="84" width="58" height="42" rx="7" />
      <path className="il__hill" d="M154 120 l16 -18 l12 12 l8 -8 l14 14 Z" />
      <path
        className="il__ln"
        d="M102 88 L140 88 M102 100 L140 100 M102 112 L140 112"
      />
      <path
        className="il__squiggle"
        d="M102 142 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0"
      />
      <path className="il__ln" d="M102 158 L200 158 M102 170 L176 170" />
      <path
        className="il__sign"
        d="M140 182 q-10 -14 2 -14 q10 0 -6 14 q14 6 24 -4"
      />
    </g>
    {/* Mikrofon */}
    <g transform="rotate(10 66 140)" filter="url(#sh-j)">
      <rect className="il__dark" x="48" y="98" width="36" height="56" rx="18" />
      <rect className="il__orange" x="48" y="118" width="36" height="6" />
      <path
        className="il__stand"
        d="M44 140 Q44 168 66 168 Q88 168 88 140 M66 168 L66 190"
      />
      <rect
        className="il__dark"
        x="46"
        y="188"
        width="40"
        height="9"
        rx="4.5"
      />
    </g>
    {/* Ruchka */}
    <g transform="translate(244 84) rotate(28)" filter="url(#sh-j)">
      <rect
        className="il__orange"
        x="-8"
        y="-50"
        width="16"
        height="84"
        rx="8"
      />
      <rect
        className="il__pen-hi"
        x="-3"
        y="-44"
        width="3"
        height="60"
        rx="1.5"
      />
      <path className="il__dark" d="M-8 34 L8 34 L0 54 Z" />
    </g>
    <S x={52} y={78} r={-40} />
    <S x={274} y={150} r={60} />
  </Base>
);

/* ---------- 3. Ofis xodimlari ---------- */
const OfficeArt = () => (
  <Base id="o">
    <g filter="url(#sh-o)">
      <rect
        className="il__soft"
        x="54"
        y="54"
        width="108"
        height="140"
        rx="12"
        transform="rotate(-8 108 124)"
      />
      <rect
        className="il__paper il__paper--warm"
        x="68"
        y="50"
        width="108"
        height="144"
        rx="12"
        transform="rotate(-4 122 122)"
      />
      <rect
        className="il__paper"
        x="96"
        y="34"
        width="144"
        height="160"
        rx="14"
      />
    </g>
    <path className="il__ln" d="M114 54 L200 54 M114 66 L172 66" />
    <rect className="il__bar" x="116" y="118" width="10" height="20" rx="2" />
    <rect className="il__bar" x="132" y="106" width="10" height="32" rx="2" />
    <rect
      className="il__bar il__bar--soft"
      x="148"
      y="92"
      width="10"
      height="46"
      rx="2"
    />
    <rect className="il__bar" x="164" y="102" width="10" height="36" rx="2" />
    <path
      className="il__ln"
      d="M112 148 L200 148 M112 160 L170 160 M112 172 L190 172"
    />
    <circle className="il__soft" cx="208" cy="98" r="15" />
    <path className="il__orange" d="M208 98 L208 83 A15 15 0 0 1 222 103 Z" />
    <g filter="url(#sh-o)">
      <circle className="il__orange" cx="232" cy="168" r="25" />
      <path className="il__check il__check--big" d="M220 168 l8 8 l15 -17" />
    </g>
    <S x={262} y={76} r={65} />
    <S x={44} y={56} r={-30} />
  </Base>
);

/* ---------- 4. Mualliflar va tarjimonlar ---------- */
const AuthorArt = () => (
  <Base id="a">
    <g filter="url(#sh-a)">
      <path
        className="il__cover il__cover--dark"
        d="M34 122 Q92 104 150 132 Q208 104 266 122 L266 192 Q208 174 150 204 Q92 174 34 192 Z"
      />
      <path
        className="il__paper"
        d="M44 114 Q98 100 150 128 L150 198 Q98 170 44 184 Z"
      />
      <path
        className="il__paper il__paper--warm"
        d="M150 128 Q202 100 256 114 L256 184 Q202 170 150 198 Z"
      />
    </g>
    {[0, 1, 2, 3].map((i) => (
      <path
        key={`l${i}`}
        className="il__ln"
        d={`M56 ${130 + i * 12} L136 ${140.5 + i * 12}`}
      />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <path
        key={`r${i}`}
        className="il__ln il__ln--o"
        d={`M164 ${142 + i * 12} L244 ${131.5 + i * 12}`}
        style={{ strokeWidth: i === 3 ? 4 : 6 }}
      />
    ))}
    {/* "文" plitkasi */}
    <g transform="translate(70 62) rotate(-8)" filter="url(#sh-a)">
      <rect
        className="il__paper"
        x="-26"
        y="-26"
        width="52"
        height="52"
        rx="12"
      />
      <text className="il__glyph" x="0" y="10" textAnchor="middle">
        文
      </text>
    </g>
    <path className="il__arrow" d="M170 74 Q150 48 120 72" />
    <path className="il__arrow" d="M120 72 l11 -1 M120 72 l3 -11" />
    {/* "A" plitkasi */}
    <g transform="translate(184 160) rotate(6)" filter="url(#sh-a)">
      <rect
        className="il__paper"
        x="-24"
        y="-24"
        width="48"
        height="48"
        rx="11"
      />
      <text
        className="il__glyph il__glyph--dark"
        x="0"
        y="11"
        textAnchor="middle"
      >
        A
      </text>
    </g>
    {/* Qalam */}
    <g transform="translate(250 112) rotate(28)" filter="url(#sh-a)">
      <rect
        className="il__dark"
        x="-10"
        y="-64"
        width="20"
        height="76"
        rx="10"
      />
      <rect className="il__orange" x="-10" y="-12" width="20" height="6" />
      <path className="il__nib" d="M-10 12 L10 12 L0 46 Z" />
    </g>
    <S x={262} y={44} r={35} />
    <S x={46} y={92} r={-40} />
  </Base>
);

const AUDIENCE = [
  {
    art: <StudentArt />,
    title: "Talabalar",
    text: "Referat, kurs ishi va esselarni imlo xatosiz, ravon tilda topshiring.",
    tag: "Referat · Kurs ishi",
  },
  {
    art: <JournalistArt />,
    title: "Jurnalistlar",
    text: "Maqolalarni tez tahrir qiling, uslubni silliqlang va xatolarni oldindan toping.",
    tag: "Maqola · Press-reliz",
  },
  {
    art: <OfficeArt />,
    title: "Ofis xodimlari",
    text: "Rasmiy xat, hisobot va taqdimotlarni professional ko'rinishga keltiring.",
    tag: "Hisobot · Rasmiy xat",
  },
  {
    art: <AuthorArt />,
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
          <span className="audience__badge-wrap">
            <Spark className="spark--badge" />
            <span className="audience__badge">Kimlar uchun?</span>
          </span>
          <h2 className="audience__title">
            Matn bilan ishlaydigan <em>har kim</em> uchun
            <Spark className="spark--title" />
          </h2>
          <p className="audience__text">
            Qaysi sohada bo'lishingizdan qat'i nazar, TAHRIR sizning ish
            jarayoningizga mos tushadi.
          </p>
        </header>

        <ul className="audience__grid">
          {AUDIENCE.map(({ art, title, text, tag }) => (
            <li key={title} className="card">
              <div className="card__art">{art}</div>
              <h3 className="card__title">{title}</h3>
              <p className="card__text">{text}</p>
              <span className="card__tag">{tag}</span>
              <div className="card__progress" aria-hidden="true">
                <i />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Audience;
