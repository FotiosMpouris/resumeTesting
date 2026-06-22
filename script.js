/* ============================================================
   fotiosmpouris.com — Luminous Glass Interactions
   GSAP ScrollTrigger + Canvas Particles + Typewriter
   ============================================================ */

(function () {
  'use strict';

  /* ---- HAMBURGER MENU ---- */

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

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

  const typewriterEl = document.getElementById('hero-typewriter');

  if (typewriterEl) {
    const phrases = JSON.parse(typewriterEl.dataset.rotate || '[]');
    if (phrases.length === 0) phrases.push(typewriterEl.textContent);

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTime = 0;

    const caret = document.createElement('span');
    caret.className = 'caret';
    typewriterEl.textContent = '';
    typewriterEl.appendChild(caret);

    function typeStep() {
      const current = phrases[phraseIndex];
      const textNode = typewriterEl.firstChild;

      if (!isDeleting) {
        if (textNode && textNode.nodeType === 3) {
          textNode.textContent = current.substring(0, charIndex + 1);
        } else {
          typewriterEl.insertBefore(document.createTextNode(current.substring(0, charIndex + 1)), caret);
        }
        charIndex++;

        if (charIndex >= current.length) {
          isDeleting = true;
          pauseTime = 2200;
        } else {
          pauseTime = 55 + Math.random() * 40;
        }
      } else {
        if (textNode && textNode.nodeType === 3) {
          textNode.textContent = current.substring(0, charIndex - 1);
        }
        charIndex--;

        if (charIndex <= 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          pauseTime = 400;
        } else {
          pauseTime = 30;
        }
      }

      setTimeout(typeStep, pauseTime);
    }

    setTimeout(typeStep, 800);
  }

  /* ---- LUMINOUS PARTICLE SYSTEM ---- */

  const canvas = document.getElementById('particle-canvas');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;
    let frameCount = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticle(x, y) {
      const hue = 36 + Math.random() * 10;
      const sat = 55 + Math.random() * 20;
      const light = 70 + Math.random() * 15;
      return {
        x: x !== undefined ? x : Math.random() * width,
        y: y !== undefined ? y : Math.random() * height,
        radius: 1 + Math.random() * 2,
        baseOpacity: 0.06 + Math.random() * 0.12,
        opacity: 0.06 + Math.random() * 0.12,
        vy: -(0.08 + Math.random() * 0.22),
        vx: (Math.random() - 0.5) * 0.15,
        color: 'hsla(' + hue + ',' + sat + '%,' + light + '%,',
        flareTimer: 0,
        flaring: false
      };
    }

    function init() {
      resize();
      particles = [];
      const count = Math.min(45, Math.floor(width / 30));
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const scrollOffset = window.scrollY * 0.015;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.x += Math.sin(frameCount * 0.003 + i) * 0.08;
        }

        const drawX = p.x + scrollOffset * (i % 2 === 0 ? 1 : -1);

        if (p.flaring) {
          p.flareTimer--;
          p.opacity = p.baseOpacity + (0.3 - p.baseOpacity) * (p.flareTimer / 60);
          if (p.flareTimer <= 0) {
            p.flaring = false;
            p.opacity = p.baseOpacity;
          }
        }

        ctx.beginPath();
        ctx.arc(drawX, p.y, p.radius + (p.flaring ? 0.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();

        if (p.y < -10) {
          particles[i] = createParticle(Math.random() * width, height + 10);
        }
        if (p.x < -20 || p.x > width + 20) {
          p.x = p.x < 0 ? width + 10 : -10;
        }
      }

      if (!prefersReducedMotion && frameCount % 220 === 0 && particles.length > 0) {
        const idx = Math.floor(Math.random() * particles.length);
        particles[idx].flaring = true;
        particles[idx].flareTimer = 60;
      }

      frameCount++;
      if (!prefersReducedMotion) {
        requestAnimationFrame(draw);
      }
    }

    init();

    if (prefersReducedMotion) {
      draw();
    } else {
      requestAnimationFrame(draw);
    }

    let resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        resize();
        if (prefersReducedMotion) draw();
      }, 200);
    });
  }

  /* ---- GSAP SCROLL ANIMATIONS ---- */

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.defaults({ ease: 'power3.out', duration: 0.9 });

    gsap.utils.toArray('.gsap-reveal').forEach(function (el) {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.9
      });
    });

    gsap.utils.toArray('.gsap-reveal-left').forEach(function (el, i) {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 0.9,
        delay: i * 0.1
      });
    });

    const signalBoundary = document.querySelector('.signal-boundary');
    if (signalBoundary) {
      gsap.from(signalBoundary, {
        scrollTrigger: {
          trigger: signalBoundary,
          start: 'top 85%'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3
      });
    }

    const doorEmail = document.querySelector('.door-email');
    if (doorEmail) {
      gsap.from(doorEmail, {
        scrollTrigger: {
          trigger: '.door-section',
          start: 'top 75%'
        },
        opacity: 0,
        scale: 0.95,
        duration: 1
      });
    }

  } else {
    document.querySelectorAll('.gsap-reveal, .gsap-reveal-left').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
