/* ============================================================
   fotiosmpouris.com — Luminous Precision v3
   Class-based Motes + Cinematic GSAP + Typewriter
   ============================================================ */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- SCROLL PROGRESS BAR ---- */

  var progressBar = document.querySelector('.scroll-progress');

  if (progressBar) {
    window.addEventListener('scroll', function () {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) {
        progressBar.style.width = (window.scrollY / docH * 100) + '%';
      }
    }, { passive: true });
  }

  /* ---- HAMBURGER MENU ---- */

  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
      }
    });

    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  /* ---- TYPEWRITER ---- */

  var typewriterEl = document.getElementById('hero-typewriter');

  if (typewriterEl) {
    var phrases = [];
    try { phrases = JSON.parse(typewriterEl.dataset.rotate || '[]'); } catch (e) { /* */ }
    if (phrases.length === 0) phrases.push(typewriterEl.textContent.trim());

    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var pauseTime = 0;

    var caret = document.createElement('span');
    caret.className = 'caret';
    typewriterEl.textContent = '';
    typewriterEl.appendChild(caret);

    function typeStep() {
      var current = phrases[phraseIndex];
      var textNode = typewriterEl.firstChild;

      if (!isDeleting) {
        if (textNode && textNode.nodeType === 3) {
          textNode.textContent = current.substring(0, charIndex + 1);
        } else {
          typewriterEl.insertBefore(document.createTextNode(current.substring(0, charIndex + 1)), caret);
        }
        charIndex++;

        if (charIndex >= current.length) {
          isDeleting = true;
          pauseTime = 2400;
        } else {
          pauseTime = 50 + Math.random() * 35;
        }
      } else {
        if (textNode && textNode.nodeType === 3) {
          textNode.textContent = current.substring(0, charIndex - 1);
        }
        charIndex--;

        if (charIndex <= 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          pauseTime = 450;
        } else {
          pauseTime = 25;
        }
      }

      setTimeout(typeStep, pauseTime);
    }

    setTimeout(typeStep, 900);
  }

  /* ---- LUMINOUS MOTES (Class-based Particle System) ---- */

  function Mote(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  Mote.prototype.reset = function () {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.radius = Math.random() * 2.2 + 0.8;
    this.baseRadius = this.radius;
    this.opacity = Math.random() * 0.12 + 0.06;
    this.vy = -0.12 - Math.random() * 0.18;
    this.vx = (Math.random() - 0.5) * 0.15;
    this.hue = 38 + Math.random() * 8;
    this.targetOpacity = this.opacity;
    this.flareTimer = 0;
  };

  Mote.prototype.update = function (scrollDelta) {
    this.y += this.vy;
    this.x += this.vx + (scrollDelta * 0.008);

    if (this.y < -10) {
      this.y = this.canvas.height + 10;
      this.x = Math.random() * this.canvas.width;
    }
    if (this.x < 0 || this.x > this.canvas.width) {
      this.x = Math.random() * this.canvas.width;
    }

    this.flareTimer++;
    if (this.flareTimer > 280 && Math.random() < 0.008) {
      this.targetOpacity = 0.38;
      this.radius = this.baseRadius * 1.4;
      this.flareTimer = 0;
    }

    this.opacity = this.opacity * 0.96 + this.targetOpacity * 0.04;
    if (this.opacity < this.targetOpacity + 0.01) {
      this.targetOpacity = this.opacity * 0.7 + 0.05;
      this.radius = this.radius * 0.98 + this.baseRadius * 0.02;
    }
  };

  Mote.prototype.draw = function (ctx) {
    ctx.fillStyle = 'hsla(' + this.hue + ', 72%, 78%, ' + this.opacity + ')';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  var motesArray = [];
  var motesCtx, motesCanvas;
  var lastScrollY = 0;

  function initMotes() {
    motesCanvas = document.getElementById('motes');
    if (!motesCanvas) return;
    motesCtx = motesCanvas.getContext('2d', { alpha: true });
    resizeMotes();

    var count = Math.min(48, Math.max(20, Math.floor(window.innerWidth / 32)));
    for (var i = 0; i < count; i++) {
      motesArray.push(new Mote(motesCanvas));
    }

    window.addEventListener('resize', function () {
      resizeMotes();
    });

    if (!prefersReducedMotion) {
      animateMotes();
    }
  }

  function resizeMotes() {
    if (!motesCanvas) return;
    motesCanvas.width = window.innerWidth;
    motesCanvas.height = window.innerHeight;
  }

  function animateMotes() {
    motesCtx.clearRect(0, 0, motesCanvas.width, motesCanvas.height);
    var scrollY = window.scrollY;
    var parallax = scrollY - lastScrollY;
    lastScrollY = scrollY;

    for (var i = 0; i < motesArray.length; i++) {
      motesArray[i].update(parallax);
      motesArray[i].draw(motesCtx);
    }
    requestAnimationFrame(animateMotes);
  }

  /* ---- GSAP CINEMATIC SCROLL ANIMATIONS ---- */

  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      document.querySelectorAll('.gsap-reveal, .gsap-reveal-left, .gsap-reveal-right').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* Scene 2: Signal — text materializes, boundary follows */
    var signalText = document.querySelector('.signal-text');
    if (signalText) {
      gsap.fromTo(signalText,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: signalText, start: 'top 82%' }
        }
      );
    }

    var signalBoundary = document.querySelector('.signal-boundary');
    if (signalBoundary) {
      gsap.fromTo(signalBoundary,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: 0.4,
          scrollTrigger: { trigger: signalBoundary, start: 'top 85%' }
        }
      );
    }

    /* Scene 3: Evidence — each card triggers independently, staggered */
    var evidenceBlocks = document.querySelectorAll('.evidence-block');
    evidenceBlocks.forEach(function (block, i) {
      gsap.fromTo(block,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          duration: 0.95,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: block, start: 'top 70%' }
        }
      );
    });

    /* Scene 4: Method — panel then columns stagger left → right */
    var methodPanel = document.querySelector('.method-panel');
    if (methodPanel) {
      gsap.fromTo(methodPanel,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: methodPanel, start: 'top 75%' }
        }
      );
    }

    var methodCols = document.querySelectorAll('.method-col');
    methodCols.forEach(function (col, i) {
      gsap.fromTo(col,
        { opacity: 0, x: i === 0 ? -30 : 30 },
        {
          opacity: 1, x: 0,
          duration: 0.85,
          ease: 'power2.out',
          delay: 0.35 + i * 0.15,
          scrollTrigger: { trigger: methodPanel || col, start: 'top 75%' }
        }
      );
    });

    /* Scene 5: Door — email gets warm pulse on reveal */
    var doorEmail = document.querySelector('.door-email');
    if (doorEmail) {
      gsap.fromTo(doorEmail,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.door-section',
            start: 'top 72%',
            onEnter: function () {
              doorEmail.classList.add('revealed');
            }
          }
        }
      );
    }

    /* Generic gsap-reveal fallbacks for subpages */
    gsap.utils.toArray('.gsap-reveal').forEach(function (el) {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 80%' },
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.gsap-reveal-left').forEach(function (el) {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 80%' },
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.gsap-reveal-right').forEach(function (el) {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 80%' },
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    });

    /* Subtle background gradient shift between scenes */
    var bgWrapper = document.querySelector('.gradient-bg-wrap');
    if (bgWrapper) {
      gsap.fromTo(bgWrapper,
        { background: 'linear-gradient(135deg, #F0E6D8 0%, #E8EAF2 50%, #F5F0E8 100%)' },
        {
          background: 'linear-gradient(135deg, #EDE4DA 0%, #E2E5EE 50%, #EDE7DE 100%)',
          scrollTrigger: {
            trigger: '.evidence-section',
            start: 'top center',
            end: 'bottom center',
            scrub: 1.5
          }
        }
      );

      gsap.to(bgWrapper, {
        background: 'linear-gradient(135deg, #F0E6D8 0%, #E8EAF2 50%, #F5F0E8 100%)',
        scrollTrigger: {
          trigger: '.door-section',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1.5
        }
      });
    }
  }

  /* ---- SMOOTH SCROLL ---- */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- INIT ---- */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMotes();
      initGSAP();
    });
  } else {
    initMotes();
    initGSAP();
  }

})();
