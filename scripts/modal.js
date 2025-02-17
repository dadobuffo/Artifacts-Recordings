document.addEventListener("DOMContentLoaded", function () {
  fetch("../data/portfolioData.json")
    .then((response) => response.json())
    .then((jsonData) => {
      const gridContainer = document.querySelector(".grid-container");

      jsonData.reverse().forEach((item) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.setAttribute("data-open-modal", `modal-${item.id}`);
        gridItem.innerHTML = `
          <img class="grid-item-cover" src="${item.cover}" alt="${item.artist} - ${item.title}">
          <div class="grid-item-overlay"></div>
          <div class="grid-item-text">
            <p class="grid-item-name">${item.artist} - ${item.title}</p>
            <p class="grid-item-role">${item.role}</p>
          </div>
        `;
        gridContainer.appendChild(gridItem);

        const modal = document.createElement("dialog");
        modal.classList.add("modal");
        modal.setAttribute("id", `modal-${item.id}`);
        modal.setAttribute("data-modal", "");

        modal.innerHTML = `
          <button class="close-modal" data-close-modal>&times;</button>
          <div class="modal-left-section">
              <img src="${item.cover}" alt="${item.artist} - ${item.title}">
              <div class="modal-left-text">
                  <p class="modal-artist">${item.artist}</p>
                  <p class="modal-title">${item.title}</p>
              </div>
              </div>
              <div class="modal-right-section">
              <div class="modal-right-text">
                  <p class="modal-info">${item.info}</p>
                  <p class="modal-role">${item.role}</p>
              </div>
              <div class="modal-video">
                  <iframe src="${item.video}" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen>
                  </iframe>
              </div>
              <div class="modal-links">
                  <a href="${item.linkFacebook}" target="_blank" class="social-button">
                      <img class="socials-icon" src="../assets/icons/socials/facebook.svg" alt="Follow ${item.artist} on Facebook">
                  </a>
                  <a href="${item.linkInstagram}" target="_blank" class="social-button">
                      <img class="socials-icon" src="../assets/icons/socials/instagram.svg" alt="Follow ${item.artist} on Instagram">
                  </a>
                  <a href="${item.linkYoutube}" target="_blank" class="social-button">
                      <img class="socials-icon" src="../assets/icons/socials/youtube.svg" alt="Follow ${item.artist} on YouTube">
                  </a>
                  <a href="${item.linkSpotify}" target="_blank" class="social-button">
                      <img class="socials-icon" src="../assets/icons/socials/spotify.svg" alt="Follow ${item.artist} on Spotify">
                  </a>
                  <a href="${item.linkApple}" target="_blank" class="social-button">
                      <img class="socials-icon" src="../assets/icons/socials/spotify.svg" alt="Follow ${item.artist} on Apple Music">
                  </a>
              </div>
          </div>
        `;

        document.body.appendChild(modal);

        gridItem.addEventListener("click", () => {
          console.log("Modal opening:", `modal-${item.id}`);
          modal.showModal();
        });

        modal.querySelector(".close-modal").addEventListener("click", () => {
          modal.close();
        });

        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            modal.close();
          }
        });
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
