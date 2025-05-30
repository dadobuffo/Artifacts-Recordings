const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener("change", () => {
  if (menuToggle.checked) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
