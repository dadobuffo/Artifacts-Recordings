document.addEventListener("DOMContentLoaded", function () {
  fetch("../data/portfolioData.json")
    .then((response) => response.json())
    .then((jsonData) => {
      const gridContainer = document.querySelector(".grid-container");

      jsonData.reverse().forEach((item) => {
        // Creazione del grid item
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

        // Creazione del modal
        const modal = document.createElement("dialog");
        modal.classList.add("modal");
        modal.setAttribute("id", `modal-${item.id}`);
        modal.setAttribute("data-modal", "");

        modal.innerHTML = `
          <button class="close-modal" data-close-modal>&times;</button>
          <div class="modal-left-section">
              <img src="${item.cover}" alt="${item.artist} - ${item.title}">
              <div class="modal-upper-text">
                  <p class="modal-artist">${item.artist}</p>
                  <p class="modal-title">${item.title}</p>
              </div>
              <div class="modal-lower-text">
                  <p class="modal-info">${item.info}</p>
                  <p class="modal-role">${item.role}</p>
              </div>
          </div>
          <div class="modal-right-section">
              <div class="modal-video">
                  <iframe src="${item.video}" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen>
                  </iframe>
              </div>
              <div class="modal-links">
                  <a href="${item.linkFacebook}" target="_blank" class="social-button">
                      <img class="socials-icon" src="icons/socials/facebook_icon.svg" alt="Facebook">
                  </a>
                  <a href="${item.linkInstagram}" target="_blank" class="social-button">
                      <img class="socials-icon" src="icons/socials/instagram_icon.svg" alt="Instagram">
                  </a>
                  <a href="${item.linkYoutube}" target="_blank" class="social-button">
                      <img class="socials-icon" src="icons/socials/spotify_icon.svg" alt="Spotify">
                  </a>
                  <a href="${item.linkSpotify}" target="_blank" class="social-button">
                      <img class="socials-icon" src="icons/socials/spotify_icon.svg" alt="Spotify">
                  </a>
                  <a href="${item.linkApple}" target="_blank" class="social-button">
                      <img class="socials-icon" src="icons/socials/spotify_icon.svg" alt="Apple Music">
                  </a>
              </div>
          </div>
        `;

        // Aggiungi il modal al body
        document.body.appendChild(modal);

        // Apri il modal quando si clicca sul grid item
        gridItem.addEventListener("click", () => {
          console.log("Apertura modal:", `modal-${item.id}`);
          modal.showModal(); // Usa showModal() per aprire il modal
        });

        // Chiudi il modal quando si clicca sul pulsante di chiusura
        modal.querySelector(".close-modal").addEventListener("click", () => {
          modal.close(); // Usa close() per chiudere il modal
        });

        // Chiudi il modal quando si clicca fuori dal modal
        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            modal.close();
          }
        });
      });
    })
    .catch((error) => console.error("Errore nel caricamento del JSON:", error));
});
