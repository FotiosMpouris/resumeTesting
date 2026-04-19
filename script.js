document.addEventListener("DOMContentLoaded", function () {

  // ============================================================
  // 1. HAMBURGER MENU
  // ============================================================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const overlayBg = document.createElement("div");
  overlayBg.classList.add("overlay-bg");
  document.body.appendChild(overlayBg);
  const overlayPopup = document.createElement("div");
  overlayPopup.classList.add("overlay-popup");
  document.body.appendChild(overlayPopup);

  let overlayMenuHTML = "";
  navLinks.querySelectorAll("a").forEach(link => {
    const isActive = link.classList.contains("active") ? "active" : "";
    overlayMenuHTML += `<li><a href="${link.getAttribute("href")}" class="${isActive}">${link.textContent}</a></li>`;
  });
  overlayPopup.innerHTML = `<ul class="overlay-menu">${overlayMenuHTML}</ul>`;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    overlayBg.classList.toggle("open");
    overlayPopup.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });

  overlayBg.addEventListener("click", () => {
    hamburger.classList.remove("active");
    overlayBg.classList.remove("open");
    overlayPopup.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });


  // ============================================================
  // 2. MEDIA VIDEO SOUND TOGGLE (non-multimedia pages)
  // ============================================================
  const videos = document.querySelectorAll(".media-video");
  videos.forEach(video => {
    if (!video.closest(".multimedia-page")) {
      video.muted = true;
      video.play();
      video.addEventListener("click", function () {
        this.muted = !this.muted;
      });
    }
  });


  // ============================================================
  // 3. SMOOTH SCROLL & ANCHOR HANDLING
  // ============================================================
  const getHeaderHeight = () => {
    const header = document.querySelector("header");
    const topBanner = document.querySelector(".top-banner");
    return (header ? header.offsetHeight : 0) + (topBanner ? topBanner.offsetHeight : 0);
  };

  const scrollToTarget = (targetId, delay = 0) => {
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = getHeaderHeight();
        let topPosition;
        if (targetId === "volunteerSection" || targetId === "contributeSection") {
          const banner = targetElement.querySelector(
            targetId === "volunteerSection" ? ".volunteer-banner" : ".contribute-banner"
          );
          const elementToScroll = banner || targetElement;
          topPosition = elementToScroll.getBoundingClientRect().top + window.pageYOffset - headerHeight - 5;
        } else {
          topPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
        }
        window.scrollTo({ top: topPosition, behavior: "smooth" });
      }
    }, delay);
  };

  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const [page, targetId] = href.split("#");
      if (page && window.location.pathname !== `/${page}`) {
        sessionStorage.setItem("scrollToTarget", targetId);
        window.location.href = href;
      } else if (targetId) {
        scrollToTarget(targetId);
        if (hamburger.classList.contains("active")) {
          hamburger.classList.remove("active");
          overlayBg.classList.remove("open");
          overlayPopup.classList.remove("open");
          document.body.classList.remove("no-scroll");
        }
      }
    });
  });

  const hash = window.location.hash.replace("#", "");
  if (hash) scrollToTarget(hash, 100);

  const storedTarget = sessionStorage.getItem("scrollToTarget");
  if (storedTarget) {
    scrollToTarget(storedTarget, 100);
    sessionStorage.removeItem("scrollToTarget");
  }


  // ============================================================
  // 4. FADE-IN ANIMATION ON SCROLL
  // ============================================================
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => observer.observe(el));


  // ============================================================
  // 5. DARK MODE — ALWAYS ON
  // ============================================================
  // Light mode has been removed. Clear any stale localStorage value
  // that could have been set by the old toggle, then lock to dark mode.
  localStorage.removeItem("darkMode");
  document.body.classList.add("dark-mode");
  document.body.classList.remove("light-mode");


  // ============================================================
  // 6. HOMEPAGE POPUP ("What's Fotios Working On?")
  // ============================================================
  const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");
  if (isHomePage && !sessionStorage.getItem("popupDismissed")) {
    const popup = document.createElement("div");
    popup.classList.add("fotios-popup");
    popup.innerHTML = `
      <div class="popup-content">
        <button class="popup-close-btn" aria-label="Close Popup">x</button>
        <h3>What's Fotios Working On Right Now?</h3>
        <a href="ai-apps.html#hero-video" class="popup-btn">Click Here</a>
      </div>
    `;
    document.body.appendChild(popup);

    setTimeout(() => popup.classList.add("visible"), 10000);

    const dismissPopup = () => {
      popup.classList.remove("visible");
      sessionStorage.setItem("popupDismissed", "true");
    };
    popup.querySelector(".popup-btn").addEventListener("click", dismissPopup);
    popup.querySelector(".popup-close-btn").addEventListener("click", dismissPopup);
  }


  // ============================================================
  // 7. AI APPS PAGE — PROJECT CARD VIDEO HOVER
  // ============================================================
  document.querySelectorAll(".project-card").forEach(card => {
    const video = card.querySelector(".project-video-bg");
    if (video) {
      card.addEventListener("mouseenter", () => {
        video.play().catch(err => console.log("Video autoplay prevented:", err));
      });
      card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });


  // ============================================================
  // 8. TYPEWRITER EFFECT (hero headings)
  //    Supports data-rotate='["Title 1","Title 2"]' for cycling.
  //    Falls back to single-pass typing of innerHTML for plain h1s.
  //    Always renders a blinking caret beside the text.
  // ============================================================
  const typewriterElement = document.getElementById("hero-typewriter");
  if (typewriterElement) {
    const rotateAttr = typewriterElement.getAttribute("data-rotate");
    const fallback = typewriterElement.textContent.trim();
    let phrases = [];
    try {
      phrases = rotateAttr ? JSON.parse(rotateAttr) : [fallback];
    } catch (e) {
      phrases = [fallback];
    }
    if (!phrases.length) phrases = [fallback];

    typewriterElement.innerHTML = '<span class="tw-text"></span><span class="tw-caret" aria-hidden="true">▌</span>';
    const textSpan = typewriterElement.querySelector(".tw-text");

    const isRotating = phrases.length > 1;
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      const current = phrases[phraseIdx];
      if (!deleting) {
        charIdx++;
        textSpan.textContent = current.slice(0, charIdx);
        if (charIdx >= current.length) {
          if (!isRotating) return;
          deleting = true;
          setTimeout(tick, 2200);
          return;
        }
        setTimeout(tick, 70 + Math.random() * 40);
      } else {
        charIdx--;
        textSpan.textContent = current.slice(0, charIdx);
        if (charIdx <= 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, 35);
      }
    };
    setTimeout(tick, 500);
  }


  // ============================================================
  // 11. FOOTER MONOSPACE STATUS LINE (matrix tier)
  // ============================================================
  const footerStatus = document.getElementById("footer-status");
  if (footerStatus) {
    const pad = (n) => String(n).padStart(2, "0");
    const render = () => {
      const d = new Date();
      const utc = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`;
      const node = (typeof navigator !== "undefined" && navigator.userAgent) ? "node-fm-01" : "node-fm-01";
      footerStatus.textContent = `> sys.online · ${node} · uplink: stable · ${utc}`;
    };
    render();
    setInterval(render, 1000);
  }


  // ============================================================
  // 12. AMBIENT MATRIX FRACTURES
  //    Every ~60-180s, a thin angled slice of the screen briefly
  //    shows matrix rain bleeding through, then heals. No interaction
  //    needed — a quiet glimpse "behind the construct." Pauses when
  //    the tab is hidden. Honors prefers-reduced-motion.
  // ============================================================
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    const FRACTURE_MIN_MS = 60 * 1000;
    const FRACTURE_MAX_MS = 180 * 1000;
    const FIRST_DELAY_MIN = 25 * 1000;
    const FIRST_DELAY_MAX = 75 * 1000;

    const scheduleFracture = (minMs, maxMs) => {
      const wait = minMs + Math.random() * (maxMs - minMs);
      setTimeout(() => {
        if (!document.hidden) triggerMatrixFracture();
        scheduleFracture(FRACTURE_MIN_MS, FRACTURE_MAX_MS);
      }, wait);
    };
    scheduleFracture(FIRST_DELAY_MIN, FIRST_DELAY_MAX);
  }

  function triggerMatrixFracture() {
    if (document.getElementById("matrix-fracture")) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Generate a thin diagonal band as a clip-path polygon.
    // Pick a random angle (-25° to +25° from vertical) and horizontal offset.
    const angleDeg = (Math.random() * 50) - 25;
    const angleRad = (angleDeg * Math.PI) / 180;
    const bandWidth = 70 + Math.random() * 90; // 70-160px wide
    const centerX = w * (0.15 + Math.random() * 0.7);
    const dx = Math.tan(angleRad) * h; // horizontal drift across the screen height
    const half = bandWidth / 2;
    const x1 = centerX - half;
    const x2 = centerX + half;
    const x3 = centerX + half + dx;
    const x4 = centerX - half + dx;

    const overlay = document.createElement("div");
    overlay.id = "matrix-fracture";
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9998",
      pointerEvents: "none",
      opacity: "0",
      transition: "opacity 280ms ease-out",
      mixBlendMode: "screen",
      clipPath: `polygon(${x1}px 0, ${x2}px 0, ${x3}px ${h}px, ${x4}px ${h}px)`,
      WebkitClipPath: `polygon(${x1}px 0, ${x2}px 0, ${x3}px ${h}px, ${x4}px ${h}px)`
    });

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    Object.assign(canvas.style, { display: "block", width: "100%", height: "100%" });
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);

    const ctx = canvas.getContext("2d");
    const fontSize = 16;
    const cols = Math.floor(w / fontSize);
    const drops = new Array(cols).fill(0).map(() => Math.random() * h / fontSize);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/";

    // Faint black floor so old characters fade rather than streak.
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = (Math.random() > 0.96) ? "#ffffff" : "#00ff41";
        ctx.fillText(ch, i * fontSize, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    requestAnimationFrame(() => { overlay.style.opacity = "0.9"; });

    const HOLD = 900 + Math.random() * 700; // 0.9-1.6s visible
    setTimeout(() => {
      overlay.style.opacity = "0";
      setTimeout(() => {
        cancelAnimationFrame(raf);
        overlay.remove();
      }, 320);
    }, HOLD);
  }


  // ============================================================
  // 9. PPA SIGNUP FORM
  // ============================================================
  const ppaForm = document.getElementById("ppa-signup-form");
  if (ppaForm) {
    const statusMessage = document.getElementById("form-status-message");
    const submitButton = document.getElementById("submit-button");

    ppaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
      statusMessage.textContent = "";

      const formData = new FormData(ppaForm);
      const data = {
        firstName: formData.get("firstName"),
        email: formData.get("email"),
        zipCode: formData.get("zipCode"),
        involvement: {
          isUser: formData.has("isUser"),
          isPartner: formData.has("isPartner"),
          isVolunteer: formData.has("isVolunteer"),
        },
        howHeard: formData.get("howHeard"),
      };

      try {
        const response = await fetch("https://e9d086nusl.execute-api.us-east-2.amazonaws.com/prod/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message || "An API error occurred.");
        }
        window.location.href = "https://poorpeople.app/share";
      } catch (error) {
        statusMessage.textContent = `Error: ${error.message}`;
        statusMessage.style.color = "red";
        submitButton.disabled = false;
        submitButton.textContent = "Secure My Spot";
      }
    });
  }


  // ============================================================
  // 10. MULTIMEDIA PAGE — LAZY LOAD & AUDIO CONTROL
  // ============================================================
  if (document.body.classList.contains("multimedia-page")) {
    const mediaVideos = document.querySelectorAll(".media-video");
    let currentlyUnmutedVideo = null;

    mediaVideos.forEach(video => {
      video.removeAttribute("autoplay");
      const icon = document.createElement("span");
      icon.classList.add("sound-icon");
      icon.innerHTML = "🔇";
      video.parentElement.appendChild(icon);
    });

    mediaVideos.forEach(video => {
      video.addEventListener("click", function () {
        const soundIcon = this.parentElement.querySelector(".sound-icon");
        if (this.muted) {
          if (currentlyUnmutedVideo && currentlyUnmutedVideo !== this) {
            currentlyUnmutedVideo.muted = true;
            const otherIcon = currentlyUnmutedVideo.parentElement.querySelector(".sound-icon");
            if (otherIcon) otherIcon.innerHTML = "🔇";
          }
          this.muted = false;
          soundIcon.innerHTML = "🔊";
          currentlyUnmutedVideo = this;
        } else {
          this.muted = true;
          soundIcon.innerHTML = "🔇";
          currentlyUnmutedVideo = null;
        }
      });
    });

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });

    mediaVideos.forEach(video => videoObserver.observe(video));
  }

});
