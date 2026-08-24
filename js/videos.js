(() => {
  const videos = window.FLIGHT_VIDEOS || [];
  const base = "videos/";

  function renderVideos(container, items, options = {}) {
    if (!container || !items.length) return;

    const limit = options.limit || items.length;
    const subset = items.slice(0, limit);

    subset.forEach((video) => {
      const figure = document.createElement("figure");
      figure.className = "video-card";

      const player = document.createElement("video");
      player.controls = true;
      player.playsInline = true;
      player.preload = "metadata";
      if (video.poster) player.poster = base + video.poster;

      const source = document.createElement("source");
      source.src = base + video.src;
      source.type = "video/mp4";
      player.appendChild(source);

      figure.appendChild(player);
      container.appendChild(figure);
    });
  }

  const preview = document.querySelector("[data-video-preview]");
  if (preview) {
    renderVideos(preview, videos, { limit: 2 });
  }

  const gallery = document.querySelector("[data-video-gallery]");
  if (gallery) {
    renderVideos(gallery, videos);
  }
})();
