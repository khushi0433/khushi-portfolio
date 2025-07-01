const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

// Show menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

const navLink = document.querySelectorAll(".nav__link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  navMenu.classList.remove("show-menu")
}

navLink.forEach((n) => n.addEventListener("click", linkAction))

function scrollHeader() {
  const header = document.getElementById("header")

  if (window.scrollY >= 50) {
    header.classList.add("scroll-header")
  } else {
    header.classList.remove("scroll-header")
  }
}

window.addEventListener("scroll", scrollHeader)

// Declare mixitup variable before using it
const mixitup = window.mixitup

const mixer = mixitup(".project__container", {
  selectors: {
    target: ".project__item",
  },
  animation: {
    duration: 300,
  },
})

const linkWork = document.querySelectorAll(".category__btn")

function activeWork() {
  linkWork.forEach((a) => a.classList.remove("active-work"))
  this.classList.add("active-work")
}

linkWork.forEach((a) => a.addEventListener("click", activeWork))


const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link")
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link")
    }
  })
}

window.addEventListener("scroll", scrollActive)


const Swiper = window.Swiper

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

// contact form
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault()
  const name = document.getElementById("contact-name").value.trim()
  const email = document.getElementById("contact-email").value.trim()
  const message = document.getElementById("message").value.trim()
  const statusMessage = document.getElementById("contact-Message")

  statusMessage.textContent = "Sending..."

  try {
    const res = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })

    const data = await res.json()

    if (data.status === "success") {
      statusMessage.textContent = "✅ Message sent successfully!"
      document.getElementById("contact-form").reset()
      setTimeout(() => {
        statusMessage.classList.add("hidden")
        setTimeout(() => {
          statusMessage.textContent = ""
          statusMessage.classList.remove("hidden")
        }, 500)
      }, 4000)
    } else {
      statusMessage.textContent = "❌ Failed to send message."
    }
  } catch (error) {
    console.error("Error:", error)
    statusMessage.textContent = "⚠️ Server error. Try again later."
  }
})
