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

  /* ---- SKY VIDEO ---- */
  /* The sky never leaves. The video persists through the entire scroll
     on every page — it IS the environment. The .sky-video-wrap::after
     veil handles content readability; no fade on scroll. */

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
  /*
   * The mobile overlay (#mobile-nav-overlay) is a direct <body> child, NOT inside
   * <header>. This avoids the CSS position:fixed-inside-transformed-ancestor bug
   * where the header's transform clips the overlay to the header's own height.
   */
  var hamburger = document.querySelector('.hamburger');
  var mobileOverlay = document.getElementById('mobile-nav-overlay');

  /* Mark the active link in the overlay based on current page */
  if (mobileOverlay) {
    var overlayLinks = mobileOverlay.querySelectorAll('a');
    overlayLinks.forEach(function(link) {
      if (link.pathname === window.location.pathname ||
          window.location.href.indexOf(link.getAttribute('href')) !== -1) {
        link.classList.add('active');
      }
    });
  }

  if (hamburger && mobileOverlay) {
    function setNavOpen(isOpen) {
      mobileOverlay.classList.toggle('open', isOpen);
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      setNavOpen(!mobileOverlay.classList.contains('open'));
      if (header) header.classList.add('header-visible');
    });
    mobileOverlay.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setNavOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (mobileOverlay.classList.contains('open') &&
          !mobileOverlay.contains(e.target) &&
          !hamburger.contains(e.target)) {
        setNavOpen(false);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
        setNavOpen(false);
      }
    });
  }

  /* ---- PPA SIGNUP FORM ---- */
  /* Posts to the PPA signup API; redirects to the share page on success. */

  var ppaForm = document.getElementById('ppa-signup-form');
  if (ppaForm) {
    var submitBtn = ppaForm.querySelector('button[type="submit"]');
    var statusMsg = document.getElementById('form-status-message');
    if (!statusMsg) {
      statusMsg = document.createElement('p');
      statusMsg.id = 'form-status-message';
      statusMsg.style.cssText = 'margin-top:12px; font-size:0.85rem;';
      ppaForm.appendChild(statusMsg);
    }

    ppaForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting\u2026'; }
      statusMsg.textContent = '';

      var formData = new FormData(ppaForm);
      var data = {
        firstName: formData.get('firstName'),
        email: formData.get('email'),
        zipCode: formData.get('zipCode'),
        involvement: {
          isUser: formData.has('isUser'),
          isPartner: formData.has('isPartner'),
          isVolunteer: formData.has('isVolunteer')
        },
        howHeard: formData.get('howHeard')
      };

      fetch('https://e9d086nusl.execute-api.us-east-2.amazonaws.com/prod/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (response) {
        if (!response.ok) {
          return response.json().then(function (err) {
            throw new Error(err.message || 'An API error occurred.');
          });
        }
        window.location.href = 'https://poorpeople.app/share';
      }).catch(function (error) {
        statusMsg.textContent = 'Error: ' + error.message;
        statusMsg.style.color = '#B00020';
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
      });
    });
  }

  /* ---- CINEMATIC HERO SEQUENCE ---- */
  /*
   * Each phrase set: large text types in, pauses, small text fades in,
   * both hold, then both fade out together before the next set begins.
   * Phrase sets defined via data-cinematic JSON on the h1 element.
   * white:true makes the large text appear in bright white (for final phrase).
   */

  var cinematicEl = document.querySelector('[data-cinematic]');
  var posEl = document.querySelector('.hero-positioning');

  if (cinematicEl) {
    var cSets;
    try { cSets = JSON.parse(cinematicEl.getAttribute('data-cinematic')); } catch(e) { cSets = []; }

    if (cSets.length > 0) {
      var cIdx = 0;
      var caretSpan = document.createElement('span');
      caretSpan.className = 'caret';

      /* Init sub-phrase element */
      if (posEl) {
        posEl.textContent = '';
        posEl.style.cssText = 'opacity:0; transition:none;';
      }

      function runSet() {
        var s = cSets[cIdx];

        /* Reset large text */
        cinematicEl.textContent = '';
        cinematicEl.style.cssText = 'opacity:1; transition:none;';
        if (s.white) {
          cinematicEl.classList.add('phrase-white');
        } else {
          cinematicEl.classList.remove('phrase-white');
        }
        cinematicEl.appendChild(caretSpan);

        /* Reset small text */
        if (posEl) {
          posEl.textContent = '';
          posEl.style.cssText = 'opacity:0; transition:none;';
        }

        /* Type the large phrase character by character */
        var text = s.large;
        var ci = 0;

        function typeChar() {
          if (ci < text.length) {
            var node = cinematicEl.firstChild;
            if (node && node.nodeType === 3) {
              node.textContent = text.substring(0, ci + 1);
            } else {
              cinematicEl.insertBefore(document.createTextNode(text.substring(0, ci + 1)), caretSpan);
            }
            ci++;
            setTimeout(typeChar, 55 + Math.random() * 35);
          } else {
            /* Typing done — pause before sub-phrase appears */
            setTimeout(function() {
              if (posEl && s.small) {
                posEl.textContent = s.small;
                posEl.style.transition = 'opacity 1.4s ease';
                posEl.style.opacity = '1';
              }

              /* Hold, then fade both out together */
              var holdTime = s.small ? 3400 : 2600;
              setTimeout(function() {
                cinematicEl.style.transition = 'opacity 1.3s ease';
                cinematicEl.style.opacity = '0';
                if (posEl) {
                  posEl.style.transition = 'opacity 1.3s ease';
                  posEl.style.opacity = '0';
                }

                /* Advance to next set after fade completes */
                setTimeout(function() {
                  cIdx = (cIdx + 1) % cSets.length;
                  runSet();
                }, 1400);
              }, holdTime);
            }, 1100);
          }
        }

        setTimeout(typeChar, 600);
      }

      runSet();
    }
  }

  /* ---- ROTATING TYPEWRITER (subpage heroes, data-rotate) ---- */
  /* Simpler than the cinematic sequence: type, hold, delete, next. */

  var rotateEl = document.querySelector('[data-rotate]');
  if (rotateEl && !rotateEl.hasAttribute('data-cinematic')) {
    var rPhrases;
    try { rPhrases = JSON.parse(rotateEl.getAttribute('data-rotate')); } catch (e) { rPhrases = []; }

    if (rPhrases.length > 0) {
      var rIdx = 0, rChar = rPhrases[0].length, rDeleting = false;
      var rCaret = document.createElement('span');
      rCaret.className = 'caret';
      rotateEl.textContent = rPhrases[0];
      rotateEl.appendChild(rCaret);

      function rotateTick() {
        var phrase = rPhrases[rIdx];
        var delay;

        if (rDeleting) {
          rChar--;
          delay = 28;
          if (rChar <= 0) { rDeleting = false; rIdx = (rIdx + 1) % rPhrases.length; delay = 500; }
        } else {
          rChar++;
          delay = 60 + Math.random() * 30;
          if (rChar >= phrase.length) { rDeleting = true; delay = 4500; rChar = phrase.length; }
        }

        var shown = (rDeleting || rChar < phrase.length) ? phrase.substring(0, rChar) : phrase;
        var node = rotateEl.firstChild;
        if (node && node.nodeType === 3) {
          node.textContent = shown;
        } else {
          rotateEl.insertBefore(document.createTextNode(shown), rCaret);
        }
        setTimeout(rotateTick, delay);
      }

      setTimeout(rotateTick, 4500);
    }
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

    /* Doors intro text */
    var doorsIntro = document.querySelector('.doors-intro');
    if (doorsIntro) {
      gsap.fromTo(doorsIntro,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: doorsIntro, start: 'top 82%' } }
      );
    }

    /* Door cards — staggered reveal */
    document.querySelectorAll('.door-card').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 78%' } }
      );
    });

    /* Human section */
    var humanPanel = document.querySelector('.human-panel');
    if (humanPanel) {
      gsap.fromTo(humanPanel,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: humanPanel, start: 'top 75%' } }
      );
    }

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
