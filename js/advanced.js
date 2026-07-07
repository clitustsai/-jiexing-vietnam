// ==============================================
// LOADING SCREEN
// ==============================================
function initLoadingScreen() {
  const screen = document.getElementById('loadingScreen');
  if (!screen) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      screen.classList.add('hidden');
    }, 1800);
  });
  // Fallback: hide after 3s even if load event doesn't fire
  setTimeout(() => screen.classList.add('hidden'), 3000);
}

// ==============================================
// SCROLL PROGRESS BAR
// ==============================================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ==============================================
// CUSTOM CURSOR
// ==============================================
function initCustomCursor() {
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  let cx = 0, cy = 0, dx = 0, dy = 0;

  document.addEventListener('mousemove', (e) => {
    dx = e.clientX;
    dy = e.clientY;
    document.body.classList.add('cursor-ready');
    cursorDot.style.left = dx + 'px';
    cursorDot.style.top  = dy + 'px';
  });

  // Smooth follow for outer ring
  function follow() {
    cx += (dx - cx) * 0.12;
    cy += (dy - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(follow);
  }
  requestAnimationFrame(follow);

  // Hover effect on interactive elements
  document.querySelectorAll('a, button, .product-card, .subpage-card, .t-prev, .t-next').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
}

// ==============================================
// SCROLL ANIMATION (AOS - Animate On Scroll)
// ==============================================
function initScrollAnimation() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
}

// ==============================================
// AUTO-PLAY VIDEO ON SCROLL
// ==============================================
function initVideoAutoplay() {
  const videos = document.querySelectorAll('video[data-autoplay]');
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.5 });
  videos.forEach(video => videoObserver.observe(video));
}

// ==============================================
// PRODUCT SEARCH (Instant Search)
// ==============================================
function initProductSearch() {
  const searchInput = document.getElementById('productSearch');
  if (!searchInput) return;
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
      const text = product.textContent.toLowerCase();
      product.style.display = text.includes(query) ? '' : 'none';
      if (text.includes(query)) product.style.animation = 'fadeIn 0.3s ease';
    });
  });
}

// ==============================================
// IMAGE ZOOM
// ==============================================
function initImageZoom() {
  const images = document.querySelectorAll('.zoomable');
  let modal = document.getElementById('imageZoomModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'imageZoomModal';
    modal.className = 'image-zoom-modal';
    modal.innerHTML = '<img id="zoomedImage" src="" alt="Xem ảnh"/>';
    document.body.appendChild(modal);
    modal.addEventListener('click', () => modal.classList.remove('active'));
  }
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      document.getElementById('zoomedImage').src = img.src;
      modal.classList.add('active');
    });
  });
}

// ==============================================
// SOCIAL SHARE
// ==============================================
function shareToSocial(platform) {
  const url   = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    zalo:     `https://zalo.me/share?url=${url}`,
    email:    `mailto:?subject=${title}&body=${url}`
  };
  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
}

// ==============================================
// TESTIMONIALS SLIDER
// ==============================================
let testimonialIndex = 0;
let testimonialTimer = null;
let totalTestimonials = 0;

function initTestimonialsSlider() {
  const track  = document.getElementById('testimonialTrack');
  const dotsEl = document.getElementById('testimonialDots');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  totalTestimonials = slides.length;
  if (totalTestimonials === 0) return;

  // Build dots
  if (dotsEl) {
    dotsEl.innerHTML = '';
    for (let i = 0; i < totalTestimonials; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => goTestimonial(i));
      dotsEl.appendChild(dot);
    }
  }

  startTestimonialAuto();
}

function goTestimonial(idx) {
  const track  = document.getElementById('testimonialTrack');
  const dotsEl = document.getElementById('testimonialDots');
  if (!track) return;

  testimonialIndex = (idx + totalTestimonials) % totalTestimonials;
  track.style.transform = `translateX(-${testimonialIndex * 100}%)`;

  if (dotsEl) {
    dotsEl.querySelectorAll('.testimonial-dot').forEach((d, i) => {
      d.classList.toggle('active', i === testimonialIndex);
    });
  }
}

function testimonialNext() {
  goTestimonial(testimonialIndex + 1);
  restartTestimonialAuto();
}

function testimonialPrev() {
  goTestimonial(testimonialIndex - 1);
  restartTestimonialAuto();
}

function startTestimonialAuto() {
  testimonialTimer = setInterval(() => goTestimonial(testimonialIndex + 1), 5000);
}

function restartTestimonialAuto() {
  clearInterval(testimonialTimer);
  startTestimonialAuto();
}

// ==============================================
// DARK MODE TOGGLE
// ==============================================
function initDarkMode() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ==============================================
// PRODUCT FILTER BY CATEGORY
// ==============================================
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.category-filter');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.category;
      const products = document.querySelectorAll('.product-card');
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      products.forEach(product => {
        const show = category === 'all' || product.dataset.category === category;
        product.style.display = show ? '' : 'none';
        if (show) product.style.animation = 'fadeIn 0.4s ease';
      });
    });
  });
}

// ==============================================
// SMOOTH SCROLL
// ==============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ==============================================
// LAZY LOAD IMAGES
// ==============================================
function initLazyLoad() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) return; // native support
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  images.forEach(img => imageObserver.observe(img));
}

// ==============================================
// COUNTER ANIMATION (cho stats bar)
// ==============================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-item strong');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        const text  = entry.target.textContent;
        const num   = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        let current = 0;
        const step  = Math.ceil(num / 40);
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          entry.target.textContent = current + suffix;
          if (current >= num) clearInterval(timer);
        }, 40);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ==============================================
// AUTO-ROTATING BANNER
// ==============================================
let bannerIndex = 0;
function initAutoBanner() {
  const banners = document.querySelectorAll('.auto-banner');
  if (banners.length === 0) return;
  function showBanner(index) {
    banners.forEach(banner => banner.classList.remove('active'));
    banners[index].classList.add('active');
  }
  showBanner(0);
  setInterval(() => {
    bannerIndex = (bannerIndex + 1) % banners.length;
    showBanner(bannerIndex);
  }, 6000);
}

// ==============================================
// INIT ALL ON PAGE LOAD
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
  initLoadingScreen();
  initScrollProgress();
  initCustomCursor();
  initScrollAnimation();
  initVideoAutoplay();
  initProductSearch();
  initImageZoom();
  initDarkMode();
  initCategoryFilter();
  initAutoBanner();
  initSmoothScroll();
  initLazyLoad();
  initCounters();
  initTestimonialsSlider();
  console.log('✅ JIE XING — All features loaded!');
});

// Export for HTML onclick
window.shareToSocial     = shareToSocial;
window.testimonialNext   = testimonialNext;
window.testimonialPrev   = testimonialPrev;
window.goTestimonial     = goTestimonial;
