import { useCallback, useEffect, useRef, useState } from "react";
import "./GrammarEditor.scss";

/* =====================================================================
   1) TEKSHIRUV QOIDALARI
   Bu yerda oddiy (brauzerning o'zida ishlaydigan) tekshiruv bor.
   Haqiqiy server/API ulamoqchi bo'lsangiz, <GrammarEditor checkText={...} />
   ga o'z funksiyangizni bering:
     async (text) => [{ start, end, suggestion, message, type }]
   start/end — matndagi belgi o'rinlari (text.slice(start, end) almashtiriladi).
   ===================================================================== */

// To'liq so'z bo'yicha tuzatishlar
const EXACT = {
  kop: "ko'p",
  kopincha: "ko'pincha",
  koproq: "ko'proq",
  kopchilik: "ko'pchilik",
  bolsa: "bo'lsa",
  boladi: "bo'ladi",
  bolmaydi: "bo'lmaydi",
  bolgan: "bo'lgan",
  boldi: "bo'ldi",
  bolib: "bo'lib",
  bolish: "bo'lish",
  qoshish: "qo'shish",
  organish: "o'rganish",
  organadi: "o'rganadi",
  organaman: "o'rganaman",
};

// So'z boshi bo'yicha tuzatishlar (qo'shimchalar bilan ham ishlaydi)
const STEMS = [
  ["korsat", "ko'rsat"],
  ["korin", "ko'rin"],
  ["ozbek", "o'zbek"],
  ["ozgar", "o'zgar"],
  ["goya", "g'oya"],
  ["gozal", "go'zal"],
  ["togri", "to'g'ri"],
  ["malumot", "ma'lumot"],
  ["qollab", "qo'llab"],
  ["qollan", "qo'llan"],
  ["tolov", "to'lov"],
  ["toliq", "to'liq"],
  ["olchov", "o'lchov"],
  ["oquvchi", "o'quvchi"],
  ["oqituvchi", "o'qituvchi"],
  ["qoshimcha", "qo'shimcha"],
  ["bolim", "bo'lim"],
  ["kopayt", "ko'payt"],
  ["talim", "ta'lim"],
];

function matchCase(src, out) {
  if (src.length > 1 && src === src.toUpperCase()) return out.toUpperCase();
  if (src[0] !== src[0].toLowerCase())
    return out[0].toUpperCase() + out.slice(1);
  return out;
}

function fixWord(word) {
  const lower = word.toLowerCase();
  if (EXACT[lower]) return matchCase(word, EXACT[lower]);
  for (const [wrong, right] of STEMS) {
    if (lower.startsWith(wrong))
      return matchCase(word, right + lower.slice(wrong.length));
  }
  return null;
}

const WORD = "[\\p{L}'’ʻ‘]";
const WS = "[ \\t\\u00A0]"; // oddiy bo'shliq, tab va qattiq bo'shliq (nbsp)

export function checkUzbek(text) {
  const found = [];

  // 1) Imlo: tutuq belgisi tushib qolgan so'zlar
  for (const m of text.matchAll(new RegExp(`${WORD}+`, "gu"))) {
    const fixed = fixWord(m[0]);
    if (fixed && fixed !== m[0]) {
      found.push({
        start: m.index,
        end: m.index + m[0].length,
        suggestion: fixed,
        message: `To'g'ri yozilishi: «${fixed}». Tutuq belgisi (') qo'yiladi.`,
        type: "spelling",
      });
    }
  }

  // 2) Takrorlangan so'z
  for (const m of text.matchAll(
    new RegExp(`(^|[^\\p{L}'’ʻ‘])(${WORD}+)${WS}+\\2(?!${WORD})`, "giu"),
  )) {
    const start = m.index + m[1].length;
    found.push({
      start,
      end: m.index + m[0].length,
      suggestion: m[2],
      message: "So'z ketma-ket ikki marta yozilgan.",
      type: "style",
    });
  }

  // 3) Ortiqcha bo'shliq
  for (const m of text.matchAll(new RegExp(`${WS}{2,}`, "g"))) {
    found.push({
      start: m.index,
      end: m.index + m[0].length,
      suggestion: " ",
      message: "Ortiqcha bo'shliq bor.",
      type: "style",
    });
  }

  // 4) Tinish belgisidan oldin bo'shliq
  for (const m of text.matchAll(new RegExp(`${WS}+([.,!?;:])`, "g"))) {
    found.push({
      start: m.index,
      end: m.index + m[0].length,
      suggestion: m[1],
      message: "Tinish belgisidan oldin bo'shliq qo'yilmaydi.",
      type: "punct",
    });
  }

  // 5) Gap bosh harf bilan boshlanishi
  for (const m of text.matchAll(
    new RegExp(`(^|[.!?]["»”)]?${WS}+|\\n${WS}*)(\\p{Ll}${WORD}*)`, "gu"),
  )) {
    const start = m.index + m[1].length;
    found.push({
      start,
      end: start + m[2].length,
      suggestion: m[2][0].toUpperCase() + m[2].slice(1),
      message: "Gap bosh harf bilan boshlanadi.",
      type: "style",
    });
  }

  return found;
}

const TYPE_LABEL = {
  spelling: "Imlo",
  punct: "Tinish belgilari",
  style: "Uslub",
};

/* =====================================================================
   2) DOM YORDAMCHILARI (matn <-> Range moslashtirish)
   ===================================================================== */

const BLOCKS = new Set([
  "P",
  "DIV",
  "LI",
  "H1",
  "H2",
  "H3",
  "BLOCKQUOTE",
  "UL",
  "OL",
]);

function blockOf(node, root) {
  let n = node.parentNode;
  while (n && n !== root) {
    if (BLOCKS.has(n.nodeName)) return n;
    n = n.parentNode;
  }
  return root;
}

// Muharrirdagi barcha matn tugunlarini bitta satrga yig'adi
function collect(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const segs = [];
  let text = "";
  let prev = null;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const block = blockOf(node, root);
    if (prev && block !== prev) text += "\n";
    segs.push({ node, start: text.length });
    text += node.nodeValue;
    prev = block;
  }
  return { text, segs };
}

function pointAt(segs, pos, isEnd) {
  for (const s of segs) {
    const len = s.node.nodeValue.length;
    const hit = isEnd
      ? pos > s.start && pos <= s.start + len
      : pos >= s.start && pos < s.start + len;
    if (hit) return [s.node, pos - s.start];
  }
  return null;
}

function rangeFor(segs, start, end) {
  const a = pointAt(segs, start, false);
  const b = pointAt(segs, end, true);
  if (!a || !b) return null;
  const r = document.createRange();
  r.setStart(a[0], a[1]);
  r.setEnd(b[0], b[1]);
  return r;
}

const HIGHLIGHT = "ge-spell";
const canHighlight =
  typeof CSS !== "undefined" &&
  "highlights" in CSS &&
  typeof Highlight !== "undefined";

const escapeHtml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* =====================================================================
   3) IKONKALAR
   ===================================================================== */

const ICONS = {
  shield:
    "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM8.5 12l2.5 2.5L16 9.5",
  arrow: "M4 12h15M13 6l6 6-6 6",
  close: "M6 6l12 12M18 6L6 18",
  chevron: "M6 9l6 6 6-6",
  ul: "M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01",
  ol: "M10 7h10M10 12h10M10 17h10M4 5.5l1.5-1V9M4 13.5c0-1.2 2-1.2 2 0 0 1-2 1.6-2 3h2",
  link: "M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1",
  check: "M5 12.5l4.5 4.5L19 7.5",
};

function Icon({ name, size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

/* =====================================================================
   4) KOMPONENT
   ===================================================================== */

const preventFocusLoss = (e) => e.preventDefault();

function Btn({ cmd, on, label, onRun, children }) {
  return (
    <button
      type="button"
      className={`ge__btn${on ? " is-on" : ""}`}
      aria-pressed={!!on}
      aria-label={label}
      title={label}
      onMouseDown={preventFocusLoss}
      onClick={() => onRun(cmd)}
    >
      {children}
    </button>
  );
}

export default function GrammarEditor({
  initialHtml = "Bizning kompaniya butun dunyo mijozlariga professional xizmat korsatadi.",
  checkText = async (t) => checkUzbek(t),
  onChange,
}) {
  const wrapRef = useRef(null);
  const fieldRef = useRef(null);
  const popupRef = useRef(null);
  const savedRange = useRef(null);
  const version = useRef(0);
  const timer = useRef(null);
  const ignored = useRef(new Set());

  const [issues, setIssues] = useState([]);
  const [popup, setPopup] = useState(null); // { issue, left, top }
  const [active, setActive] = useState({});
  const [block, setBlock] = useState("p");
  const [empty, setEmpty] = useState(false);
  const [stats, setStats] = useState({ words: 0, chars: 0 });

  /* ---------- Tekshiruvni ishga tushirish ---------- */
  const runCheck = useCallback(async () => {
    const el = fieldRef.current;
    if (!el) return;
    const { text, segs } = collect(el);
    const v = ++version.current;

    let found = [];
    try {
      found = (await checkText(text)) || [];
    } catch {
      found = [];
    }
    if (v !== version.current) return; // eskirgan natija

    found.sort((a, b) => a.start - b.start);
    const list = [];
    let lastEnd = -1;
    for (const f of found) {
      if (f.start < lastEnd) continue; // ustma-ust tushganlarini o'tkazib yuboramiz
      const word = text.slice(f.start, f.end);
      if (ignored.current.has(word)) continue;
      const range = rangeFor(segs, f.start, f.end);
      if (!range) continue;
      list.push({ ...f, word, range });
      lastEnd = f.end;
    }

    if (canHighlight)
      CSS.highlights.set(HIGHLIGHT, new Highlight(...list.map((i) => i.range)));
    setIssues(list);
    setStats({
      words: (text.match(/[\p{L}\p{N}'’ʻ‘-]+/gu) || []).length,
      chars: text.replace(/\n/g, "").length,
    });
  }, [checkText]);

  const schedule = useCallback(() => {
    version.current++; // yo'ldagi eski natijalarni bekor qiladi
    clearTimeout(timer.current);
    timer.current = setTimeout(runCheck, 250);
  }, [runCheck]);

  /* ---------- Boshlang'ich holat ---------- */
  useEffect(() => {
    const el = fieldRef.current;
    el.innerHTML = initialHtml;
    setEmpty(!el.textContent.trim());
    try {
      document.execCommand("defaultParagraphSeparator", false, "p");
    } catch {
      /* e'tiborsiz */
    }
    runCheck();
    return () => {
      clearTimeout(timer.current);
      if (canHighlight) CSS.highlights.delete(HIGHLIGHT);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Asboblar paneli holati ---------- */
  useEffect(() => {
    const onSel = () => {
      const sel = window.getSelection();
      const el = fieldRef.current;
      if (!sel || !sel.rangeCount || !el || !el.contains(sel.anchorNode))
        return;
      savedRange.current = sel.getRangeAt(0).cloneRange();
      setActive({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        ul: document.queryCommandState("insertUnorderedList"),
        ol: document.queryCommandState("insertOrderedList"),
      });
      const b = String(document.queryCommandValue("formatBlock"))
        .toLowerCase()
        .replace(/[<>]/g, "");
      setBlock(b === "h2" || b === "h3" ? b : "p");
    };
    document.addEventListener("selectionchange", onSel);
    return () => document.removeEventListener("selectionchange", onSel);
  }, []);

  /* ---------- Taklif oynasini yopish (tashqariga bosish / Esc) ---------- */
  useEffect(() => {
    if (!popup) return undefined;
    const onDown = (e) => {
      if (
        popupRef.current?.contains(e.target) ||
        fieldRef.current?.contains(e.target)
      )
        return;
      setPopup(null);
    };
    const onKey = (e) => e.key === "Escape" && setPopup(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [popup]);

  /* ---------- Buyruqlar ---------- */
  const restoreSelection = () => {
    if (!savedRange.current) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRange.current);
  };

  const run = (cmd, value = null) => {
    fieldRef.current.focus();
    restoreSelection();
    document.execCommand(cmd, false, value);
  };

  const addLink = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && fieldRef.current.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
    let url = window.prompt("Havola manzilini kiriting:", "https://");
    if (!url) return;
    url = url.trim();
    if (/^(javascript|data|vbscript):/i.test(url)) return;
    if (!/^(https?:|mailto:|tel:)/i.test(url)) url = `https://${url}`;

    fieldRef.current.focus();
    restoreSelection();
    const s = window.getSelection();
    if (s && !s.isCollapsed) {
      document.execCommand("createLink", false, url);
    } else {
      document.execCommand(
        "insertHTML",
        false,
        `<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`,
      );
    }
  };

  /* ---------- Muharrir hodisalari ---------- */
  const handleInput = () => {
    const el = fieldRef.current;
    setEmpty(!el.textContent.trim());
    setPopup(null);
    onChange?.(el.innerHTML);
    schedule();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const openPopup = (issue) => {
    const wrap = wrapRef.current.getBoundingClientRect();
    const rect = issue.range.getBoundingClientRect();
    const width = Math.min(268, wrap.width - 16);
    const left = Math.max(
      8,
      Math.min(rect.left - wrap.left, wrap.width - width - 8),
    );
    setPopup({ issue, left, top: rect.bottom - wrap.top + 8, width });
  };

  const handleClick = () => {
    const sel = window.getSelection();
    if (!sel || !sel.isCollapsed || !sel.anchorNode) return setPopup(null);
    const hit = issues.find((i) => {
      try {
        return i.range.isPointInRange(sel.anchorNode, sel.anchorOffset);
      } catch {
        return false;
      }
    });
    if (hit) openPopup(hit);
    else setPopup(null);
  };

  const applySuggestion = (issue) => {
    const el = fieldRef.current;
    el.focus();
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(issue.range);
    if (!document.execCommand("insertText", false, issue.suggestion)) {
      issue.range.deleteContents();
      issue.range.insertNode(document.createTextNode(issue.suggestion));
      handleInput();
    }
    setPopup(null);
  };

  const dismiss = (issue) => {
    ignored.current.add(issue.word);
    setPopup(null);
    runCheck();
  };

  /* ---------- Ko'rinish ---------- */
  const tool = { onRun: run };

  return (
    <div className="ge" ref={wrapRef}>
      <div className="ge__toolbar" role="toolbar" aria-label="Matn formati">
        <label className="ge__select">
          <select
            value={block}
            onChange={(e) => run("formatBlock", e.target.value)}
            aria-label="Matn turi"
          >
            <option value="p">Paragraf</option>
            <option value="h2">Sarlavha 1</option>
            <option value="h3">Sarlavha 2</option>
          </select>
          <Icon name="chevron" size={14} />
        </label>

        <Btn {...tool} cmd="bold" on={active.bold} label="Qalin (Ctrl+B)">
          <b>B</b>
        </Btn>
        <Btn {...tool} cmd="italic" on={active.italic} label="Qiya (Ctrl+I)">
          <i>I</i>
        </Btn>
        <Btn
          {...tool}
          cmd="underline"
          on={active.underline}
          label="Tagiga chizilgan (Ctrl+U)"
        >
          <u>U</u>
        </Btn>
        <Btn
          {...tool}
          cmd="insertUnorderedList"
          on={active.ul}
          label="Belgili ro'yxat"
        >
          <Icon name="ul" />
        </Btn>
        <Btn
          {...tool}
          cmd="insertOrderedList"
          on={active.ol}
          label="Raqamli ro'yxat"
        >
          <Icon name="ol" />
        </Btn>
        <button
          type="button"
          className="ge__btn"
          aria-label="Havola qo'shish"
          title="Havola qo'shish"
          onMouseDown={preventFocusLoss}
          onClick={addLink}
        >
          <Icon name="link" />
        </button>
      </div>

      <div
        ref={fieldRef}
        className={`ge__field${empty ? " is-empty" : ""}`}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        role="textbox"
        aria-multiline="true"
        aria-label="Matn muharriri"
        data-placeholder="Matningizni shu yerga yozing yoki joylashtiring..."
        onInput={handleInput}
        onPaste={handlePaste}
        onClick={handleClick}
      />

      <div className="ge__footer">
        {empty ? (
          <span className="ge__status">Tekshirish uchun matn yozing</span>
        ) : issues.length ? (
          <span className="ge__status is-warn">
            {issues.length} ta taklif
            <small> — chizilgan so'zni bosing</small>
          </span>
        ) : (
          <span className="ge__status is-ok">
            <Icon name="check" size={15} /> Xato topilmadi
          </span>
        )}
        <span className="ge__count">
          {stats.words} so'z · {stats.chars} belgi
        </span>
      </div>

      {/* Eski brauzerlar uchun: xatolar ro'yxati */}
      {!canHighlight && issues.length > 0 && (
        <ul className="ge__chips">
          {issues.slice(0, 4).map((i, k) => (
            <li key={`${i.start}-${k}`}>
              <button type="button" onClick={() => openPopup(i)}>
                {i.word} → {i.suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}

      {popup && (
        <div
          ref={popupRef}
          className="ge__popup"
          role="dialog"
          aria-label="Taklif"
          style={{ left: popup.left, top: popup.top, width: popup.width }}
        >
          <div className="ge__popup-head">
            <span>
              <Icon name="shield" size={16} />{" "}
              {TYPE_LABEL[popup.issue.type] || "Taklif"}
            </span>
            <button
              type="button"
              onClick={() => setPopup(null)}
              aria-label="Yopish"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
          <div className="ge__fix">
            <s>{popup.issue.word.trim() || "bo'shliq"}</s>
            <Icon name="arrow" size={16} />
            <strong>{popup.issue.suggestion.trim() || "·"}</strong>
          </div>
          <p>{popup.issue.message}</p>
          <div className="ge__popup-actions">
            <button
              type="button"
              className="ge__apply"
              onClick={() => applySuggestion(popup.issue)}
            >
              Qabul qilish
            </button>
            <button
              type="button"
              className="ge__dismiss"
              onClick={() => dismiss(popup.issue)}
            >
              Rad etish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
