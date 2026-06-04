
    // Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  html.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
} else if (systemPrefersDark) {
  html.dataset.theme = 'dark';
  themeToggle.textContent = '☀️ Light';
} else {
  // Ensure an explicit default so the toggle and CSS variables behave predictably
  html.dataset.theme = 'light';
  themeToggle.textContent = '🌙 Dark';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
  // Update accessible label
  themeToggle.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// Animated hero text
const heroTagline = document.getElementById('heroTagline');
const heroPhrases = [
  'Building responsive, accessible websites one small project at a time.',
  'Learning JavaScript and React while improving my design instincts.',
  'Enjoying clean code, thoughtful UI, and beginner-friendly progress.'
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeHeroText() {
  const currentPhrase = heroPhrases[phraseIndex];

  if (deleting) {
    heroTagline.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % heroPhrases.length;
    }
  } else {
    heroTagline.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeHeroText, 1600);
      return;
    }
  }

  setTimeout(typeHeroText, deleting ? 40 : 60);
}

typeHeroText();

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach((element) => revealObserver.observe(element));

// Set progress bar widths without inline styles
document.querySelectorAll('.progress-fill').forEach((bar) => {
  bar.style.width = `${bar.dataset.progress}%`;
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

// Contact form feedback
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please complete all fields before sending your message.';
    formStatus.className = 'form-status error';
    return;
  }

  formStatus.textContent = `Thanks ${name}! Your message is ready to send.`;
  formStatus.className = 'form-status success';
  contactForm.reset();
});