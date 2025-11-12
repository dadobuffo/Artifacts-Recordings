const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener("change", () => {
  if (menuToggle.checked) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

window.addEventListener("scroll", () => {
  const arrow = document.querySelector(".arrow-icon");
  const maxScroll = 400;

  if (arrow) {
    const scrollY = window.scrollY;
    const opacity = Math.max(0, 1 - scrollY / maxScroll);
    arrow.style.opacity = opacity;
  }
});

const arrowIcon = document.querySelector(".arrow-icon");
if (arrowIcon) {
  arrowIcon.addEventListener("click", () => {
    const scrollTarget = window.innerHeight - 100;
    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    });
  });
}
