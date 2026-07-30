(() => {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll(".nav-list a");
  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");
  const submitButton = form?.querySelector('button[type="submit"]');

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
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      status.hidden = false;
      status.className = "form-status";
      status.textContent = "Bezig met versturen…";
      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        const result = await response.json();

        if (response.ok && result.success) {
          status.className = "form-status is-success";
          status.textContent = "Bedankt! Je bericht is verstuurd.";
          form.reset();
        } else {
          throw new Error(result.message || "Versturen mislukt");
        }
      } catch (error) {
        status.className = "form-status is-error";
        status.textContent = "Versturen lukte niet. Probeer het later opnieuw of mail direct.";
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }
})();
