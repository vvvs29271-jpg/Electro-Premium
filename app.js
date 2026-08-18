/* ============================================
   ELECTRO PREMIUM - Interactive JavaScript v4
   ============================================ */

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function () {
  hidePreloader();
  initHeader();
  initNavActiveState();
  initBackToTop();
  initLightbox();
  initCounters();
  initBgParticles();
  initTypewriter();
  initHeroGlow();
  initScrollProgress();
  initRevealAnimations();
});

// ===== 1. Preloader =====
function hidePreloader() {
  var preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(function () {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 800);
  }
}

// ===== 2. Header (Mobile Menu + Scroll Shadow) =====
function initHeader() {
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var navClose = document.getElementById('navClose');
  var header = document.getElementById('header');

  var toggleIcon = navToggle ? navToggle.querySelector('i') : null;

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isActive = navMenu.classList.toggle('active');
      if (toggleIcon) {
        toggleIcon.classList.toggle('fa-bars', !isActive);
        toggleIcon.classList.toggle('fa-x', isActive);
      }
      navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close menu when clicking a link
    var links = navMenu.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        if (toggleIcon) {
          toggleIcon.classList.remove('fa-x');
          toggleIcon.classList.add('fa-bars');
        }
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close button inside mobile nav
    if (navClose) {
      navClose.addEventListener('click', function () {
        navMenu.classList.remove('active');
        if (toggleIcon) {
          toggleIcon.classList.remove('fa-x');
          toggleIcon.classList.add('fa-bars');
        }
        navToggle.setAttribute('aria-expanded', 'false');
      });
      navClose.addEventListener('touchstart', function (e) {
        e.preventDefault();
        navMenu.classList.remove('active');
        if (toggleIcon) {
          toggleIcon.classList.remove('fa-x');
          toggleIcon.classList.add('fa-bars');
        }
        navToggle.setAttribute('aria-expanded', 'false');
      }, { passive: false });
    }
  }

  // Scroll shadow
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// ===== 3. Active Nav Link on Scroll =====
function initNavActiveState() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.header__link');

  if (navLinks.length === 0) return;

  function setActiveLink() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollPos = scrollTop + 120;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        var currentLink = document.querySelector('.header__link[href="#' + sectionId + '"]');
        if (currentLink) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
          });
          currentLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
}

// ===== 4. Back to Top Button =====
function initBackToTop() {
  var backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== 5. Lightbox Gallery =====
function initLightbox() {
  var overlay = document.getElementById('lightboxOverlay');
  var img = document.getElementById('lightboxImg');
  var closeBtn = document.getElementById('lightboxClose');

  if (!overlay || !img || !closeBtn) return;

  var projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(function (card) {
    var imgEl = card.querySelector('img');
    if (imgEl) {
      card.addEventListener('click', function () {
        img.src = imgEl.src;
        img.alt = imgEl.getAttribute('alt') || '';
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  function closeLightbox() {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Close on overlay click (desktop) and touch (mobile)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });
  overlay.addEventListener('touchstart', function (e) {
    if (e.target === overlay) closeLightbox();
  }, { passive: true });

  // Close button should respond to both click and touchstart for old Android webviews
  closeBtn.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('touchstart', function (e) {
    e.preventDefault();
    closeLightbox();
  }, { passive: false });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      closeLightbox();
    }
  });
}

// ===== 6. Counter Animation =====
function initCounters() {
  var counters = document.querySelectorAll('.counter[data-target]');
  if (counters.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach(function (counter) {
      var target = parseFloat(counter.getAttribute('data-target'));
      var prefix = counter.getAttribute('data-prefix') || '';
      var suffix = counter.getAttribute('data-suffix') || '';
      counter.textContent = prefix + Math.floor(target) + suffix;
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var counter = entry.target;
        var target = parseFloat(counter.getAttribute('data-target'));
        var prefix = counter.getAttribute('data-prefix') || '';
        var suffix = counter.getAttribute('data-suffix') || '';
        var duration = 2000;
        var start = 0;
        var increment = target / (duration / 50);

        var timer = setInterval(function () {
          start += increment;
          if (start > target) {
            start = target;
            clearInterval(timer);
          }
          counter.textContent = prefix + Math.floor(start) + suffix;
        }, 50);

        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

// ===== 7. Typewriter Effect =====
function initTypewriter() {
  var typedEl = document.getElementById('typedWord');
  if (!typedEl) return;

  var words = ['Profesionale', 'Efikase', 'Eksperte', 'Moderne', 'Premium'];
  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var lastTime = 0;
  var typeInterval = 120;
  var deleteInterval = 60;
  var holdDuration = 1800;
  var holdStart = 0;
  var isHolding = false;

  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    var delta = timestamp - lastTime;

    var currentWord = words[wordIndex];

    if (isHolding) {
      if (timestamp - holdStart >= holdDuration) {
        isHolding = false;
        isDeleting = true;
        lastTime = timestamp;
      }
    } else if (isDeleting) {
      if (delta >= deleteInterval) {
        charIndex = Math.max(0, charIndex - 1);
        typedEl.textContent = currentWord.substring(0, charIndex);
        lastTime = timestamp;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          isHolding = false;
        }
      }
    } else {
      if (delta >= typeInterval) {
        charIndex = Math.min(currentWord.length, charIndex + 1);
        typedEl.textContent = currentWord.substring(0, charIndex);
        lastTime = timestamp;
        if (charIndex === currentWord.length) {
          isHolding = true;
          holdStart = timestamp;
        }
      }
    }

    requestAnimationFrame(animate);
  }

  setTimeout(function () {
    requestAnimationFrame(animate);
  }, 1500);
}

// ===== 8. Scroll Progress Bar =====
function initScrollProgress() {
  var progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = Math.min(Math.max(scrollPercent, 0), 100) + '%';
  });
}

// ===== 9. Scroll Reveal Animations =====
function initRevealAnimations() {
  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
}

// ===== 10. Hero Mouse Glow =====
function initHeroGlow() {
  var hero = document.querySelector('.hero');
  var glow = document.getElementById('heroGlow');
  if (!hero || !glow) return;

  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
  });

  hero.addEventListener('mouseleave', function () {
    glow.style.opacity = '0';
  });

  hero.addEventListener('mouseenter', function () {
    glow.style.opacity = '1';
  });
}

// ===== 11. Animated Background Particles =====
function initBgParticles() {
  var particles = document.querySelectorAll('.bg-particle');
  if (particles.length === 0) return;

  // Disable/skip heavy decorative particles on small screens to improve performance
  if (window.innerWidth < 768) {
    particles.forEach(function(p) { p.style.display = 'none'; });
    return;
  }

  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var cols = Math.ceil(screenWidth / 250);
  var rows = Math.ceil(screenHeight / 250);

  particles.forEach(function (particle, index) {
    var col = index % cols;
    var row = Math.floor(index / cols);
    var x = col * (screenWidth / cols) + Math.random() * (screenWidth / cols);
    var y = row * (screenHeight / rows) + Math.random() * (screenHeight / rows);
    var delay = Math.random() * 2;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.animationDelay = delay + 's';
    particle.style.opacity = (0.3 + Math.random() * 0.4).toString();
  });
}

// ===== Window Resize Handler =====
window.addEventListener('resize', function () {
  initBgParticles();
});
