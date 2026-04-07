/* MENU TOGGLE */
const menuToggle = document.getElementById("menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("change", () => {
    document.body.style.overflow = menuToggle.checked ? "hidden" : "";
  });
}

/* ARROW ICON */
window.addEventListener("scroll", () => {
  const arrow = document.querySelector(".arrow-icon");
  if (arrow) {
    const opacity = Math.max(0, 1 - window.scrollY / 400);
    arrow.style.opacity = opacity;
  }
});

const arrowIcon = document.querySelector(".arrow-icon");
if (arrowIcon) {
  arrowIcon.addEventListener("click", () => {
    window.scrollTo({ top: window.innerHeight - 0, behavior: "smooth" });
  });
}

/* FOOTER YEAR */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* SOCIAL FLOAT */
const hero = document.querySelector(".hero");
const socialsFloat = document.getElementById("socials-float");
const socialsFloatBtn = document.getElementById("socials-float-btn");

if (socialsFloat && socialsFloatBtn) {
  if (!hero) {
    socialsFloat.classList.add("visible");
  } else {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          socialsFloat.classList.add("visible");
        } else {
          socialsFloat.classList.remove("visible", "open");
          socialsFloatBtn.classList.remove("open");
          socialsFloatBtn.setAttribute("aria-expanded", "false");
        }
      },
      { threshold: 0.05 },
    );
    heroObserver.observe(hero);
  }

  socialsFloatBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = socialsFloat.classList.toggle("open");
    socialsFloatBtn.classList.toggle("open", isOpen);
    socialsFloatBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!socialsFloat.contains(e.target)) {
      socialsFloat.classList.remove("open");
      socialsFloatBtn.classList.remove("open");
      socialsFloatBtn.setAttribute("aria-expanded", "false");
    }
  });
}
