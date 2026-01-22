const videoBoxes = document.querySelectorAll('.video-box');
const previews = document.querySelectorAll('.preview');
const modal = document.getElementById('video-modal');

/* ---------- LAZY LOAD + AUTOPLAY PREVIEWS ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      const src = video.dataset.src;

      if (src && !video.src) {
        video.src = src;
        video.load();
        video.play().catch(() => {});
      }

      observer.unobserve(video);
    }
  });
}, {
  rootMargin: '200px'
});

previews.forEach(video => observer.observe(video));

/* ---------- VIDEO MODAL ---------- */
function closeModal() {
  modal.classList.remove('active');
  modal.innerHTML = '';
}

videoBoxes.forEach(box => {
  box.addEventListener('click', () => {
    const vimeoId = box.dataset.vimeoId;

    modal.innerHTML = `
      <iframe
        src="https://player.vimeo.com/video/${vimeoId}?autoplay=1"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
      ></iframe>
    `;

    modal.classList.add('active');
  });
});

/* Click outside video closes */
modal.addEventListener('click', closeModal);

/* ESC key closes */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

/* ---------- SCROLL REVEAL ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  reveals.forEach(el => observer.observe(el));
});

const videomodal = document.getElementById("video-modal");
const videocontainer = document.getElementById("video-container");

document.querySelectorAll(".project").forEach(project => {
  project.addEventListener("click", () => {
    const type = project.dataset.type;
    const src = project.dataset.src;

    container.innerHTML = "";

    if (type === "mp4") {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      container.appendChild(video);
    }

    if (type === "youtube") {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${src}?rel=0&modestbranding=1`;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      container.appendChild(iframe);
    }

    videomodal.classList.add("active");
  });
});

// Close modal
videomodal.addEventListener("click", (e) => {
  if (e.target === videomodal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  videomodal.classList.remove("active");
  container.innerHTML = "";
}