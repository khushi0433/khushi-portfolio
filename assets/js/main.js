
// Mobile Navigation
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

// Show menu
if (navToggle) {
  navToggle.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Toggle clicked") // Debug log
    navMenu.classList.add("show-menu")
  })
}

// Hide menu
if (navClose) {
  navClose.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Close clicked") // Debug log
    navMenu.classList.remove("show-menu")
  })
}

// Close menu when clicking on nav links
const navLink = document.querySelectorAll(".nav__link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  navMenu.classList.remove("show-menu")
}

navLink.forEach((n) => n.addEventListener("click", linkAction))

// Header scroll effect
function scrollHeader() {
  const header = document.getElementById("header")
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header")
  } else {
    header.classList.remove("scroll-header")
  }
}

window.addEventListener("scroll", scrollHeader)

// Wait for mixitup to load before initializing
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mixitup for project filtering
  if (typeof mixitup !== 'undefined') {
    const mixer = mixitup(".project__container", {
      selectors: {
        target: ".project__item",
      },
      animation: {
        duration: 300,
      },
    })
  }
  
  // Project category buttons
  const linkWork = document.querySelectorAll(".category__btn")
  
  function activeWork() {
    linkWork.forEach((a) => a.classList.remove("active-work"))
    this.classList.add("active-work")
  }
  
  linkWork.forEach((a) => a.addEventListener("click", activeWork))
})

// Active section highlighting
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset
  
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id")
    
    const navLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]")
    
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active-link")
      } else {
        navLink.classList.remove("active-link")
      }
    }
  })
}

window.addEventListener("scroll", scrollActive)

document.addEventListener('DOMContentLoaded', function() {
  if (typeof Swiper !== 'undefined') {
    var testiSwiper = new Swiper(".testimonial__container", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      mousewheel: true,
      keyboard: true,
    })
  }
})


document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('message').value.trim();
      const statusMessage = document.getElementById('contact-Message');

      if (!name || !email || !message) {
        statusMessage.textContent = '⚠️ Please fill in all fields.';
        return;
      }

      statusMessage.textContent = '⏳ Sending...';

      fetch('http://127.0.0.1:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            statusMessage.textContent = '✅ Message sent successfully!';
            contactForm.reset();
          } else {
            statusMessage.textContent = '❌ Failed: ' + (data.reason || 'Unknown error');
          }
        })
        .catch((err) => {
          console.error('Request error:', err);
          statusMessage.textContent = '❌ Network error. Please try again later.';
        });
    });
  }
});
