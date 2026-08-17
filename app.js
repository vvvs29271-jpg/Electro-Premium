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
  var header = document.getElementById('header');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    var links = navMenu.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
      });
    });
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

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);

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
  var typeInterval = 160;
  var deleteInterval = 80;
  var holdDuration = 2500;
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

// ===== 8. Animated Background Particles =====
function initBgParticles() {
  var particles = document.querySelectorAll('.bg-particle');
  if (particles.length === 0) return;

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
