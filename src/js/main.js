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

// Слайдер залов на Главной (стрелки + точки, без нативного скролла)
document.querySelectorAll(".halls-slider").forEach((slider) => {
  const track = slider.querySelector(".halls-slider-track");
  const slides = Array.from(track.children);
  const prevBtn = slider.querySelector(".slider-arrow.prev");
  const nextBtn = slider.querySelector(".slider-arrow.next");
  const dots = Array.from(slider.querySelectorAll(".slider-dot"));
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    update();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      update();
    });
  });

  update();
});
