"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

function closeMenu(restoreFocus = false) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Otevřít menu");
  navigation.classList.remove("is-open");
  document.body.classList.remove("locked");
  if (restoreFocus) menuButton.focus();
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen) return closeMenu();
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Zavřít menu");
    navigation.classList.add("is-open");
    document.body.classList.add("locked");
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (menuButton.getAttribute("aria-expanded") !== "true") return;
    if (event.key === "Escape") closeMenu(true);
    if (event.key === "Tab") {
      const controls = [menuButton, ...navigation.querySelectorAll("a")];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  window.matchMedia("(min-width: 900px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.documentElement.classList.add("motion-ready");
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.querySelector(".lightbox");

if (galleryItems.length && lightbox) {
  let visibleItems = [...galleryItems];
  let activeIndex = 0;
  let opener = null;
  let touchStart = null;
  const image = lightbox.querySelector(".lightbox-image");
  const caption = lightbox.querySelector(".lightbox-caption");
  const counter = lightbox.querySelector("[data-lightbox-count]");

  function showImage(index) {
    activeIndex = (index + visibleItems.length) % visibleItems.length;
    const item = visibleItems[activeIndex];
    const thumbnail = item.querySelector("img");
    image.src = item.dataset.full || thumbnail.src;
    image.alt = thumbnail.alt;
    image.style.filter = getComputedStyle(thumbnail).filter;
    caption.textContent = item.dataset.caption;
    counter.textContent = `${activeIndex + 1} / ${visibleItems.length}`;
  }

  galleryItems.forEach((item) => item.addEventListener("click", () => {
    opener = item;
    showImage(visibleItems.indexOf(item));
    lightbox.showModal();
    document.body.classList.add("locked");
    lightbox.querySelector(".lightbox-close").focus();
  }));
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showImage(activeIndex - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(activeIndex + 1));
  lightbox.addEventListener("close", () => {
    document.body.classList.remove("locked");
    if (opener) opener.focus({ preventScroll: true });
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      lightbox.close();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showImage(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  image.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  image.addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - touchStart.x;
    const distanceY = touch.clientY - touchStart.y;
    if (Math.abs(distanceX) > 50 && Math.abs(distanceX) > Math.abs(distanceY)) {
      showImage(activeIndex + (distanceX < 0 ? 1 : -1));
    }
    touchStart = null;
  }, { passive: true });
  image.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((filter) => {
        filter.setAttribute("aria-pressed", String(filter === button));
      });
      galleryItems.forEach((item) => {
        item.hidden = button.dataset.filter !== "all" && item.dataset.category !== button.dataset.filter;
      });
      visibleItems = galleryItems.filter((item) => !item.hidden);
      document.querySelector("[data-gallery-count]").textContent = `${visibleItems.length} ${visibleItems.length === 1 ? "ukázka" : visibleItems.length < 5 ? "ukázky" : "ukázek"}`;
    });
  });
}

const form = document.querySelector(".contact-form");

if (form) {
  form.noValidate = true;
  form.querySelector('[type="submit"]').disabled = false;
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const dateInput = form.elements.namedItem("date");
  const today = new Date();
  dateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const serviceInput = form.elements.namedItem("service");
  const requestedService = new URLSearchParams(location.search).get("sluzba");
  if ([...serviceInput.options].some((option) => option.value === requestedService)) {
    serviceInput.value = requestedService;
  }
  const status = form.querySelector(".form-status");
  const result = form.querySelector("[data-form-result]");
  const emailButton = form.querySelector("[data-email]");
  let preparedMessage = "";

  function validateField(field) {
    let error = "";
    if (field.required && (field.type === "checkbox" ? !field.checked : !field.value.trim())) {
      error = field.type === "checkbox" ? "Potvrďte prosím, že jste si přečetla informace o soukromí." : "Vyplňte prosím toto pole.";
    } else if (field.type === "email" && field.validity.typeMismatch) {
      error = "Zadejte platný e-mail, například jmeno@domena.cz.";
    } else if (field.type === "tel" && field.value.trim() && !/^\+?[\d\s()-]{6,30}$/.test(field.value.trim())) {
      error = "Zadejte telefonní číslo, případně s předvolbou +420.";
    } else if (field.type === "date" && (field.validity.badInput || field.validity.rangeUnderflow)) {
      error = "Vyberte dnešní nebo budoucí datum.";
    } else if (field.validity.tooLong) {
      error = "Text je příliš dlouhý. Zkraťte jej prosím.";
    }
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) errorElement.textContent = error;
    field.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  }

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      status.hidden = true;
      preparedMessage = "";
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstInvalid = null;
    fields.forEach((field) => {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.hidden = true;
      firstInvalid.focus();
      return;
    }
    const values = new FormData(form);
    const selectedService = serviceInput.selectedOptions[0].textContent;
    const selectedDate = dateInput.value ? new Date(`${dateInput.value}T12:00:00`).toLocaleDateString("cs-CZ") : "Po domluvě";
    preparedMessage = [
      "Dobrý den, Jano,", "", "ráda bych poptala líčení:", "",
      `Jméno: ${values.get("name").trim()}`,
      `E-mail: ${values.get("email").trim()}`,
      `Telefon: ${values.get("phone").trim() || "Neuveden"}`,
      `Služba: ${selectedService}`,
      `Datum: ${selectedDate}`,
      `Místo: ${values.get("place").trim() || "Po domluvě"}`, "",
      values.get("message").trim(), "", "Děkuji."
    ].join("\n");
    const recipient = form.dataset.recipient.trim();
    emailButton.hidden = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient);
    result.textContent = emailButton.hidden
      ? "Poptávka je připravená, ale nebyla odeslána. Skutečný e-mail Jany zatím není doplněný. Text si můžete stáhnout; nejde o potvrzenou rezervaci."
      : "Poptávka je připravená, ale zatím nebyla odeslána. Otevřete ji ve své e-mailové aplikaci a odešlete. Termín je platný až po osobním potvrzení.";
    status.hidden = false;
  });

  form.querySelector("[data-download]").addEventListener("click", () => {
    if (!preparedMessage) return;
    const url = URL.createObjectURL(new Blob(["\uFEFF", preparedMessage], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "poptavka-liceni.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  emailButton.addEventListener("click", () => {
    if (!preparedMessage || emailButton.hidden) return;
    location.href = `mailto:${encodeURIComponent(form.dataset.recipient.trim())}?subject=${encodeURIComponent("Poptávka líčení")}&body=${encodeURIComponent(preparedMessage)}`;
  });
}