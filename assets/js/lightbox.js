// lightbox.js — inicializa GLightbox para galeria e diplomas

document.addEventListener('DOMContentLoaded', () => {
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      zoomable: true,
      openEffect: 'fade',
      closeEffect: 'fade',
      cssEfects: {
        fade: { in: 'fadeIn', out: 'fadeOut' }
      }
    });
  }
});
