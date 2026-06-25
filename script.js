// === NAV: scroll shadow ===
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// === NAV: mobile toggle ===
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// === NAV: active link on scroll ===
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

// === SCROLL ANIMATIONS (fade-in) ===
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// === THEME TOGGLE ===
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
