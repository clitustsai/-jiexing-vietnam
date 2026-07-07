// ==============================================
// SCROLL ANIMATION (AOS - Animate On Scroll)
// ==============================================
function initScrollAnimation() {
  const elements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1 });

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
      if (text.includes(query)) {
        product.style.display = '';
        product.style.animation = 'fadeIn 0.3s ease';
      } else {
        product.style.display = 'none';
      }
    });
  });
}

// ==============================================
// IMAGE ZOOM
// ==============================================
function initImageZoom() {
  const images = document.querySelectorAll('.zoomable');
  
  // Create modal if not exists
  let modal = document.getElementById('imageZoomModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'imageZoomModal';
    modal.className = 'image-zoom-modal';
    modal.innerHTML = '<img id="zoomedImage" src="" alt=""/>';
    document.body.appendChild(modal);

    modal.addEventListener('click', () => {
      modal.classList.remove('active');
    });
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
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    zalo: `https://zalo.me/share?url=${url}`,
    email: `mailto:?subject=${title}&body=${url}`
  };

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
}

// ==============================================
// TESTIMONIALS CAROUSEL
// ==============================================
let currentTestimonial = 0;
function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  if (slides.length === 0) return;

  function showTestimonial(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % slides.length;
    showTestimonial(currentTestimonial);
  }

  showTestimonial(0);
  setInterval(nextTestimonial, 5000); // Change every 5 seconds
}

// ==============================================
// DARK MODE TOGGLE
// ==============================================
function initDarkMode() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  // Check saved preference
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

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter products
      products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
          product.style.display = '';
          product.style.animation = 'fadeIn 0.4s ease';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
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

  function nextBanner() {
    bannerIndex = (bannerIndex + 1) % banners.length;
    showBanner(bannerIndex);
  }

  showBanner(0);
  setInterval(nextBanner, 6000); // Change every 6 seconds
}

// ==============================================
// SMOOTH SCROLL
// ==============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ==============================================
// INIT ALL ON PAGE LOAD
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimation();
  initVideoAutoplay();
  initProductSearch();
  initImageZoom();
  initTestimonials();
  initDarkMode();
  initCategoryFilter();
  initAutoBanner();
  initSmoothScroll();
  initLazyLoad();

  console.log('✅ Advanced features loaded successfully!');
});

// Export functions for external use
window.shareToSocial = shareToSocial;
