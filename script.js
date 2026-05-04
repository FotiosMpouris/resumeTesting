document.addEventListener("DOMContentLoaded", function () {

  /* ===== HAMBURGER MENU ===== */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest("header")) navLinks.classList.remove("open");
    });
  }

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        navLinks.classList.remove("open");
      }
    });
  });

  /* ===== TYPEWRITER ===== */
  const el = document.getElementById("hero-typewriter");
  if (el) {
    const rotateAttr = el.getAttribute("data-rotate");
    const fallback = el.textContent.trim();
    let phrases = [];
    try { phrases = rotateAttr ? JSON.parse(rotateAttr) : [fallback]; }
    catch (e) { phrases = [fallback]; }
    if (!phrases.length) phrases = [fallback];

    el.innerHTML = '<span class="tw-text"></span><span class="cursor" aria-hidden="true"></span>';
    const textSpan = el.querySelector(".tw-text");
    const isRotating = phrases.length > 1;
    let phraseIdx = 0, charIdx = 0, deleting = false;

    const tick = () => {
      const current = phrases[phraseIdx];
      if (!deleting) {
        charIdx++;
        textSpan.textContent = current.slice(0, charIdx);
        if (charIdx >= current.length) {
          if (!isRotating) return;
          deleting = true;
          setTimeout(tick, 2400);
          return;
        }
        setTimeout(tick, 65 + Math.random() * 35);
      } else {
        charIdx--;
        textSpan.textContent = current.slice(0, charIdx);
        if (charIdx <= 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 30);
      }
    };
    setTimeout(tick, 600);
  }

  /* ===== FADE IN ON SCROLL ===== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".section, .feature, .contact-section-clean, .mission-section.fade-in, .video-showcase.fade-in").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

});
