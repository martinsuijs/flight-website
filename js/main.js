(() => {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll(".nav-list a");
  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const naam = String(data.get("Naam") || "").trim();
      const telefoon = String(data.get("Telefoonnummer") || "").trim();
      const email = String(data.get("Email") || "").trim();
      const bericht = String(data.get("Bericht") || "").trim();

      if (!naam || !email || !bericht) {
        status.hidden = false;
        status.className = "form-status is-error";
        status.textContent = "Vul naam, e-mail en bericht in.";
        return;
      }

      const subject = encodeURIComponent(`Bericht via Flight-website van ${naam}`);
      const body = encodeURIComponent(
        `Naam: ${naam}\nTelefoonnummer: ${telefoon}\nEmail: ${email}\n\nBericht:\n${bericht}`
      );

      window.location.href = `mailto:info@sleepinbird.com?subject=${subject}&body=${body}`;

      status.hidden = false;
      status.className = "form-status is-success";
      status.textContent = "Je e-mailprogramma opent om het bericht te versturen.";
      form.reset();
    });
  }
})();
