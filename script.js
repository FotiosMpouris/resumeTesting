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
    video.muted = true;
    video.play();

    video.addEventListener("click", function() {
      this.muted = !this.muted;
    });
  });

  // Function to calculate header height
  const getHeaderHeight = () => {
    const header = document.querySelector('header');
    const topBanner = document.querySelector('.top-banner');
    const headerHeight = (header ? header.offsetHeight : 0) + (topBanner ? topBanner.offsetHeight : 0);
    return headerHeight || 0;
  };

  // Function to handle scrolling to a target element
  const scrollToTarget = (targetId, delay = 0) => {
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = getHeaderHeight();
        let topPosition;

        if (targetId === 'volunteerSection' || targetId === 'contributeSection') {
          const banner = targetElement.querySelector(targetId === 'volunteerSection' ? '.volunteer-banner' : '.contribute-banner');
          const elementToScroll = banner || targetElement;
          topPosition = elementToScroll.getBoundingClientRect().top + window.pageYOffset - headerHeight - 5;
        } else {
          topPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
        }

        window.scrollTo({
          top: topPosition,
          behavior: 'smooth'
        });
      }
    }, delay);
  };

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const [page, targetId] = href.split('#');

      if (page && window.location.pathname !== `/${page}`) {
        sessionStorage.setItem('scrollToTarget', targetId);
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

  // Handle scrolling on page load if there's a hash
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    scrollToTarget(hash, 100);
  }

  // Handle scrolling after page load if a target was stored
  const storedTarget = sessionStorage.getItem('scrollToTarget');
  if (storedTarget) {
    scrollToTarget(storedTarget, 100);
    sessionStorage.removeItem('scrollToTarget');
  }

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

  // Dark Mode Toggle with Moon Button
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});
