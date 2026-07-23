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

// Карусель со стрелками (Услуги — залы): стрелки листают, скролл нативный на тач
document.querySelectorAll(".carousel-nav").forEach((nav) => {
  const scroller = nav.querySelector(".carousel-scroll");
  const prevBtn = nav.querySelector(".slider-arrow.prev");
  const nextBtn = nav.querySelector(".slider-arrow.next");
  if (!scroller) return;

  function step() {
    const card = scroller.querySelector(":scope > *");
    const cardWidth = card ? card.getBoundingClientRect().width + 24 : scroller.clientWidth * 0.8;
    return cardWidth;
  }

  prevBtn?.addEventListener("click", () => scroller.scrollBy({ left: -step(), behavior: "smooth" }));
  nextBtn?.addEventListener("click", () => scroller.scrollBy({ left: step(), behavior: "smooth" }));
});

// Лайтбокс — клик по фото галереи зала открывает его на весь экран
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Закрыть">×</button><img alt="">';
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector("img");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("open");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}

document.querySelectorAll(".gallery-slide img").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-close")) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
