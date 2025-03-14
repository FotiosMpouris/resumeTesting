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

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // Parallax Effect for Hero Banner
  const bannerDesktop = document.querySelector(".banner-desktop");
  const bannerMobile = document.querySelector(".banner-mobile");
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    if (bannerDesktop) bannerDesktop.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    if (bannerMobile) bannerMobile.style.transform = `translateY(${scrollPosition * 0.2}px)`;
  });

  // Function to calculate header height
  const getHeaderHeight = () => {
    const header = document.querySelector('header');
    const topBanner = document.querySelector('.top-banner');
    return (header ? header.offsetHeight : 0) + (topBanner ? topBanner.offsetHeight : 0) || 0;
  };

  // Function to handle scrolling to a target element
  const scrollToTarget = (targetId, delay = 0) => {
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = getHeaderHeight();
        const topPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
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
  if (hash) scrollToTarget(hash, 100);

  // Handle stored scroll target
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
});
