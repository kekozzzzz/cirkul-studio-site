// Шторка меню (справа), открывается по кнопке-гамбургеру в шапке
const menuToggle = document.querySelector(".menu-toggle");
const navDrawer = document.querySelector(".nav-drawer");
const navOverlay = document.querySelector(".nav-drawer-overlay");
const navClose = document.querySelector(".nav-drawer-close");

function closeDrawer() {
  navDrawer.classList.remove("open");
  navOverlay.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function openDrawer() {
  navDrawer.classList.add("open");
  navOverlay.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
}

if (menuToggle && navDrawer && navOverlay) {
  menuToggle.addEventListener("click", () => {
    navDrawer.classList.contains("open") ? closeDrawer() : openDrawer();
  });
  navOverlay.addEventListener("click", closeDrawer);
  navClose?.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
}

// Галерея фото зала — стрелки листают, скролл нативный на тач
document.querySelectorAll(".hall-gallery").forEach((gallery) => {
  const scroller = gallery.querySelector(".hall-gallery-scroll");
  const prevBtn = gallery.querySelector(".gallery-arrow.prev");
  const nextBtn = gallery.querySelector(".gallery-arrow.next");
  if (!scroller) return;

  function step() {
    const img = scroller.querySelector("img");
    return img ? img.getBoundingClientRect().width : scroller.clientWidth;
  }

  prevBtn?.addEventListener("click", () => scroller.scrollBy({ left: -step(), behavior: "smooth" }));
  nextBtn?.addEventListener("click", () => scroller.scrollBy({ left: step(), behavior: "smooth" }));
});
