/* ============================================================
   script.js — Cinematic scroll, typewriter, hamburger,
   scroll progress, atmosphere warmth coordination.
   atmosphere.js handles the Canvas environment separately.
   ============================================================ */

(function () {
  'use strict';

  /* ---- SCROLL PROGRESS BAR ---- */

  var progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) progressBar.style.width = (window.scrollY / docH * 100) + '%';
    }, { passive: true });
  }

  /* ---- SKY VIDEO FADE ON SCROLL ---- */
  /* Video fades out as user descends, revealing canvas atmosphere beneath */

  var skyWrap = document.querySelector('.sky-video-wrap');
  if (skyWrap) {
    var skyFadeEnd = window.innerHeight * 0.65;
    window.addEventListener('scroll', function () {
      var opacity = Math.max(0, 1 - window.scrollY / skyFadeEnd);
      skyWrap.style.opacity = opacity;
    }, { passive: true });
    window.addEventListener('resize', function () {
      skyFadeEnd = window.innerHeight * 0.65;
    });
  }

  /* ---- HEADER SCROLL/TOUCH REVEAL ---- */

  var header = document.querySelector('header');
  if (header) {
    var headerShown = false;
    function showHeader() {
      if (!headerShown) {
        headerShown = true;
        header.classList.add('header-visible');
      }
    }
    window.addEventListener('scroll', showHeader, { passive: true });
    document.addEventListener('touchstart', showHeader, { once: true, passive: true });
  }

  /* ---- HAMBURGER ---- */

  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      /* When menu opens on mobile, ensure header is visible */
      if (header) header.classList.add('header-visible');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  /* ---- TYPEWRITER ---- */

  var typewriterEl = document.getElementById('hero-typewriter');
  if (typewriterEl) {
    var phrases = [];
    try { phrases = JSON.parse(typewriterEl.dataset.rotate || '[]'); } catch (e) {}
    if (phrases.length === 0) phrases.push(typewriterEl.textContent.trim());

    var phraseIndex = 0, charIndex = 0, isDeleting = false, pauseTime = 0;

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
          pauseTime = 4500;
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
          pauseTime = 500;
        } else {
          pauseTime = 25;
        }
      }
      setTimeout(typeStep, pauseTime);
    }

    setTimeout(typeStep, 800);
  }

  /* ---- HERO POSITIONING TEXT CROSSFADE ---- */
  /* Two phrases fade in/out slowly, deliberately */

  var posEl = document.querySelector('.hero-positioning');
  if (posEl) {
    var posPhrases = [
      'telling the story that is as old as time\u2026',
      'build until the future is here\u2026'
    ];
    var posIdx = 0;

    /* Start invisible — fade in only after first typewriter phrase finishes (~6.5s) */
    posEl.textContent = '';
    posEl.style.opacity = '0';
    posEl.style.transition = 'opacity 2s ease';

    setTimeout(function () {
      posEl.textContent = posPhrases[0];
      posEl.style.opacity = '1';

      /* Then crossfade between the two phrases every 7 seconds */
      setInterval(function () {
        posEl.style.opacity = '0';
        setTimeout(function () {
          posIdx = (posIdx + 1) % posPhrases.length;
          posEl.textContent = posPhrases[posIdx];
          posEl.style.opacity = '1';
        }, 2000);
      }, 7000);
    }, 6500); /* wait for first typewriter phrase to finish */
  }

  /* ---- GSAP CINEMATIC ANIMATIONS ---- */

  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      document.querySelectorAll('.gsap-fade, .gsap-fade-left, .gsap-fade-right').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* Atmosphere warmth shift: cool during evidence, warm at door */
    if (document.querySelector('.evidence-section')) {
      ScrollTrigger.create({
        trigger: '.evidence-section',
        start: 'top center',
        end: 'bottom center',
        onUpdate: function (self) {
          window.atmosphereWarmth = self.progress * 0.6;
        },
        onLeaveBack: function () { window.atmosphereWarmth = 0; }
      });
    }

    if (document.querySelector('.door-section')) {
      ScrollTrigger.create({
        trigger: '.door-section',
        start: 'top 80%',
        end: 'bottom bottom',
        onUpdate: function (self) {
          window.atmosphereWarmth = 0.6 - self.progress * 0.6;
        }
      });
    }

    /* Scene 2: Signal text + origin timeline */
    document.querySelectorAll('.signal-text').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 82%' } }
      );
    });

    document.querySelectorAll('.origin-item').forEach(function (item, i) {
      gsap.fromTo(item,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.12,
          scrollTrigger: { trigger: item, start: 'top 85%' } }
      );
    });

    var signalFooter = document.querySelector('.signal-footer');
    if (signalFooter) {
      gsap.fromTo(signalFooter,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: signalFooter, start: 'top 88%' } }
      );
    }

    /* Scene 3: Evidence cards staggered */
    document.querySelectorAll('.evidence-block').forEach(function (block, i) {
      gsap.fromTo(block,
        { opacity: 0, y: 50, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: block, start: 'top 70%' } }
      );
    });

    /* Scene 4: Method panel + column stagger */
    var methodPanel = document.querySelector('.method-panel');
    if (methodPanel) {
      gsap.fromTo(methodPanel,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: methodPanel, start: 'top 72%' } }
      );
    }

    document.querySelectorAll('.method-col').forEach(function (col, i) {
      gsap.fromTo(col,
        { opacity: 0, x: i === 0 ? -30 : 30 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', delay: 0.4 + i * 0.15,
          scrollTrigger: { trigger: methodPanel || col, start: 'top 72%' } }
      );
    });

    /* Scene 5: Door email reveal with pulse */
    var doorEmail = document.querySelector('.door-email');
    if (doorEmail) {
      gsap.fromTo(doorEmail,
        { opacity: 0, scale: 0.93 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.door-section', start: 'top 70%',
            onEnter: function () { doorEmail.classList.add('revealed'); }
          }
        }
      );
    }

    /* Generic reveals for subpages */
    gsap.utils.toArray('.gsap-fade').forEach(function (el) {
      gsap.to(el, { scrollTrigger: { trigger: el, start: 'top 78%' }, opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
    });
    gsap.utils.toArray('.gsap-fade-left').forEach(function (el) {
      gsap.to(el, { scrollTrigger: { trigger: el, start: 'top 78%' }, opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' });
    });
    gsap.utils.toArray('.gsap-fade-right').forEach(function (el) {
      gsap.to(el, { scrollTrigger: { trigger: el, start: 'top 78%' }, opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' });
    });
  }

  /* ---- SMOOTH SCROLL ---- */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ---- INIT ---- */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
  } else {
    initGSAP();
  }

})();
