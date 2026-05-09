/* ============================================================
   Cozy Threads — Main JavaScript (main.js)
   Core features: dark mode, navbar, toast, scroll, animations
   ============================================================ */

/* ============================================================
   1. DARK MODE TOGGLE
   ============================================================ */
function initDarkMode() {
  const saved = localStorage.getItem('ct_theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcons(true);
  }

  // FAB toggle
  const fab = document.getElementById('darkModeFab');
  if (fab) {
    fab.addEventListener('click', toggleDarkMode);
    fab.title = document.body.classList.contains('dark-mode')
      ? 'Switch to light mode' : 'Switch to dark mode';
  }

  // Navbar toggle
  const navToggle = document.getElementById('navThemeToggle');
  if (navToggle) navToggle.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('ct_theme', isDark ? 'dark' : 'light');
  updateThemeIcons(isDark);
  const fab = document.getElementById('darkModeFab');
  if (fab) fab.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

function updateThemeIcons(isDark) {
  const fabIcon = document.querySelector('#darkModeFab i');
  const navIcon = document.querySelector('#navThemeToggle i');
  const icon    = isDark ? 'fa-sun' : 'fa-moon';
  const remove  = isDark ? 'fa-moon' : 'fa-sun';
  [fabIcon, navIcon].forEach(el => {
    if (!el) return;
    el.classList.remove('fa-sun', 'fa-moon');
    el.classList.add(icon);
  });
}

/* ============================================================
   2. NAVBAR — scroll shrink & active link
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  // Scroll shrink
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    const backTop = document.getElementById('backToTop');
    if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  // Highlight active nav link
  const links = document.querySelectorAll('.nav-link[href]');
  const page  = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href').split('?')[0];
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ============================================================
   3. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   4. TOAST NOTIFICATIONS
   ============================================================ */
function showToast(title, message = '', type = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const iconMap = {
    success: { icon: 'fa-check-circle', cls: 'toast-success' },
    error:   { icon: 'fa-exclamation-circle', cls: 'toast-error' },
    info:    { icon: 'fa-info-circle',     cls: 'toast-info' },
    '':      { icon: 'fa-shopping-bag',    cls: '' }
  };
  const { icon, cls } = iconMap[type] || iconMap[''];

  const toast = document.createElement('div');
  toast.className = `toast-custom ${cls}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas ${icon}"></i>
    </div>
    <div class="toast-body-text">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button onclick="this.parentElement.remove()" 
            style="background:none;border:none;color:var(--text-light);cursor:pointer;padding:0 0 0 0.5rem;font-size:0.9rem;"
            aria-label="Close notification">
      <i class="fas fa-times"></i>
    </button>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ============================================================
   5. SMOOTH SCROLL ANIMATIONS (IntersectionObserver)
   ============================================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.fade-up:not(.visible), .scale-in:not(.visible)'
  );
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   6. SKILL/PROGRESS BARS ANIMATION
   ============================================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.width || '0%';
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
}

/* ============================================================
   7. HERO COUNTER ANIMATION
   ============================================================ */
function animateCounter(el, target, duration = 1800) {
  const start    = 0;
  const startTs  = performance.now();
  const step     = (ts) => {
    const progress = Math.min((ts - startTs) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() +
                     (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el  = entry.target;
          const val = parseInt(el.dataset.counter, 10);
          animateCounter(el, val);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* ============================================================
   8. NEWSLETTER FORM
   ============================================================ */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input   = form.querySelector('input[type="email"]');
    const btn     = form.querySelector('button[type="submit"]');
    const email   = input ? input.value.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Invalid email', 'Please enter a valid email address.', 'error');
      if (input) {
        input.style.borderColor = '#e74c3c';
        input.focus();
      }
      return;
    }

    // Simulate subscribe
    if (btn) {
      btn.disabled  = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Subscribing…';
    }

    setTimeout(() => {
      if (btn) {
        btn.disabled  = false;
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #c8d9bc, #a8b89a)';
      }
      if (input) input.value = '';
      showToast('Subscribed! 🎉', 'Welcome to the Cozy Threads family!', 'success');

      setTimeout(() => {
        if (btn) {
          btn.innerHTML      = '<i class="fas fa-paper-plane me-2"></i>Subscribe';
          btn.style.background = '';
          btn.disabled       = false;
        }
      }, 4000);
    }, 1400);
  });
}

/* ============================================================
   9. SEARCH — products page
   ============================================================ */
function initSearchBar() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setSearch(e.target.value);
    }, 350);
  });

  // Clear button
  const clearBtn = document.getElementById('searchClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      setSearch('');
      searchInput.focus();
    });

    searchInput.addEventListener('input', () => {
      clearBtn.style.display = searchInput.value ? 'flex' : 'none';
    });
  }
}

/* ============================================================
   10. CATEGORY FILTER BUTTONS — products page
   ============================================================ */
function initFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setCategory(btn.dataset.cat);
    });
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => setSort(e.target.value));
  }

  // Check session storage for pre-selected category (from home page)
  const preselect = sessionStorage.getItem('filterCat');
  if (preselect) {
    setCategory(preselect);
    sessionStorage.removeItem('filterCat');
    // Update buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === preselect);
    });
  }
}

/* ============================================================
   11. HOME PAGE CAROUSEL (Bootstrap)
   ============================================================ */
function initCarousel() {
  const carouselEl = document.getElementById('heroCarousel');
  if (!carouselEl) return;
  // Bootstrap handles it, just add custom timing
  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, {
    interval: 5000,
    touch:    true
  });
}

/* ============================================================
   12. HERO PARALLAX (subtle)
   ============================================================ */
function initParallax() {
  const heroBlobs = document.querySelectorAll('.hero-blob');
  if (!heroBlobs.length) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    heroBlobs.forEach((blob, i) => {
      const factor = (i + 1) * 8;
      blob.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });
}

/* ============================================================
   13. FLOATING YARN DECORATIONS (home hero)
   ============================================================ */
function createYarnDecorations() {
  const container = document.querySelector('.hero-bg-decoration');
  if (!container) return;

  const symbols = ['🧶', '✿', '❀', '◌', '⟡', '✦', '❋'];
  const existing = container.querySelectorAll('.yarn-deco');
  if (existing.length) return; // already created

  for (let i = 0; i < 6; i++) {
    const el = document.createElement('span');
    el.className = 'yarn-deco';
    el.textContent = symbols[i % symbols.length];
    container.appendChild(el);
  }
}

/* ============================================================
   14. TESTIMONIALS CAROUSEL (auto-scroll)
   ============================================================ */
function initTestimonialsCarousel() {
  const tc = document.getElementById('testimonialsCarousel');
  if (!tc) return;
  bootstrap.Carousel.getOrCreateInstance(tc, { interval: 6000, touch: true });
}

/* ============================================================
   15. IMAGE LAZY LOAD FALLBACK
   ============================================================ */
function initImageFallbacks() {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('error', () => {
      img.src = `https://placehold.co/600x600/f2e9d8/8b6f5e?text=${encodeURIComponent(img.alt || 'Cozy Threads')}`;
    });
  });
}

/* ============================================================
   16. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile navbar if open
        const collapse = document.querySelector('.navbar-collapse');
        if (collapse && collapse.classList.contains('show')) {
          bootstrap.Collapse.getInstance(collapse)?.hide();
        }
      }
    });
  });
}

/* ============================================================
   17. PAGE LOADING SCREEN
   ============================================================ */
function hideLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  loader.style.opacity   = '0';
  loader.style.pointerEvents = 'none';
  setTimeout(() => { loader.style.display = 'none'; }, 500);
}

/* ============================================================
   18. ABOUT PAGE — SKILL BARS with data
   ============================================================ */
function renderSkillBars() {
  const container = document.getElementById('skillBarsWrap');
  if (!container) return;

  const skills = [
    { label: 'Handmade Quality',    pct: 98, color: 'var(--gradient-pink)' },
    { label: 'Customer Satisfaction', pct: 96, color: 'var(--gradient-sage)' },
    { label: 'Sustainable Sourcing', pct: 90, color: 'var(--gradient-lavender)' },
    { label: 'Artisan Craftsmanship',pct: 100, color: 'var(--gradient-brown)' }
  ];

  container.innerHTML = skills.map(s => `
    <div class="skill-bar-wrap fade-up">
      <div class="skill-bar-header">
        <span>${s.label}</span>
        <span>${s.pct}%</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" 
             data-width="${s.pct}%"
             style="background: ${s.color};">
        </div>
      </div>
    </div>`).join('');

  initScrollAnimations();
  initSkillBars();
}

/* ============================================================
   DOM READY — INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Universal inits
  initDarkMode();
  initNavbar();
  initBackToTop();
  initScrollAnimations();
  initCounters();
  initNewsletter();
  initSmoothScroll();
  initImageFallbacks();
  hideLoader();

  // Home page
  if (document.getElementById('featuredProductsGrid')) {
    renderFeaturedProducts();
    renderCategories();
    createYarnDecorations();
    initCarousel();
    initParallax();
    initTestimonialsCarousel();
  }

  // Shop page
  if (document.getElementById('shopProductsGrid')) {
    renderShopProducts();
    initSearchBar();
    initFilterButtons();
  }

  // About page
  if (document.getElementById('skillBarsWrap')) {
    renderSkillBars();
  }

  // Cart page
  updateCartBadge();
});

/* ============================================================
   UTILITY — expose to global for inline handlers
   ============================================================ */
window.showToast           = showToast;
window.toggleDarkMode      = toggleDarkMode;
window.addToCartById       = addToCartById;
window.openQuickView       = openQuickView;
window.toggleWishlist      = toggleWishlist;
window.setCategory         = setCategory;
window.setSearch           = setSearch;
window.setSort             = setSort;
window.resetFilters        = resetFilters;
window.changeQty           = changeQty;
window.removeCartItem      = removeCartItem;
window.clearCart           = clearCart;
window.applyPromoCode      = applyPromoCode;
