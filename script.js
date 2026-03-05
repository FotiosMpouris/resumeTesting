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
  // ============================================================
  const typewriterElement = document.getElementById("hero-typewriter");
  if (typewriterElement) {
    const text = typewriterElement.innerHTML;
    typewriterElement.innerHTML = "";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typewriterElement.innerHTML += text.charAt(i++);
        setTimeout(typeWriter, 80);
      }
    };
    setTimeout(typeWriter, 500);
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
