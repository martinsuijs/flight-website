(() => {
  const photos = window.FLIGHT_PHOTOS || [];
  const photoBase = "photos/";

  function createLightbox() {
    const root = document.createElement("div");
    root.className = "lightbox";
    root.hidden = true;
    root.innerHTML = `
      <div class="lightbox-backdrop" data-lightbox-close></div>
      <div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Fotovoorbeeld">
        <button type="button" class="lightbox-close" data-lightbox-close aria-label="Sluiten">×</button>
        <button type="button" class="lightbox-nav lightbox-prev" data-lightbox-prev aria-label="Vorige foto">‹</button>
        <img class="lightbox-image" alt="" />
        <button type="button" class="lightbox-nav lightbox-next" data-lightbox-next aria-label="Volgende foto">›</button>
        <p class="lightbox-counter" aria-live="polite"></p>
      </div>
    `;
    document.body.appendChild(root);
    return root;
  }

  function initLightbox(items, options = {}) {
    if (!items.length) return;

    const base = options.base || photoBase;
    const lightbox = createLightbox();
    const image = lightbox.querySelector(".lightbox-image");
    const counter = lightbox.querySelector(".lightbox-counter");
    let index = 0;

    const open = (i) => {
      index = (i + items.length) % items.length;
      const photo = items[index];
      image.src = base + photo.src;
      image.alt = `Foto ${index + 1} van ${items.length}`;
      counter.textContent = `${index + 1} / ${items.length}`;
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
    };

    const close = () => {
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
      image.removeAttribute("src");
    };

    const prev = () => open(index - 1);
    const next = () => open(index + 1);

    lightbox.addEventListener("click", (event) => {
      if (event.target.closest("[data-lightbox-close]")) close();
      if (event.target.closest("[data-lightbox-prev]")) prev();
      if (event.target.closest("[data-lightbox-next]")) next();
    });

    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    });

    return { open, close };
  }

  function renderGrid(container, items, options = {}) {
    if (!container || !items.length) return null;

    const base = options.base || photoBase;
    const limit = options.limit || items.length;
    const subset = items.slice(0, limit);
    const lightbox = initLightbox(items, { base });

    const grid = document.createElement("div");
    grid.className = "photo-grid";
    grid.setAttribute("role", "list");

    subset.forEach((photo, i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "photo-thumb";
      button.setAttribute("role", "listitem");
      button.setAttribute("aria-label", `Open foto ${i + 1}`);
      button.innerHTML = `<img src="${base}${photo.thumb}" alt="" loading="lazy" />`;
      button.addEventListener("click", () => lightbox.open(i));
      grid.appendChild(button);
    });

    container.appendChild(grid);
    return lightbox;
  }

  // Homepage preview
  const preview = document.querySelector("[data-photo-preview]");
  if (preview) {
    renderGrid(preview, photos, { limit: 6 });
  }

  // Full gallery page
  const gallery = document.querySelector("[data-photo-gallery]");
  if (gallery) {
    renderGrid(gallery, photos);
  }
})();
