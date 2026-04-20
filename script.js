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
  //    The construct flickers. Random thin slices of matrix rain
  //    bleed through the page at irregular intervals, in random
  //    locations, with three variants (calm linger, hard flash,
  //    stutter sequence). Sometimes two arrive within a few seconds
  //    of each other ("aftershock") — the goal is "reality glitching"
  //    rather than a tidy schedule. Pauses when the tab is hidden,
  //    honors prefers-reduced-motion.
  // ============================================================
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    let fractureCounter = 0;

    const scheduleFracture = (minMs, maxMs) => {
      const wait = minMs + Math.random() * (maxMs - minMs);
      setTimeout(() => {
        if (document.hidden) {
          // Tab hidden — try again sooner once it might be visible
          scheduleFracture(20 * 1000, 60 * 1000);
          return;
        }
        runFractureSequence();

        // ~22% chance of an "aftershock" — second fracture 3-9s later
        if (Math.random() < 0.22) {
          setTimeout(() => {
            if (!document.hidden) runFractureSequence();
          }, 3000 + Math.random() * 6000);
        }

        scheduleFracture(30 * 1000, 90 * 1000);
      }, wait);
    };

    // First one comes earlier — 15-45s after page load
    scheduleFracture(15 * 1000, 45 * 1000);

    function runFractureSequence() {
      fractureCounter++;
      const r = Math.random();
      if (r < 0.18) {
        // STUTTER — two or three rapid micro-flashes from the same band
        const flashes = Math.random() < 0.5 ? 2 : 3;
        const seed = makeFractureGeometry();
        let i = 0;
        const fire = () => {
          spawnFracture({ ...seed, hold: 50 + Math.random() * 80, peakOpacity: 0.55, fadeOut: 60, rainSpeed: 0.35 });
          i++;
          if (i < flashes) setTimeout(fire, 70 + Math.random() * 110);
        };
        fire();
      } else if (r < 0.42) {
        // HARD FLASH — short, sharp-ish blip
        spawnFracture({ ...makeFractureGeometry(), hold: 140 + Math.random() * 140, peakOpacity: 0.62, fadeIn: 40, fadeOut: 90, rainSpeed: 0.4 });
      } else {
        // LINGER — calm, the default vibe. "Did I see that?"
        spawnFracture({ ...makeFractureGeometry(), hold: 650 + Math.random() * 800, peakOpacity: 0.48 + Math.random() * 0.08, fadeIn: 280, fadeOut: 380, rainSpeed: 0.32 });
      }
    }
  }

  function makeFractureGeometry() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Wider angle range (-45° to +45°) and full-width random placement
    const angleDeg = (Math.random() * 90) - 45;
    const angleRad = (angleDeg * Math.PI) / 180;
    const bandWidth = 50 + Math.random() * 180; // 50-230px wide — more variety
    const centerX = w * (0.05 + Math.random() * 0.9); // anywhere across the page
    const dx = Math.tan(angleRad) * h;
    const half = bandWidth / 2;

    return {
      w, h,
      polygon: `polygon(${centerX - half}px 0, ${centerX + half}px 0, ${centerX + half + dx}px ${h}px, ${centerX - half + dx}px ${h}px)`
    };
  }

  function spawnFracture(opts) {
    const { w, h, polygon, hold, peakOpacity = 0.9, fadeIn = 220, fadeOut = 280, rainSpeed = 1.0 } = opts;

    const overlay = document.createElement("div");
    overlay.className = "matrix-fracture";
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9998",
      pointerEvents: "none",
      opacity: "0",
      transition: `opacity ${fadeIn}ms ease-out`,
      mixBlendMode: "screen",
      clipPath: polygon,
      WebkitClipPath: polygon
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

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = (Math.random() > 0.97) ? "#ffffff" : "#00ff41";
        ctx.fillText(ch, i * fontSize, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        // rainSpeed scales fall rate — fractional values slow it down
        drops[i] += rainSpeed;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    requestAnimationFrame(() => { overlay.style.opacity = String(peakOpacity); });

    setTimeout(() => {
      overlay.style.transition = `opacity ${fadeOut}ms ease-in`;
      overlay.style.opacity = "0";
      setTimeout(() => {
        cancelAnimationFrame(raf);
        overlay.remove();
      }, fadeOut + 40);
    }, hold);
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
