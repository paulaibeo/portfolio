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
