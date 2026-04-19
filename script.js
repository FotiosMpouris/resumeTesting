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
  // 12. NEO EASTER EGG — type "neo" anywhere → 4s matrix takeover
  // ============================================================
  let neoBuf = "";
  const NEO_KEY = "neo";
  document.addEventListener("keydown", (e) => {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable)) return;
    const k = (e.key || "").toLowerCase();
    if (!/^[a-z]$/.test(k)) { neoBuf = ""; return; }
    neoBuf = (neoBuf + k).slice(-NEO_KEY.length);
    if (neoBuf === NEO_KEY) {
      neoBuf = "";
      triggerMatrixTakeover(4000);
    }
  });

  function triggerMatrixTakeover(durationMs) {
    if (document.getElementById("neo-overlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "neo-overlay";
    Object.assign(overlay.style, {
      position: "fixed", inset: "0", zIndex: "999999",
      background: "#000", opacity: "0", transition: "opacity 0.25s ease",
      pointerEvents: "none"
    });
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    Object.assign(canvas.style, { width: "100%", height: "100%", display: "block" });
    overlay.appendChild(canvas);
    const tag = document.createElement("div");
    tag.textContent = "// wake up.";
    Object.assign(tag.style, {
      position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)",
      color: "#00ff41", fontFamily: "monospace", fontSize: "14px",
      letterSpacing: "0.2em", textShadow: "0 0 10px #00ff41", opacity: "0.85"
    });
    overlay.appendChild(tag);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });

    const ctx = canvas.getContext("2d");
    const fontSize = 16;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = new Array(cols).fill(0).map(() => Math.random() * canvas.height / fontSize);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF";
    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    setTimeout(() => {
      overlay.style.opacity = "0";
      setTimeout(() => {
        cancelAnimationFrame(raf);
        overlay.remove();
      }, 280);
    }, durationMs);
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
