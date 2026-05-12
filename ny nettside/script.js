/* ---------- LAZY LOAD PREVIEWS ---------- */
const previews = document.querySelectorAll(".preview");

const previewObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const video = entry.target;
    if (!video.src) {
      video.src = video.dataset.src;
      video.load();
      video.play().catch(() => {});
    }

    previewObserver.unobserve(video);
  });
}, { rootMargin: "200px" });

previews.forEach(v => previewObserver.observe(v));


/* ---------- MODAL ---------- */
const modal = document.getElementById("modal");
const modalVideo = modal.querySelector(".modal-video");
const closeBtn = modal.querySelector(".modal-close");
const backdrop = modal.querySelector(".modal-backdrop");

document.querySelectorAll(".video-box").forEach(box => {
  box.addEventListener("click", () => {
    const type = box.dataset.type;
    const id = box.dataset.id;

    let embed = "";

    if (type === "vimeo") {
      embed = `
        <iframe
          src="https://player.vimeo.com/video/${id}?autoplay=1"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen>
        </iframe>`;
    }

    if (type === "youtube") {
      embed = `
        <iframe
          src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen>
        </iframe>`;
    }

    modalVideo.innerHTML = embed;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.add("hidden");
  modalVideo.innerHTML = "";
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});


/* ---------- SCROLL REVEAL ---------- */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-active");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));
