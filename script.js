// script.js

document.addEventListener("DOMContentLoaded", function() {
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // 1) Transparent Header on Mobile Scroll
  window.addEventListener("scroll", () => {
    if (window.innerWidth <= 768) {
      if (window.scrollY > 50) {
        header.classList.add("mobile-scrolled");
        hamburger.classList.add("scrolled-mobile");
      } else {
        header.classList.remove("mobile-scrolled");
        hamburger.classList.remove("scrolled-mobile");
      }
    } else {
      header.classList.remove("mobile-scrolled");
      hamburger.classList.remove("scrolled-mobile");
    }
  });

  // 2) Hamburger -> Overlay
  const overlayBg = document.createElement("div");
  overlayBg.classList.add("overlay-bg");
  document.body.appendChild(overlayBg);

  const overlayPopup = document.createElement("div");
  overlayPopup.classList.add("overlay-popup");
  document.body.appendChild(overlayPopup);

  // Build overlay menu from navLinks
  let overlayMenuHTML = "";
  navLinks.querySelectorAll("a").forEach(link => {
    const isActive = link.classList.contains("active") ? "active" : "";
    const href = link.getAttribute("href");
    const text = link.textContent;
    overlayMenuHTML += `<li><a href="${href}" class="${isActive}">${text}</a></li>`;
  });
  overlayPopup.innerHTML = `<ul class="overlay-menu">${overlayMenuHTML}</ul>`;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    overlayBg.classList.toggle("open");
    overlayPopup.classList.toggle("open");
  });
  overlayBg.addEventListener("click", () => {
    hamburger.classList.remove("active");
    overlayBg.classList.remove("open");
    overlayPopup.classList.remove("open");
  });
  overlayPopup.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      overlayBg.classList.remove("open");
      overlayPopup.classList.remove("open");
    });
  });

  // 3) 10-Second Popup (Shop & Contribute)
  function createPopup() {
    const popupOverlay = document.createElement("div");
    popupOverlay.id = "mobileButtonsOverlay";
    popupOverlay.innerHTML = `
      <div class="mobile-buttons-content">
        <button class="close-mobile-btn">&times;</button>
        <h3>Check Out</h3>
        <a href="https://www.amazon.com" id="mobileShopBtn">Shop</a>
        <a href="pythos.html#contributeSection" id="mobileContributeBtn">Contribute</a>
      </div>
    `;
    document.body.appendChild(popupOverlay);

    const closeBtn = popupOverlay.querySelector(".close-mobile-btn");
    closeBtn.addEventListener("click", () => {
      popupOverlay.classList.remove("show");
    });

    // Show after 10 seconds
    setTimeout(() => {
      popupOverlay.classList.add("show");
    }, 10000);
  }

  // Only show the popup once per session
  if (sessionStorage.getItem("popupShown") !== "true") {
    createPopup();
    sessionStorage.setItem("popupShown", "true");
  }

  // 4) Bitcoin "Coming Soon" alert
  const bitcoinDonate = document.getElementById("bitcoinDonate");
  const homeBitcoin = document.getElementById("homeBitcoinLogo");
  [bitcoinDonate, homeBitcoin].forEach(el => {
    if (el) {
      el.addEventListener("click", () => {
        alert("Coming soon");
      });
    }
  });

  // 5) Slideshow Logic (Multimedia page)
  const slides = document.querySelectorAll(".mySlide");
  let slideIndex = 0;
  
  function showSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === n);
      // Pause any video not active
      const media = slide.querySelector("video");
      if (media) {
        if (i === n) {
          media.play();
        } else {
          media.pause();
        }
      }
    });
  }

  if (slides.length > 0) {
    // Show first slide
    showSlide(slideIndex);

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
      });
      nextBtn.addEventListener("click", () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
      });
    }
  }
});
