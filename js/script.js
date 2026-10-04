// ==========================================
// PUSHTI DHUPELIA - PORTFOLIO JAVASCRIPT
// Simple, clean, and easy to explain!
// ==========================================

// 1. Theme Toggle (Dark Mode / Light Mode)
// Uses Bootstrap 5.3's native "data-bs-theme" attribute
function toggleTheme() {
  const htmlTag = document.documentElement;
  const currentTheme = htmlTag.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  htmlTag.setAttribute('data-bs-theme', newTheme);
  
  // Update the button icon
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = newTheme === 'dark' ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-fill';
  }
}

// 2. Typing Effect in Hero Section
const roles = ["Web Developer", "Frontend Designer", "Computer Science Student"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  const typingElement = document.getElementById("typingText");
  
  if (!typingElement) return;

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingElement.textContent = currentRole.substring(0, charIndex);

  let speed = isDeleting ? 60 : 120;

  // Finished typing current word
  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1500; // Pause at end of word
    isDeleting = true;
  } 
  // Finished deleting current word
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

// 3. Project Filter (All, Web, JavaScript)
function filterProjects(category, event) {
  const cards = document.querySelectorAll('.project-item');
  const buttons = document.querySelectorAll('.filter-btn');

  // Update active button style
  buttons.forEach(btn => btn.classList.remove('active', 'btn-primary'));
  buttons.forEach(btn => btn.classList.add('btn-outline-primary'));
  if (event && event.target) {
    event.target.classList.add('active', 'btn-primary');
    event.target.classList.remove('btn-outline-primary');
  }

  // Show/Hide project cards based on category
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// 4. Contact Form Submission Alert
document.addEventListener('DOMContentLoaded', () => {
  typeEffect();

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Stop normal form submit reload
      const name = document.getElementById('userName').value;
      alert(`Thank you, ${name}! Your message has been received.`);
      form.reset(); // Clear input fields
    });
  }
});
