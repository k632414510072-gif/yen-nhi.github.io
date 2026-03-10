/**
 * script.js  –  Yen Nhi Portfolio
 *
 * Features:
 *  1. Mobile navigation toggle (hamburger → X)
 *  2. Navbar style change on scroll (add .scrolled class)
 *  3. Scroll-based fade-in animation for .fade-in elements
 *  4. Active nav-link highlight based on current section
 *  5. Close mobile menu when a nav link is clicked
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. MOBILE NAV TOGGLE ─────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    // Toggle open state on both the button and the menu
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close the mobile menu when any link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* ── 2. NAVBAR SCROLL STYLE ───────────────────────────── */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    // Add .scrolled when user has scrolled more than 20px
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load


  /* ── 3. SCROLL FADE-IN ANIMATIONS ────────────────────── */
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,           // observe relative to the viewport
    rootMargin: '0px',
    threshold: 0.12       // trigger when 12% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once animated, no need to keep observing
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));


  /* ── 4. ACTIVE NAV LINK HIGHLIGHT ────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const activateNavLink = () => {
    // Current scroll position with a 100px offset for the fixed navbar
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        allNavLinks.forEach(link => {
          link.classList.remove('active');
          // Match the href (#sectionId) with the section id
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNavLink, { passive: true });
  activateNavLink(); // run once on load


  /* ── 5. SMOOTH SCROLL POLYFILL (for older browsers) ─── */
  // Modern browsers already support CSS scroll-behavior: smooth
  // This polyfill handles the edge case for browsers that don't
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return; // skip empty hash links

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

}); // end DOMContentLoaded
