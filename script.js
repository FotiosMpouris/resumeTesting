document.addEventListener("DOMContentLoaded", function() {
  // Hamburger Menu
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

  // Video Playback with Sound Toggle
  const videos = document.querySelectorAll(".media-video");
  videos.forEach(video => {
    video.muted = true; // Start muted
    video.play(); // Auto-play muted

    video.addEventListener("click", function() {
      this.muted = !this.muted; // Toggle mute on click
    });
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const [page, targetId] = href.split('#');

      if (page && window.location.pathname !== `/${page}`) {
        window.location.href = href;
      } else if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight + document.querySelector('.top-banner').offsetHeight;
          let topPosition;

          // Special case for volunteerSection and contributeSection to align banner at the top
          if (targetId === 'volunteerSection' || targetId === 'contributeSection') {
            topPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          } else {
            topPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10; // Default offset
          }

          window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
          });
        }
      }

      if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        overlayBg.classList.remove("open");
        overlayPopup.classList.remove("open");
        document.body.classList.remove("no-scroll");
      }
    });
  });

  // Fade-In Animation on Scroll
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
});
