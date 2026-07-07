// ==============================================
// NAVBAR SCROLL & MOBILE TOGGLE
// ==============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Set top of fixed menu to bottom of sticky wrapper
    if (navMenu.classList.contains('active')) {
      const wrapper = navbar.parentElement;
      const rect = wrapper.getBoundingClientRect();
      navMenu.style.top = rect.bottom + 'px';
    }
  });
}

// ==============================================
// HERO SLIDER
// ==============================================
let heroIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dots .dot');

function goSlide(n) {
  heroIndex = n;
  updateHeroSlider();
}

function nextSlide() {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  updateHeroSlider();
}

function updateHeroSlider() {
  heroSlides.forEach((s, i) => {
    s.classList.toggle('active', i === heroIndex);
  });
  if (heroDots.length) {
    heroDots.forEach((d, i) => {
      d.classList.toggle('active', i === heroIndex);
    });
  }
}

if (heroSlides.length > 0) {
  setInterval(nextSlide, 5000);
}

// ==============================================
// BACK TO TOP
// ==============================================
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backTop.classList.add('show');
    } else {
      backTop.classList.remove('show');
    }
  });
  backTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
