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
    const isOpen = navMenu.classList.contains('active');
    // Chỉ đổi icon khi đang ở mobile (toggle hiển thị)
    if (window.innerWidth <= 768) {
      navToggle.innerHTML = isOpen
        ? '<i class="fas fa-bars"></i>'
        : '<i class="fas fa-bars"></i>';
    }
  });

  // Đóng menu khi bấm vào link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Thêm nút X lớn bên trong menu nếu chưa có
  if (!document.getElementById('menuCloseBtn')) {
    const closeBtn = document.createElement('button');
    closeBtn.id = 'menuCloseBtn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.setAttribute('aria-label', 'Đóng menu');
    navMenu.insertBefore(closeBtn, navMenu.firstChild);
    closeBtn.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  }
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
