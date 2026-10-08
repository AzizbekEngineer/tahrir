import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/icons/logo.png";

import "./header.scss";
import { NavLink } from "react-router-dom";
import { MENU } from "../../constants/menu";

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
  const [active, setActive] = useState("home");
  const [lang, setLang] = useState("UZ");
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setLangOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setLangOpen(false);
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
  };

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner container">
        <a href="/" className="header__logo">
          <img src={logo} alt="Tahrir" />
        </a>

        <nav className="header__nav" aria-label="Asosiy menyu">
          {MENU.map((link, i) => (
            <a
              key={link.id}
              href={link.path}
              style={{ "--i": i }}
              className={`header__link ${active === link.id ? "header__link--active" : ""}`}
              onClick={() => setActive(link.id)}
            >
              {link.title}
            </a>
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

          <NavLink to={"/login"} type="button" className="btn btn--light">
            Kirish
          </NavLink>
          <NavLink to={"/register"} type="button" className="btn btn--primary">
            Ro'yxatdan o'tish
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
