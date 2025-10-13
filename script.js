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

  // Function to calculate header height
  const getHeaderHeight = () => {
    const header = document.querySelector('header');
    const topBanner = document.querySelector('.top-banner');
    const headerHeight = (header ? header.offsetHeight : 0) + (topBanner ? topBanner.offsetHeight : 0);
    return headerHeight || 0; // Fallback to 0 if elements are not found
  };

  // Function to handle scrolling to a target element
  const scrollToTarget = (targetId, delay = 0) => {
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = getHeaderHeight();
        let topPosition;

        // Special case for volunteerSection and contributeSection to align banner at the top
        if (targetId === 'volunteerSection' || targetId === 'contributeSection') {
          // Ensure we're targeting the banner itself
          const banner = targetElement.querySelector(targetId === 'volunteerSection' ? '.volunteer-banner' : '.contribute-banner');
          const elementToScroll = banner || targetElement; // Fallback to targetElement if banner not found
          topPosition = elementToScroll.getBoundingClientRect().top + window.pageYOffset - headerHeight - 5; // Small buffer
        } else {
          topPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10; // Default offset
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
        // Store the target ID in sessionStorage to handle after page load
        sessionStorage.setItem('scrollToTarget', targetId);
        window.location.href = href;
      } else if (targetId) {
        scrollToTarget(targetId);

        // Close the hamburger menu if open
        if (hamburger.classList.contains("active")) {
          hamburger.classList.remove("active");
          overlayBg.classList.remove("open");
          overlayPopup.classList.remove("open");
          document.body.classList.remove("no-scroll");
        }
      }
    });
  });

  // Handle scrolling on page load if there's a hash in the URL
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    scrollToTarget(hash, 100); // Small delay to ensure DOM is fully rendered
  }

  // Handle scrolling after page load if a target was stored in sessionStorage
  const storedTarget = sessionStorage.getItem('scrollToTarget');
  if (storedTarget) {
    scrollToTarget(storedTarget, 100); // Small delay to ensure DOM is fully rendered
    sessionStorage.removeItem('scrollToTarget'); // Clear the stored target
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

  // Dark Mode Toggle with Sun Button (Toggles between dark-mode and light-mode)
  // Dark Mode Toggle with Sun Button (Toggles between dark-mode and light-mode)
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const isDarkMode = document.body.classList.contains("dark-mode");
      if (isDarkMode) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        localStorage.setItem("darkMode", "false");
      } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      }
    });

    // Initialize based on localStorage or default to dark mode
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "false") {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
  }

// Add mobile dark mode toggle
document.addEventListener("DOMContentLoaded", function() {
  // Create mobile dark mode button
  const mobileToggle = document.createElement('button');
  mobileToggle.id = 'mobile-dark-mode-toggle';
  mobileToggle.innerHTML = '☀️';
  mobileToggle.style.position = 'fixed';
  mobileToggle.style.bottom = '20px';
  mobileToggle.style.right = '20px';
  mobileToggle.style.zIndex = '1500';
  mobileToggle.style.width = '40px';
  mobileToggle.style.height = '40px';
  mobileToggle.style.borderRadius = '50%';
  mobileToggle.style.background = '#F5E8C7';
  mobileToggle.style.color = '#2F4F4F';
  mobileToggle.style.display = 'none';
  mobileToggle.style.alignItems = 'center';
  mobileToggle.style.justifyContent = 'center';
  mobileToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  mobileToggle.style.border = 'none';
  document.body.appendChild(mobileToggle);
  
  // Show button only on mobile
  if (window.innerWidth <= 768) {
    mobileToggle.style.display = 'flex';
  }
  
  // Add click handler
  mobileToggle.addEventListener('click', function() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('darkMode', 'false');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    }
  });
});


// Popup for "What's Fotios Working On Right Now?"
// Popup for "What's Fotios Working On Right Now?"
document.addEventListener("DOMContentLoaded", function() {
  // Only show the popup on the homepage (index.html)
  if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    // Check if the popup has already been dismissed in this session
    const popupDismissed = sessionStorage.getItem('popupDismissed');
    if (popupDismissed) {
      return; // Don't show the popup if it was dismissed
    }

    // Create the popup element
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

    // Show the popup after 10 seconds
    setTimeout(() => {
      popup.classList.add("visible");
    }, 10000); // 10 seconds delay

    // Close the popup when the button is clicked
    const popupBtn = popup.querySelector(".popup-btn");
    popupBtn.addEventListener("click", () => {
      popup.classList.remove("visible");
      sessionStorage.setItem('popupDismissed', 'true'); // Mark as dismissed
    });

    // Close the popup when the "X" button is clicked
    const closeBtn = popup.querySelector(".popup-close-btn");
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("visible");
      sessionStorage.setItem('popupDismissed', 'true'); // Mark as dismissed
    });
  }
});


// ===============================================
// NEW - AI Apps Page Interactive Elements
// ===============================================
document.addEventListener("DOMContentLoaded", function() {

  // --- Interactive Project Cards Video Playback ---
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {
    const video = card.querySelector(".project-video-bg");
    if (video) {
      card.addEventListener("mouseenter", () => {
        // The .play() method returns a Promise. We should handle it.
        video.play().catch(error => {
          // This catch block prevents console errors on browsers that
          // block autoplay, even though it's muted.
          console.log("Video autoplay prevented: ", error);
        });
      });

      card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0; // Optional: Reset video to the start
      });
    }
  });


  // --- Typewriter Effect for Hero Section ---
  const typewriterElement = document.getElementById('hero-typewriter');
  if (typewriterElement) {
    const text = typewriterElement.innerHTML;
    typewriterElement.innerHTML = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typewriterElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80); // Adjust typing speed here (in ms)
      }
    }
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  }

});


// --- PPA Signup Form Logic ---
document.addEventListener('DOMContentLoaded', () => {
  const ppaForm = document.getElementById('ppa-signup-form');

  if (ppaForm) {
    const statusMessage = document.getElementById('form-status-message');
    const submitButton = document.getElementById('submit-button');

    ppaForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission
      
      // Disable button and show submitting message
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
      statusMessage.textContent = '';

      const formData = new FormData(ppaForm);
      const data = {
        firstName: formData.get('firstName'),
        email: formData.get('email'),
        zipCode: formData.get('zipCode'),
        involvement: {
          isUser: formData.has('isUser'),
          isPartner: formData.has('isPartner'),
          isVolunteer: formData.has('isVolunteer'),
        },
        howHeard: 'Personal Website', // We can hardcode the source
      };
      
      try {
        const response = await fetch('https://e9d086nusl.execute-api.us-east-2.amazonaws.com/prod/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          // If the server response is not OK, throw an error to be caught below
          const errorResult = await response.json();
          throw new Error(errorResult.message || 'An API error occurred.');
        }

        // If submission is successful, redirect to the share page
        window.location.href = 'https://poorpeople.app/share';

      } catch (error) {
        // If there's an error, display it to the user and re-enable the button
        statusMessage.textContent = `Error: ${error.message}`;
        statusMessage.style.color = 'red';
        submitButton.disabled = false;
        submitButton.textContent = 'Secure My Spot';
      }
    });
  }
});
