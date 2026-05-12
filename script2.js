const projects = document.querySelectorAll(".project");
const modal = document.getElementById("video-modal");

/* ---------- AUTOPLAY PREVIEWS ---------- */

const previews = document.querySelectorAll(".preview");

const previewObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      const video = entry.target;

      if (entry.isIntersecting) {

        video.play().catch(() => {});

      } else {

        video.pause();

      }

    });

  },
  {
    threshold: 0.3
  }
);

previews.forEach(video => {
  previewObserver.observe(video);
});

/* ---------- MODAL ---------- */

function closeModal() {

  modal.classList.remove("active");

  modal.innerHTML = "";

}

projects.forEach(project => {

  project.addEventListener("click", () => {

    const youtubeId = project.dataset.youtubeId;

    modal.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;

    modal.classList.add("active");

  });

});

/* CLOSE */

modal.addEventListener("click", closeModal);

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeModal();

  }

});

/* ---------- REVEAL ---------- */

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      entry.target.classList.add("reveal-active");

      revealObserver.unobserve(entry.target);

    });

  },
  {
    threshold: 0.15
  }
);

reveals.forEach(element => {
  revealObserver.observe(element);
});