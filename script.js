// Bhojaraj Portfolio — Aesthetic interactions

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const backToTop = document.querySelector("#backToTop");
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }

  // Navbar + back-to-top
  const updateScrollUI = () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 30);
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 500);
  };

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  // Scroll spy
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Scroll reveal
  const revealItems = document.querySelectorAll(
    ".section, .project-card, .certificate-card, .experience-card, .skill-card"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      revealObserver.observe(item);
    });
  }

  // Back to top
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Contact form validation
  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !name || !email || !message ||
        !name.value.trim() ||
        !validEmail.test(email.value.trim()) ||
        !message.value.trim()
      ) {
        event.preventDefault();
        alert("Please enter your name, a valid email, and your message.");
      }
    });
  }

  // Current year
  const year = document.querySelector("#currentYear");
  if (year) year.textContent = new Date().getFullYear();
});
