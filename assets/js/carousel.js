// carousel.js — carrossel de depoimentos via Splide.js

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('#splide-depoimentos');
  if (!el || typeof Splide === 'undefined') return;

  new Splide('#splide-depoimentos', {
    type: 'loop',
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    arrows: false,
    pagination: true,
    gap: '1.5rem',
    perPage: 1,
    breakpoints: {
      768: { perPage: 1 },
      1024: { perPage: 2 }
    }
  }).mount();
});
