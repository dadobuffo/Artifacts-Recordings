window.onload = function () {
  document.getElementById("temp-modal").style.display = "flex";
};

function closeModal() {
  document.getElementById("temp-modal").style.display = "none";
}

document.getElementById("temp-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});
