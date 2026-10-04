/* ==========================================================================
   VIRTUAL AI PORTFOLIO ASSISTANT ("PUSHTI BOT")
   Interactive Conversational Guide for Evaluators & Visitors
   ========================================================================== */

const BOT_KNOWLEDGE_BASE = {
  greetings: {
    patterns: ['hi', 'hello', 'hey', 'start', 'who are you', 'help'],
    reply: "Hello! I am Pushti's Virtual AI Portfolio Assistant. Ask me anything about Pushti's web technology projects, skills, education, or get in touch!"
  },
  skills: {
    patterns: ['skill', 'stack', 'technologies', 'tools', 'languages', 'frontend', 'backend'],
    reply: "Pushti's core stack includes: 💻 <strong>Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), Bootstrap 5.3, Responsive UI.<br>⚙️ <strong>Backend & Systems:</strong> Python, Node.js basics, RESTful APIs.<br>🗄️ <strong>Databases:</strong> MySQL, MongoDB.<br>🛠️ <strong>DevOps & Tools:</strong> Git, GitHub, VS Code, Postman."
  },
  projects: {
    patterns: ['project', 'work', 'portfolio', 'built', 'apps'],
    reply: "Key featured projects:<br>1. <strong>AI Code Reviewer:</strong> Real-time syntax and complexity analyzer.<br>2. <strong>OmniMart:</strong> Full responsive e-commerce platform with dynamic cart.<br>3. <strong>EcoTracker:</strong> Carbon footprint analytics dashboard.<br>4. <strong>DevConnect:</strong> Developer collaboration forum.<br>Scroll to the <em>Projects</em> section or use the live filters to explore!"
  },
  education: {
    patterns: ['education', 'degree', 'college', 'university', 'cgpa', 'marks', 'academic'],
    reply: "🎓 <strong>Education:</strong> Pushti is pursuing a Bachelor of Technology (B.Tech) in Computer Science & Engineering (2022 - 2026) with an outstanding academic record (9.2+ CGPA). Relevant coursework includes Web Technologies, DSA, DBMS, and Software Engineering."
  },
  contact: {
    patterns: ['contact', 'email', 'hire', 'phone', 'message', 'reach', 'github'],
    reply: "You can reach Pushti directly at:<br>📧 <strong>Email:</strong> <a href='mailto:pushtidhupelia@gmail.com' class='text-info'>pushtidhupelia@gmail.com</a><br>🐙 <strong>GitHub:</strong> <a href='https://github.com/Pushti-Dhupelia' target='_blank' class='text-info'>github.com/Pushti-Dhupelia</a><br>Or use the contact form at the bottom of the page!"
  },
  resume: {
    patterns: ['resume', 'cv', 'download'],
    reply: "You can view and download Pushti's verified resume by clicking the <strong>'Download CV'</strong> button in the navigation bar or Hero section!"
  },
  innovative: {
    patterns: ['innovative', 'why', 'unique', 'feature'],
    reply: "🚀 <strong>Innovative Features in this Portfolio:</strong><br>• In-browser Live Code Sandbox (test HTML/Bootstrap/JS live!)<br>• Interactive Virtual AI Assistant (you're chatting with me!)<br>• Real-time Project Search & Multi-category Filter<br>• Dynamic Light/Dark Theme Switcher with persistence<br>• Interactive Skills proficiency breakdown."
  }
};

function initChatbot() {
  const triggerBtn = document.getElementById('aiBotTrigger');
  const panel = document.getElementById('aiBotPanel');
  const closeBtn = document.getElementById('botCloseBtn');
  const inputField = document.getElementById('botInputField');
  const sendBtn = document.getElementById('botSendBtn');
  const messagesWrap = document.getElementById('botMessagesWrap');
  const chips = document.querySelectorAll('.bot-chip');
  const pingBadge = document.querySelector('.bot-ping-badge');

  if (!triggerBtn || !panel || !messagesWrap) return;

  function togglePanel() {
    panel.classList.toggle('active');
    if (pingBadge) pingBadge.style.display = 'none';
    if (panel.classList.contains('active') && inputField) {
      setTimeout(() => inputField.focus(), 200);
    }
  }

  triggerBtn.addEventListener('click', togglePanel);
  if (closeBtn) closeBtn.addEventListener('click', () => panel.classList.remove('active'));

  function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `bot-msg ${isUser ? 'bot-msg-user' : 'bot-msg-bot'}`;
    msgDiv.innerHTML = text;
    messagesWrap.appendChild(msgDiv);
    messagesWrap.scrollTop = messagesWrap.scrollHeight;
  }

  function handleUserInput(query) {
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    appendMessage(query, true);
    if (inputField) inputField.value = '';

    // Show simulated typing indicator
    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'bot-msg bot-msg-bot small text-secondary';
    typingDiv.innerHTML = '<em>Pushti Bot is typing...</em>';
    messagesWrap.appendChild(typingDiv);
    messagesWrap.scrollTop = messagesWrap.scrollHeight;

    setTimeout(() => {
      const el = document.getElementById(typingId);
      if (el) el.remove();

      let matchedReply = null;
      for (const key in BOT_KNOWLEDGE_BASE) {
        const item = BOT_KNOWLEDGE_BASE[key];
        if (item.patterns.some(p => clean.includes(p))) {
          matchedReply = item.reply;
          break;
        }
      }

      if (!matchedReply) {
        matchedReply = "I'm not sure about that, but feel free to ask about Pushti's <strong>Skills</strong>, <strong>Projects</strong>, <strong>Education</strong>, or how to <strong>Contact</strong> her!";
      }

      appendMessage(matchedReply, false);
    }, 450);
  }

  if (sendBtn && inputField) {
    sendBtn.addEventListener('click', () => handleUserInput(inputField.value));
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUserInput(inputField.value);
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt') || chip.textContent;
      handleUserInput(promptText);
    });
  });
}

document.addEventListener('DOMContentLoaded', initChatbot);
