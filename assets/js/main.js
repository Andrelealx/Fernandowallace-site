/* =========================================================
   MAIN.JS — Fernando Wallace · Core Behaviors
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initScrollBehavior();
  initNavbar();
  initHeroReveal();
  initRevealObserver();
  initActiveNavLink();
  initMobileMenu();
  initVideoModal();
});

/* -----------------------------------------------------------
   Hero Reveal: marca .visible imediatamente para elementos
   above-the-fold (IntersectionObserver pode não disparar)
   ----------------------------------------------------------- */
function initHeroReveal() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const heroReveals = heroSection.querySelectorAll('.reveal');
  heroReveals.forEach((el, index) => {
    // Respeita transition-delay inline já definido no HTML
    // mas garante que a classe .visible é aplicada após um tick
    // para que a transição CSS seja visível
    const delay = el.style.transitionDelay
      ? parseFloat(el.style.transitionDelay) * 1000
      : index * 80;

    setTimeout(() => {
      el.classList.add('visible');
    }, delay + 50);
  });
}

/* -----------------------------------------------------------
   Smooth scroll em âncoras internas
   ----------------------------------------------------------- */
function initScrollBehavior() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
        10
      ) || 72;

      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

/* -----------------------------------------------------------
   Navbar: .scrolled via IntersectionObserver no hero
   Quando o hero sai do viewport → navbar fica navy sólido
   Isso garante legibilidade sobre QUALQUER seção clara
   ----------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hero   = document.getElementById('hero');
  if (!navbar) return;

  if (hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // hero não visível = estamos em seção clara = navbar navy sólido
        navbar.classList.toggle('scrolled', !entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(hero);
  } else {
    // fallback sem hero
    navbar.classList.add('scrolled');
  }
}

/* -----------------------------------------------------------
   Reveal Observer: fade-in com IntersectionObserver
   ----------------------------------------------------------- */
function initRevealObserver() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* -----------------------------------------------------------
   Active nav link highlight ao scroll por seções
   ----------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const navbarHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
    10
  ) || 72;

  function updateActiveLink() {
    const scrollPos = window.scrollY + navbarHeight + 60;

    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateActiveLink();
}

/* -----------------------------------------------------------
   Mobile Menu: hamburger + drawer lateral
   ----------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.getElementById('mobile-drawer');
  const overlay   = document.querySelector('.drawer-overlay');
  if (!hamburger || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    drawer.querySelector('a')?.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) closeDrawer(); else openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  // Close on drawer link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* -----------------------------------------------------------
   Video Modal
   ----------------------------------------------------------- */
function initVideoModal() {
  const videoModal = document.getElementById('video-modal');
  const videoEl    = document.getElementById('modal-video');
  const closeBtn   = document.querySelector('.video-modal-close');
  const triggers   = document.querySelectorAll('.video-trigger');

  if (!videoModal || !videoEl || !triggers.length) return;

  let lastTrigger = null;

  function openModal(src) {
    videoEl.src = src;
    videoModal.showModal ? videoModal.showModal() : videoModal.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    videoEl.play().catch(() => {});
    closeBtn?.focus();
  }

  function closeModal() {
    videoModal.close ? videoModal.close() : videoModal.removeAttribute('open');
    document.body.style.overflow = '';
    videoEl.pause();
    videoEl.src = '';
    lastTrigger?.focus();
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      lastTrigger = trigger;
      openModal(trigger.dataset.src);
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  videoModal.addEventListener('click', e => {
    if (e.target === videoModal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && (videoModal.open || videoModal.hasAttribute('open'))) {
      closeModal();
    }
  });
}
