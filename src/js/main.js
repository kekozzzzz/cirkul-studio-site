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
