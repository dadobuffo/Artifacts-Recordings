const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");
const overlay = document.querySelector("[data-overlay]");

openButton.addEventListener("click", () => {
  modal.showModal();
});
closeButton.addEventListener("click", () => {
  modal.close();
});
