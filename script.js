// script.js

document.addEventListener("DOMContentLoaded", function() {
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  /* 1) Transparent Header on Mobile Scroll (Unity style) */
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

  /* 2) Hamburger -> Overlay (Adapted from Fotios's code) */
  const overlayBg = document.createElement("div");
  overlayBg.classList.add("overlay-bg");
  document.body.appendChild(overlayBg);

  const overlayPopup = document.createElement("div");
  overlayPopup.classList.add("overlay-popup");
  document.body.appendChild(overlayPopup);

  // Build overlay menu from navLinks
  let overlayMenuHTML = '';
  navLinks.querySelectorAll("a").forEach(link => {
    const isActive = link.classList.contains("active") ? 'active' : '';
    const href = link.getAttribute('href');
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

  /* 3) 10-Second Popup for Shop & Contribute (Unity style) */
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

  /* 4) Bitcoin "Coming Soon" alert */
  const bitcoinDonate = document.getElementById("bitcoinDonate");
  const homeBitcoin = document.getElementById("homeBitcoinLogo");
  [bitcoinDonate, homeBitcoin].forEach(el => {
    if (el) {
      el.addEventListener("click", () => {
        alert("Coming soon");
      });
    }
  });

});
