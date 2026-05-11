// ============================================
// ASV Hamm Tennis — Interaction Script
// ============================================

// Sticky nav background switch
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (!nav) return;
  if (window.scrollY > 40) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Lightbox for galleries
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach(el => {
  el.addEventListener('click', () => {
    const src = el.getAttribute('data-lightbox') || el.querySelector('img')?.src;
    if (!src || !lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});
lightbox?.addEventListener('click', () => {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
});

// News modal — full-text reading for bento cards
const newsModal = document.querySelector('.news-modal');
const newsPanel = newsModal?.querySelector('.news-modal__panel');
const newsCloseTemplate = newsPanel?.querySelector('.news-modal__close');

const closeNewsModal = () => {
  if (!newsModal) return;
  newsModal.classList.remove('is-open');
  document.body.style.overflow = '';
};

const openNewsModal = (id) => {
  if (!newsModal || !newsPanel || !id) return;
  const tpl = document.getElementById(`news-${id}`);
  if (!tpl) return;
  newsPanel.innerHTML = '';
  if (newsCloseTemplate) newsPanel.appendChild(newsCloseTemplate.cloneNode(true));
  newsPanel.appendChild(tpl.content.cloneNode(true));
  newsPanel.querySelector('.news-modal__close')?.addEventListener('click', closeNewsModal);
  newsModal.classList.add('is-open');
  newsModal.scrollTop = 0;
  document.body.style.overflow = 'hidden';
};

document.querySelectorAll('[data-news]').forEach(card => {
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  const handle = (e) => {
    if (e.target.closest('a')) return;
    openNewsModal(card.getAttribute('data-news'));
  };
  card.addEventListener('click', handle);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handle(e); }
  });
});

newsModal?.addEventListener('click', (e) => {
  if (e.target === newsModal) closeNewsModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && newsModal?.classList.contains('is-open')) closeNewsModal();
});

// Horizontal gallery scroll buttons
document.querySelectorAll('.gallery-wrap').forEach(wrap => {
  const track = wrap.querySelector('[data-gallery]');
  const prev = wrap.querySelector('[data-gallery-prev]');
  const next = wrap.querySelector('[data-gallery-next]');
  if (!track || !prev || !next) return;

  const step = () => {
    const item = track.querySelector('.gallery__item');
    if (!item) return 320;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 16;
    return item.getBoundingClientRect().width + gap;
  };

  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= max;
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -step() * 1.5, behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step() * 1.5, behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
