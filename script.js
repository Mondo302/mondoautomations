document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // NAV TOGGLE (MOBILE)
  // =============================
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Smooth scroll
  const smoothLinks = document.querySelectorAll(
    'a[href^="#"], button[data-target]'
  );

  smoothLinks.forEach((el) => {
    el.addEventListener("click", (e) => {
      const targetId =
        el.getAttribute("href")?.startsWith("#")
          ? el.getAttribute("href")
          : el.getAttribute("data-target");

      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const top =
        targetEl.getBoundingClientRect().top + window.scrollY - 80;

      window.scrollTo({
        top,
        behavior: "smooth",
      });

      if (nav && nav.classList.contains("open")) {
        nav.classList.remove("open");
      }
    });
  });

  // =============================
  // DARK MODE TOGGLE
  // =============================
  const THEME_KEY = "mondo-theme";
  const btn = document.getElementById("theme-toggle");

  const setDark = () => {
    document.body.classList.add("dark");
    if (btn) btn.textContent = "☀️";
    try {
      localStorage.setItem(THEME_KEY, "dark");
    } catch {}
  };

  const setLight = () => {
    document.body.classList.remove("dark");
    if (btn) btn.textContent = "🌙";
    try {
      localStorage.setItem(THEME_KEY, "light");
    } catch {}
  };

  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") {
      setDark();
    } else if (saved === "light") {
      setLight();
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDark();
    } else {
      setLight();
    }
  } catch {
    setLight();
  }

  if (btn) {
    btn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      if (isDark) setDark();
      else setLight();
    });
  }

  // =============================
  // SCROLL REVEAL
  // =============================
  const revealElements = document.querySelectorAll("[data-reveal]");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight * 0.85) {
        el.classList.add("revealed");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load
});
