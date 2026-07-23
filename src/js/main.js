// Перетаскивание каруселей мышью (touch и так работает нативно через overflow-x: auto)
document.querySelectorAll(".drag-scroll").forEach((el) => {
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let moved = false;

  el.addEventListener("mousedown", (e) => {
    isDown = true;
    moved = false;
    startX = e.pageX;
    scrollStart = el.scrollLeft;
    el.classList.add("dragging");
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    el.classList.remove("dragging");
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 3) moved = true;
    el.scrollLeft = scrollStart - dx;
  });

  // Не даём клику по ссылке/кнопке сработать, если это было перетаскивание
  el.addEventListener(
    "click",
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );
});

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
