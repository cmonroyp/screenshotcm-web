// ScreenShotCM — language, reveals, the chapter rail and the hero's tilt.
// The page is written in Spanish; English replaces each [data-i18n] text.
(() => {
  "use strict";

  const EN = {
    "nav.capture": "Capture", "nav.annotate": "Annotate", "nav.present": "Present",
    "nav.share": "Share", "nav.pin": "Pin", "nav.light": "Light", "nav.download": "Download",
    "rail.intro": "Intro",
    "hero.eyebrow": "For Windows 10 and 11",
    "hero.title": "Capture. Annotate.<br><em>Share</em> in a second.",
    "hero.lede": "A tiny agent that lives in the Windows tray. Press Print Screen, pick an area, and the capture is already on your clipboard, ready to annotate.",
    "hero.cta": "Download free", "hero.tour": "See how it works ↓",
    "stats.memory": "MB of memory at rest", "stats.installer": "KB installer",
    "stats.exe": "single .exe, no dependencies", "stats.data": "bytes sent to the internet",
    "cap.title": "The screen <em>freezes</em>. You choose.",
    "cap.body": "Press the shortcut and the screen holds still: nothing moves while you select. The magnifier and crosshair give you the exact pixel, and the size follows you as you drag.",
    "key.prt": "Print Screen", "key.shiftprt": "Shift + Print Screen",
    "key.ctrlprt": "Ctrl + Print Screen", "key.altshiftprt": "Alt + Shift + Print Screen",
    "cap.area": "An area", "cap.window": "A window", "cap.full": "Full screen", "cap.prev": "The same area again",
    "cap.note": "Shift keeps the selection square, the arrow keys move the pointer one pixel at a time, and Space switches to window capture.",
    "ann.title": "Explain with <em>an arrow</em>, not a paragraph.",
    "ann.body": "The editor opens as soon as you capture. Straight or curved arrows, rectangles, ellipses, text, numbered counters, spotlight, pen and highlighter. And pixelate hides what must not be seen in one stroke.",
    "tool.arrow": "Curved arrows", "tool.text": "Editable text", "tool.counter": "Counters",
    "tool.pixelate": "Pixelate", "tool.spotlight": "Spotlight", "tool.highlight": "Highlighter",
    "tool.crop": "Crop", "tool.undo": "Unlimited undo",
    "pre.title": "Ready for the <em>presentation</em>.",
    "pre.body": "One click and the capture floats on a gradient, with padding, rounded corners and a shadow. Perfect for documentation, social posts or a slide.",
    "sha.title": "It is already on your <em>clipboard</em>.",
    "sha.body": "Every capture shows up as a thumbnail in the corner. Hover to copy or save it, drag it straight into a chat, an email or a document, or double-click to annotate it.",
    "sha.l1": "Copy, save, pin, annotate or delete from the thumbnail",
    "sha.l2": "Drag and drop into any application",
    "sha.l3": "Last month's history, always at hand",
    "pin.title": "A reference that <em>stays put</em>.",
    "pin.body": "Pin a capture above every window while you work: a figure, a design, a piece of code. Drag it, resize it with the wheel, change its opacity with Ctrl + wheel, or lock it so clicks pass through.",
    "lig.title": "Made to <em>go unnoticed</em>.",
    "lig.body": "Written in Rust on the native Windows APIs. No embedded browser, no runtime, no background services. It starts with Windows and waits in the tray using less memory than a desktop icon.",
    "lig.s1": "private memory at rest", "lig.s2": "per selection frame at 3840 × 1080",
    "lig.s3": "one single executable", "lig.s4": "network connections: everything stays on your PC",
    "lig.note": "Configurable shortcuts, Spanish and English, and everything set from one window.",
    "dl.title": "Your next capture,<br><em>in a second</em>.",
    "dl.button": "Download for Windows", "dl.meta": "MSI installer · 444 KB · version",
    "dl.f1": "Windows 10 and 11, 64-bit", "dl.f2": "Installs for your user, no administrator needed",
    "dl.f3": "A new version installs over the previous one", "dl.f4": "Free, no account, no ads",
    "foot.privacy": "Privacy", "foot.home": "Home", "foot.releases": "Releases", "foot.support": "Support",
    "alt.hero": "The ScreenShotCM editor with an annotated capture on a gradient background",
    "alt.capture": "Selecting an area with the magnifier over a frozen screen",
    "alt.editor": "A capture annotated with counters, a curved arrow, text and pixelated names",
    "alt.background": "The background panel with gradients, padding, rounding and shadow",
    "alt.card": "Quick-access thumbnail with the Copy and Save buttons",
    "alt.pin": "A pinned capture floating over a chart",
    "alt.settings": "The settings window with configurable keyboard shortcuts",
    "doc.title": "Privacy — ScreenShotCM",
    "page.title": "ScreenShotCM — Screenshots for Windows",
    "page.description": "Capture, annotate and share in seconds. A tiny agent in the Windows tray: 1.8 MB of memory, a single .exe, and nothing leaves your PC.",
  };

  // The Spanish text is the page itself: read it once so a switch back
  // restores it exactly.
  const ES = {};
  document.querySelectorAll("[data-i18n]").forEach((el) => { ES[el.dataset.i18n] = el.innerHTML; });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { ES[el.dataset.i18nAlt] = el.alt; });
  ES["page.title"] = document.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) ES["page.description"] = desc.content;

  function stored() {
    try { return localStorage.getItem("lang"); } catch { return null; }
  }
  function store(lang) {
    try { localStorage.setItem("lang", lang); } catch { /* private window */ }
  }

  function apply(lang) {
    const dict = lang === "en" ? EN : ES;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const t = dict[el.dataset.i18n];
      if (t !== undefined) el.innerHTML = t;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const t = dict[el.dataset.i18nAlt];
      if (t !== undefined) el.alt = t;
    });
    document.querySelectorAll("img[data-shot]").forEach((img) => {
      img.src = `assets/img/${lang}/${img.dataset.shot}`;
    });
    document.querySelectorAll("[data-only]").forEach((el) => {
      el.classList.toggle("shown", el.dataset.only === lang);
    });
    const key = document.body.dataset.titleKey || "page.title";
    if (dict[key]) document.title = dict[key];
    if (desc && dict["page.description"]) desc.content = dict["page.description"];
    document.querySelectorAll(".lang button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    formatCounts(lang);
  }

  const initial = stored() || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
  document.querySelectorAll(".lang button").forEach((b) => {
    b.addEventListener("click", () => { store(b.dataset.lang); apply(b.dataset.lang); });
  });

  // ── Counters in the hero ───────────────────────────────────────────
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counts = [...document.querySelectorAll("[data-count]")];
  let counted = false;
  function number(v, decimals, lang) {
    return v.toLocaleString(lang === "en" ? "en-US" : "es-ES", {
      minimumFractionDigits: decimals, maximumFractionDigits: decimals,
    });
  }
  function formatCounts(lang) {
    if (!counted) return;
    counts.forEach((el) => { el.textContent = number(+el.dataset.count, +(el.dataset.decimals || 0), lang); });
  }
  function runCounts() {
    counted = true;
    const lang = document.documentElement.lang;
    if (reduce) { formatCounts(lang); return; }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / 1400);
      const e = 1 - Math.pow(1 - t, 3);
      counts.forEach((el) => {
        el.textContent = number(+el.dataset.count * e, +(el.dataset.decimals || 0), document.documentElement.lang);
      });
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  apply(initial);
  if (counts.length) setTimeout(runCounts, 350);

  // ── Reveals ────────────────────────────────────────────────────────
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -12% 0px" });
  document.querySelectorAll(".reveal, .chapter .copy").forEach((el) => io.observe(el));

  // ── Rail, nav and the hero's tilt follow the scroll ────────────────
  const chapters = [...document.querySelectorAll("[data-chapter]")];
  const railItems = [...document.querySelectorAll(".rail li")];
  const bar = document.querySelector(".rail-progress i");
  const railList = document.querySelector(".rail ol");
  const hero = document.querySelector(".hero-shot");
  const nav = document.getElementById("nav");
  let lastY = scrollY;
  let ticking = false;

  function update() {
    ticking = false;
    const y = scrollY;
    const mid = y + innerHeight * 0.45;
    let active = 0;
    chapters.forEach((c, i) => { if (c.offsetTop <= mid) active = i; });
    railItems.forEach((li, i) => li.classList.toggle("active", i === active));
    if (bar && railList) {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.height = `${railList.offsetHeight * (max > 0 ? y / max : 0)}px`;
    }
    if (hero && !reduce) {
      const p = Math.min(1, y / (innerHeight * 0.7));
      hero.style.setProperty("--p", p.toFixed(3));
    }
    if (nav) nav.classList.toggle("hidden", y > lastY && y > innerHeight * 0.6);
    lastY = y;
  }
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener("resize", update);
  update();
})();
