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

// =============================
// HERO WORD ROTATOR (typewriter)
// =============================
(() => {
  const el = document.getElementById("rotate-word");
  if (!el) return;

  const words = ["systems", "automations", "workflows", "AI agents"];
  let i = 0;          // which word
  let j = 0;          // which character
  let deleting = false;

  const TYPE_SPEED = 65;       // ms per char while typing
  const DELETE_SPEED = 40;     // ms per char while deleting
  const HOLD_BEFORE_DELETE = 900; // ms to hold full word
  const HOLD_BEFORE_TYPE = 300;   // ms to pause before typing next word

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reduced-motion fallback: simple swap (no typewriter)
  if (reduceMotion) {
    const swap = () => {
      el.textContent = words[i];
      i = (i + 1) % words.length;
    };
    swap();
    setInterval(swap, 1500);
    return;
  }

  function tick() {
    const current = words[i];

    if (!deleting) {
      // typing
      el.textContent = current.slice(0, j + 1);
      j++;

      if (j === current.length) {
        // word complete
        setTimeout(() => {
          deleting = true;
          tick();
        }, HOLD_BEFORE_DELETE);
        return;
      }

      setTimeout(tick, TYPE_SPEED);
    } else {
      // deleting
      el.textContent = current.slice(0, j - 1);
      j--;

      if (j === 0) {
        deleting = false;
        i = (i + 1) % words.length;
        setTimeout(tick, HOLD_BEFORE_TYPE);
        return;
      }

      setTimeout(tick, DELETE_SPEED);
    }
  }

  // initial delay for a smoother entrance
  setTimeout(tick, 300);
})();

// --- Subtle Parallax Drift ---
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const scrollY = window.scrollY * 0.3; // smaller = slower drift
  hero.style.backgroundPositionY = `${scrollY}px`;
});

// --- Scroll Reveal ---
const revealElements = document.querySelectorAll('.feature-box, .gallery-card, .section-block');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});


