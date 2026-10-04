/* ==========================================================================
   PUSHTI DHUPELIA - MAIN INTERACTION CONTROLLER
   Web Technology Assignment: HTML5, Bootstrap 5 & Vanilla JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavbarBehavior();
  initSkillsFilterAndAnimation();
  initProjectFilterAndSearch();
  initProjectModals();
  initContactForm();
  initBackToTop();
  initEvaluatorTour();
  initCurrentYear();
});

/* --- 1. Theme Switcher (Dark / Light Mode) --- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const storedTheme = localStorage.getItem('pushti_portfolio_theme') || 'dark';

  setTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pushti_portfolio_theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'bi bi-moon-stars-fill';
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      } else {
        themeIcon.className = 'bi bi-sun-fill text-warning';
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    }
  }

  // Expose to evaluator bar
  window.togglePortfolioTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };
}

/* --- 2. Dynamic Typing Effect --- */
function initTypingEffect() {
  const typingEl = document.getElementById('typingRole');
  if (!typingEl) return;

  const roles = [
    "Full-Stack Web Developer",
    "UI/UX & Frontend Specialist",
    "Computer Science Engineer",
    "Creative Problem Solver",
    "AI & Web Tech Innovator"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const delayBetween = 1800;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentRole.length) {
      speed = delayBetween;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }

  type();
}

/* --- 3. Navbar Behavior & Mobile Auto-Close --- */
function initNavbarBehavior() {
  const navbar = document.querySelector('.custom-navbar');
  const navCollapse = document.getElementById('navbarContent');
  const navLinks = document.querySelectorAll('.nav-link-custom');

  // Shrink navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // Auto close mobile navbar collapse when clicking link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* --- 4. Skills Filter & Progress Animation --- */
function initSkillsFilterAndAnimation() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-item-col');
  const progressBars = document.querySelectorAll('.skill-progress-fill');

  // Intersection Observer for animating progress bars
  const skillsSection = document.getElementById('skills');
  if (skillsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-target-width') || '85%';
            bar.style.width = targetWidth;
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
  } else {
    // Fallback
    progressBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-target-width') || '85%';
    });
  }

  // Filter skills by category
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* --- 5. Projects Filter & Real-Time Search --- */
function initProjectFilterAndSearch() {
  const projectCards = document.querySelectorAll('.project-card-col');
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const searchInput = document.getElementById('projectSearchInput');
  const noResultsMsg = document.getElementById('noProjectsFound');

  let activeFilter = 'all';
  let searchTerm = '';

  function applyFilterAndSearch() {
    let visibleCount = 0;

    projectCards.forEach(col => {
      const category = col.getAttribute('data-category') || '';
      const title = col.getAttribute('data-title') || '';
      const tags = col.getAttribute('data-tags') || '';
      const desc = col.getAttribute('data-desc') || '';

      const fullContent = (title + ' ' + tags + ' ' + desc).toLowerCase();
      const matchesCategory = activeFilter === 'all' || category.includes(activeFilter);
      const matchesSearch = !searchTerm || fullContent.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        col.style.display = 'block';
        setTimeout(() => { col.style.opacity = '1'; col.style.transform = 'scale(1)'; }, 50);
        visibleCount++;
      } else {
        col.style.opacity = '0';
        col.style.transform = 'scale(0.96)';
        setTimeout(() => { col.style.display = 'none'; }, 200);
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      applyFilterAndSearch();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilterAndSearch();
    });
  }
}

/* --- 6. Project Quick Preview Modal Data --- */
const PROJECT_DETAILS = {
  aiReviewer: {
    title: "AI Code Reviewer & Syntax Assistant",
    category: "AI & Web Tech",
    badge: "AI Powered",
    image: "assets/images/project-ai-reviewer.svg",
    description: "An intelligent web application that evaluates JavaScript & Python code syntax in real-time. It highlights complex loops, estimates time/space complexity (Big-O), and suggests cleaner ES6+ optimizations with step-by-step logic explanations.",
    features: [
      "Real-time syntax validation and code structure parsing",
      "Algorithmic complexity estimator (Big-O notation)",
      "Automated suggestions for async/await & modern ES6 clean code",
      "Interactive code copy and export options"
    ],
    stack: ["HTML5", "Bootstrap 5.3", "Vanilla JavaScript", "REST API", "Regex Lexer"],
    github: "https://github.com/Pushti-Dhupelia/Pushti-hackathon",
    demoStatus: "Active Demonstration"
  },
  omniMart: {
    title: "OmniMart - Modern E-Commerce Platform",
    category: "Full-Stack Web App",
    badge: "Featured Store",
    image: "assets/images/project-omnimart.svg",
    description: "A fast, responsive e-commerce web platform featuring live product catalog filtering by category/price, an interactive cart drawer with dynamic quantity updates, coupon calculation, and persistent storage using LocalStorage.",
    features: [
      "Dynamic product search with instant live keyword filtering",
      "Offcanvas interactive shopping cart with live subtotal calculation",
      "Promo code validator and free shipping tier indicator",
      "Persistent cart state preserved via HTML5 LocalStorage"
    ],
    stack: ["HTML5", "Bootstrap 5.3", "JavaScript ES6", "LocalStorage API", "CSS Grid"],
    github: "https://github.com/Pushti-Dhupelia",
    demoStatus: "Interactive Preview"
  },
  ecoTracker: {
    title: "EcoTracker - Carbon Footprint & Green Habits",
    category: "Data Visualization & Web App",
    badge: "Sustainability",
    image: "assets/images/project-ecotracker.svg",
    description: "A data-driven sustainability dashboard that helps users measure their daily carbon footprint from transportation, electricity, and dietary choices. Features animated metrics, goal milestones, and custom badges.",
    features: [
      "Interactive slider calculator for daily travel and power usage",
      "Dynamic visual analytics with emission level breakdown",
      "Achievement milestone system with unlockable green badges",
      "Personalized actionable tips to reduce carbon emissions"
    ],
    stack: ["HTML5", "Bootstrap 5", "JavaScript (DOM & Canvas)", "CSS Animations"],
    github: "https://github.com/Pushti-Dhupelia",
    demoStatus: "Dashboard Ready"
  },
  devConnect: {
    title: "DevConnect - Tech Collaboration & Forum",
    category: "Community Platform",
    badge: "Web Platform",
    image: "assets/images/project-devconnect.svg",
    description: "A collaborative social prototype for student developers to showcase their semester projects, post hackathon teammate requests, and discover like-minded contributors based on tech stack tags.",
    features: [
      "Skill-tag based project matchmaking (#javascript, #bootstrap5)",
      "Interactive upvote and bookmarking system",
      "Clean profile card views with GitHub integration",
      "Responsive community discussion threads"
    ],
    stack: ["HTML5", "Bootstrap 5", "JavaScript ES6", "JSON Data Simulation"],
    github: "https://github.com/Pushti-Dhupelia",
    demoStatus: "Community Hub"
  },
  taskFlow: {
    title: "TaskFlow - Agile Kanban Productivity Suite",
    category: "Productivity Tool",
    badge: "Workflow Tool",
    image: "assets/images/project-taskflow.svg",
    description: "An interactive Kanban board built with modern web technologies that allows users to organize academic assignments and software development sprints into To Do, In Progress, and Completed states.",
    features: [
      "Interactive task state toggling with instant counter updates",
      "Priority badges (Urgent, High, Medium, Low)",
      "Search and filter tasks by sprint deadlines",
      "Responsive multi-column Kanban layout across devices"
    ],
    stack: ["HTML5", "Bootstrap 5", "JavaScript DOM Events", "CSS Flexbox"],
    github: "https://github.com/Pushti-Dhupelia",
    demoStatus: "Productivity Ready"
  },
  weather: {
    title: "SkyPulse - Weather & Air Quality Dashboard",
    category: "Utility Web App",
    badge: "Live API Tool",
    image: "assets/images/project-weather.svg",
    description: "A sleek atmospheric weather dashboard that displays real-time weather metrics, multi-day forecasts, temperature trends, and air quality health indexes with dynamic day/night theme effects.",
    features: [
      "Simulated real-time meteorological API data stream",
      "5-Day forecast cards with high/low temperature metrics",
      "Air Quality Index (AQI) rating with health advisory chips",
      "Dynamic SVG icons and animated weather condition cards"
    ],
    stack: ["HTML5", "Bootstrap 5", "JavaScript Async/Await", "Fetch API"],
    github: "https://github.com/Pushti-Dhupelia",
    demoStatus: "Live Widget"
  }
};

function initProjectModals() {
  const modalEl = document.getElementById('projectDetailsModal');
  if (!modalEl) return;

  const modalTitle = document.getElementById('projectModalTitle');
  const modalImg = document.getElementById('projectModalImg');
  const modalBadge = document.getElementById('projectModalBadge');
  const modalDesc = document.getElementById('projectModalDesc');
  const modalFeatures = document.getElementById('projectModalFeatures');
  const modalStack = document.getElementById('projectModalStack');
  const modalGithub = document.getElementById('projectModalGithub');

  document.querySelectorAll('.open-project-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project-key');
      const data = PROJECT_DETAILS[projKey];
      if (!data) return;

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalImg) {
        modalImg.src = data.image;
        modalImg.alt = data.title;
      }
      if (modalBadge) modalBadge.textContent = data.badge;
      if (modalDesc) modalDesc.textContent = data.description;

      if (modalFeatures) {
        modalFeatures.innerHTML = data.features.map(f => `<li><i class="bi bi-check2-circle text-success me-2"></i>${f}</li>`).join('');
      }

      if (modalStack) {
        modalStack.innerHTML = data.stack.map(s => `<span class="tech-tag">${s}</span>`).join(' ');
      }

      if (modalGithub) {
        modalGithub.href = data.github;
      }

      const bsModal = new bootstrap.Modal(modalEl);
      bsModal.show();
    });
  });
}

/* --- 7. Contact Form Validation & Submission Simulation --- */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const toastEl = document.getElementById('contactSuccessToast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Valid form: simulate sending
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending message...`;

    // Save message to localStorage
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    const storedMessages = JSON.parse(localStorage.getItem('pushti_contact_messages') || '[]');
    storedMessages.push({
      name, email, subject, message,
      date: new Date().toISOString()
    });
    localStorage.setItem('pushti_contact_messages', JSON.stringify(storedMessages));

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> Sent Successfully!`;
      submitBtn.classList.remove('btn-primary-gradient');
      submitBtn.classList.add('btn-success');

      if (toastEl) {
        const bsToast = new bootstrap.Toast(toastEl, { delay: 4500 });
        bsToast.show();
      }

      form.reset();
      form.classList.remove('was-validated');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-primary-gradient');
      }, 3500);
    }, 900);
  });
}

/* --- 8. Back to Top Button --- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- 9. Evaluator Quick Tour Controller --- */
function initEvaluatorTour() {
  const rubricBtn = document.getElementById('evaluatorRubricBtn');
  const rubricModalEl = document.getElementById('evaluatorRubricModal');

  if (rubricBtn && rubricModalEl) {
    rubricBtn.addEventListener('click', () => {
      const modal = new bootstrap.Modal(rubricModalEl);
      modal.show();
    });
  }
}

/* --- 10. Dynamic Current Year --- */
function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
