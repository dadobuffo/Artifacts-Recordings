document.addEventListener("DOMContentLoaded", async () => {
  const gridContainer = document.querySelector(".grid-container");
  const modal = document.querySelector("#single-modal");
  const closeBtn = modal.querySelector("[data-close-modal]");
  let portfolioData = [];
  let lastFocusedItem = null;
  let lastScrollY = 0;

  try {
    const res = await fetch("./data/portfolioData.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    portfolioData = await res.json();
  } catch (err) {
    console.error("Errore caricamento JSON:", err);
    gridContainer.textContent = "Error loading portfolio data.";
    return;
  }

  portfolioData
    .slice()
    .reverse()
    .forEach((item) => {
      if (!item.id || !item.cover || !item.artist || !item.title) return;
      const card = document.createElement("div");
      card.className = "grid-item";
      card.dataset.id = item.id;
      card.innerHTML = `
      <img class="grid-item-cover" src="${item.cover}" alt="${item.artist} - ${
        item.title
      }">
      <div class="grid-item-overlay"></div>
      <div class="grid-item-text">
        <p class="grid-item-name">${item.artist} - ${item.title}</p>
        <p class="grid-item-role">${item.role || ""}</p>
      </div>
    `;
      gridContainer.appendChild(card);
    });

  gridContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".grid-item");
    if (!card) return;

    lastScrollY = window.scrollY;
    document.body.classList.add("modal-open");

    lastFocusedItem = card;

    const item = portfolioData.find((i) => String(i.id) === card.dataset.id);
    if (!item) return;
    modal.querySelector(".modal-cover").src = item.cover;
    modal.querySelector(".modal-cover").alt = `${item.artist} - ${item.title}`;
    modal.querySelector(".modal-artist").textContent = item.artist;
    modal.querySelector(".modal-title").textContent = item.title;
    modal.querySelector(".modal-info").textContent = item.info || "";
    modal.querySelector(".modal-role").textContent = item.role || "";
    modal.querySelector(".modal-video iframe").src = item.video || "";

    const linksContainer = modal.querySelector(".modal-links");
    linksContainer.innerHTML = "";

    const socials = {
      facebook: { url: item.linkFacebook, icon: "facebook" },
      instagram: { url: item.linkInstagram, icon: "instagram" },
      youtube: { url: item.linkYoutube, icon: "youtube" },
      spotify: { url: item.linkSpotify, icon: "spotify" },
      apple: { url: item.linkApple, icon: "apple" },
    };

    Object.entries(socials).forEach(([key, { url, icon }]) => {
      if (!url) return;

      const a = document.createElement("a");
      a.className = "social-button";
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", `Segui ${item.artist} su ${key}`);

      const img = document.createElement("img");
      img.className = "socials-icon";
      img.src = `assets/icons/colored/socials/${icon}.svg`;
      img.alt = `${key}`;

      a.appendChild(img);
      linksContainer.appendChild(a);
    });
    modal.showModal();
  });

  function closeModal() {
    const iframe = modal.querySelector(".modal-video iframe");
    modal.close();
    if (iframe) iframe.src = "";
    document.body.classList.remove("modal-open");
    window.scrollTo(0, lastScrollY);
    lastFocusedItem?.focus();
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});
