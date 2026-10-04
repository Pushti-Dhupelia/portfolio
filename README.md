# 🌟 Pushti Dhupelia - Web Technology Portfolio

A simple, responsive, and innovative personal portfolio website built with **HTML5**, **Bootstrap 5.3**, and **Vanilla JavaScript**.

---

## 🔗 Live Hosted Link
- **Live Website:** [https://pushti-dhupelia.github.io/portfolio/](https://pushti-dhupelia.github.io/portfolio/)
- **GitHub Repository:** [https://github.com/Pushti-Dhupelia/portfolio](https://github.com/Pushti-Dhupelia/portfolio)

---

## 📁 Clean & Short Project Structure

```
wt_folder/
├── index.html            # Main webpage with clean semantic sections
├── css/
│   └── style.css         # Minimal styling (under 60 lines)
├── js/
│   └── script.js         # Simple, readable JavaScript (under 80 lines)
├── assets/
│   └── images/           # Profile photo and project preview graphics
└── README.md             # Project documentation & explanation guide
```

---

## 💡 How to Explain This Project to Your Sir (Quick Guide)

### 1. Structure (HTML5 & Bootstrap 5.3)
> *"Sir, I built the structure using semantic HTML5 tags: `<nav>`, `<header>`, `<section>`, and `<footer>`.*
> *I used Bootstrap 5.3's grid system (`container`, `row`, `col-md-6`, `col-lg-4`) so that the cards and layout automatically adapt from mobile phones to laptops."*

### 2. Dark & Light Mode (`toggleTheme()`)
> *"Sir, in `js/script.js`, I utilized Bootstrap 5.3's native `data-bs-theme` attribute on the `<html>` tag.*
> *When the button is clicked, it checks if the current theme is 'dark' or 'light', toggles the attribute, and updates the icon."*

### 3. Typing Effect (`typeEffect()`)
> *"Sir, the hero headline uses a clean typing animation in JavaScript. It reads an array of roles, adds letters one by one using `setTimeout()`, pauses, deletes them, and moves to the next role."*

### 4. Project Filter (`filterProjects()`)
> *"Sir, the projects section allows filtering between 'All', 'Web Apps', and 'JavaScript Tools'. The function selects all cards using `querySelectorAll('.project-item')` and compares their `data-category` attribute with the chosen category, setting `style.display = 'block'` or `'none'`."*

### 5. Contact Form (`submit event`)
> *"Sir, the contact form uses `event.preventDefault()` to prevent unnecessary page reloads, captures the user's name, shows a polite confirmation alert, and resets the input fields."*

---

## 📊 Summary of Portfolio Sections
1. **Navbar**: Responsive menu with brand logo, smooth navigation links, and theme toggle button.
2. **Hero Section**: Welcoming headline, dynamic typing effect, intro text, and action buttons.
3. **About Me**: Academic summary (B.Tech in CSE, 9.2 CGPA), quick stats, and social links.
4. **Skills Matrix**: Responsive cards with colored Bootstrap progress bars (HTML, Bootstrap, JS, Python, MySQL, Git).
5. **Projects**: Interactive category filter showcasing 4 projects with preview graphics and GitHub links.
6. **Education & Certifications**: Academic timeline and verified web technology certifications.
7. **Contact**: User-friendly message form and direct contact info (`pushtidhupelia@gmail.com`).
8. **Footer**: Clean copyright and assignment attribution.
