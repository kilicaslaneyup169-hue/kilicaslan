const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Menüyü aç' : 'Menüyü kapat');
  primaryNav.classList.toggle('open', !isOpen);
});

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Menüyü aç');
    primaryNav.classList.remove('open');
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');
    lightboxImage.src = card.dataset.full || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = card.dataset.title;
    lightbox.showModal();
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('#quote-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    'Merhaba, Kılıçaslan İnşaat’tan teklif almak istiyorum.',
    '',
    `Ad soyad: ${data.get('name')}`,
    `Telefon: ${data.get('phone')}`,
    `Hizmet: ${data.get('service')}`,
    data.get('details') ? `Proje detayları: ${data.get('details')}` : ''
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/905424105744?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  document.querySelector('#form-hint').textContent = 'WhatsApp mesajınız hazır. Açılan pencereden mesajı kontrol edip gönderebilirsiniz.';
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Keep a neutral surface behind any remote image if the host is temporarily unavailable.
document.querySelectorAll('img').forEach((image) => {
  image.addEventListener('error', () => {
    image.dataset.failed = 'true';
    image.alt = image.alt || 'Mimari proje fotoğrafı';
  }, { once: true });
});
