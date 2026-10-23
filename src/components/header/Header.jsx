import { useEffect, useRef, useState } from "react";
import logo from "../../assets/icons/logo.png";

import "./header.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MENU } from "../../constants/menu";
import i18n from "../../utils/i18n";

const LANGUAGES = ["UZ", "RU", "EN"];

const GlobeIcon = () => (
  <svg
    className="lang__globe"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    className="lang__chevron"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Header = () => {
  const [lang, setLang] = useState("UZ");
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sahifa o'zgarganda mobil menyuni yopish
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setLangOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLangOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const chooseLang = (code) => {
    setLang(code);
    setLangOpen(false);
    try {
      if (i18n && typeof i18n.changeLanguage === "function") {
        i18n.changeLanguage(code.toLowerCase());
      }
    } catch {
      /* i18n xatoligi bo'lsa ham davom etadi */
    }
  };

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner container">
        <Link to="/" className="header__logo" aria-label="TAHRIR bosh sahifasi">
          <img src={logo} alt="Tahrir" />
        </Link>

        <nav className="header__nav" aria-label="Asosiy menyu">
          {MENU.map((link, i) => (
            <NavLink
              key={link.id}
              to={link.path}
              end={link.path === "/"}
              style={{ "--i": i }}
              className={({ isActive }) =>
                `header__link ${isActive ? "header__link--active" : ""}`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <div className={`lang ${langOpen ? "lang--open" : ""}`} ref={langRef}>
            <button
              type="button"
              className="lang__toggle"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((open) => !open)}
            >
              <GlobeIcon />
              <span>{lang}</span>
              <ChevronIcon />
            </button>

            <ul className="lang__menu" role="listbox" aria-hidden={!langOpen}>
              {LANGUAGES.map((code) => (
                <li key={code}>
                  <button
                    type="button"
                    role="option"
                    tabIndex={langOpen ? 0 : -1}
                    aria-selected={code === lang}
                    className={`lang__option ${code === lang ? "lang__option--active" : ""}`}
                    onClick={() => chooseLang(code)}
                  >
                    {code}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <NavLink to="/login" className="btn btn--light">
            Kirish
          </NavLink>
          <NavLink to="/register" className="btn btn--primary">
            Ro'yxatdan o'tish
          </NavLink>

          {/* Mobil ekranlar uchun burger tugmasi */}
          <button
            type="button"
            className={`header__burger ${mobileOpen ? "header__burger--open" : ""}`}
            aria-label="Menyu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobil menyu dropdown/drawer */}
      <div
        className={`header__mobile ${mobileOpen ? "header__mobile--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="header__mobile-nav" aria-label="Mobil menyu">
          {MENU.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `header__mobile-link ${isActive ? "header__mobile-link--active" : ""}`
              }
              onClick={() => setMobileOpen(false)}
            >
              {link.title}
            </NavLink>
          ))}
          <div className="header__mobile-actions">
            <NavLink
              to="/login"
              className="btn btn--light"
              onClick={() => setMobileOpen(false)}
            >
              Kirish
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn--primary"
              onClick={() => setMobileOpen(false)}
            >
              Ro'yxatdan o'tish
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
