/* ==========================================================================
   LIVE WEB PLAYGROUND (INNOVATIVE FEATURE ⭐)
   Interactive In-Browser HTML / CSS / JS Sandbox for Evaluators
   ========================================================================== */

const PLAYGROUND_PRESETS = {
  glassCard: {
    title: "Bootstrap Glassmorphism Card",
    code: `<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 2rem;
      color: #ffffff;
      box-shadow: 0 15px 35px rgba(0,0,0,0.4);
      max-width: 380px;
      text-align: center;
      transition: transform 0.3s ease;
    }
    .glass-card:hover {
      transform: translateY(-6px);
      border-color: #6366f1;
    }
    .badge-glow {
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      color: white;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="glass-card">
    <span class="badge badge-glow rounded-pill px-3 py-2 mb-3">Live Interactive Preview</span>
    <h3 class="fw-bold">Pushti Dhupelia</h3>
    <p class="text-light opacity-75 small">Full-Stack Web Technology Engineer passionate about modern responsive UI/UX and dynamic systems.</p>
    <button class="btn btn-outline-info rounded-pill px-4 mt-2" onclick="alert('Hello from Pushti\\'s Live Sandbox!')">Test Action</button>
  </div>
</body>
</html>`
  },
  counter: {
    title: "Interactive JS State Counter",
    code: `<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: #0b0f19;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: system-ui, sans-serif;
    }
    .counter-box {
      background: #111827;
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid #374151;
      text-align: center;
      width: 320px;
    }
    .count-display {
      font-size: 3.5rem;
      font-weight: 800;
      color: #38bdf8;
      transition: all 0.2s;
    }
  </style>
</head>
<body>
  <div class="counter-box shadow-lg">
    <h6 class="text-secondary text-uppercase fw-bold mb-3">Interactive Counter</h6>
    <div id="countDisplay" class="count-display mb-4">0</div>
    <div class="d-flex justify-content-center gap-2">
      <button class="btn btn-danger px-3" onclick="update(-1)">- 1</button>
      <button class="btn btn-secondary px-3" onclick="reset()">Reset</button>
      <button class="btn btn-success px-3" onclick="update(1)">+ 1</button>
    </div>
  </div>

  <script>
    let val = 0;
    const disp = document.getElementById('countDisplay');
    function update(d) {
      val += d;
      disp.textContent = val;
      disp.style.transform = 'scale(1.15)';
      setTimeout(() => disp.style.transform = 'scale(1)', 150);
    }
    function reset() {
      val = 0;
      disp.textContent = val;
    }
  </script>
</body>
</html>`
  },
  glowBadge: {
    title: "Vibrant Glowing Buttons & Badges",
    code: `<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 1rem;
      flex-wrap: wrap;
      font-family: system-ui, sans-serif;
    }
    .neon-btn {
      position: relative;
      padding: 12px 28px;
      color: #fff;
      font-weight: 700;
      border: none;
      border-radius: 12px;
      background: linear-gradient(135deg, #ec4899, #8b5cf6);
      box-shadow: 0 0 20px rgba(236, 72, 153, 0.45);
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .neon-btn:hover {
      box-shadow: 0 0 35px rgba(236, 72, 153, 0.8);
      transform: translateY(-3px) scale(1.03);
    }
    .cyan-btn {
      background: linear-gradient(135deg, #06b6d4, #10b981);
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.45);
    }
    .cyan-btn:hover {
      box-shadow: 0 0 35px rgba(6, 182, 212, 0.8);
    }
  </style>
</head>
<body>
  <button class="neon-btn" onclick="this.textContent = 'Awesome! ✨'">Hover & Click Me</button>
  <button class="neon-btn cyan-btn" onclick="this.textContent = 'Super Fast 🚀'">Web Tech 2026</button>
</body>
</html>`
  }
};

function initPlayground() {
  const codeTextarea = document.getElementById('playgroundCode');
  const previewFrame = document.getElementById('playgroundPreview');
  const runBtn = document.getElementById('playgroundRunBtn');
  const resetBtn = document.getElementById('playgroundResetBtn');
  const presetSelect = document.getElementById('playgroundPreset');

  if (!codeTextarea || !previewFrame) return;

  function runCode() {
    const code = codeTextarea.value;
    previewFrame.srcdoc = code;
  }

  function loadPreset(presetKey) {
    if (PLAYGROUND_PRESETS[presetKey]) {
      codeTextarea.value = PLAYGROUND_PRESETS[presetKey].code;
      runCode();
    }
  }

  // Initial run with default preset
  loadPreset('glassCard');

  if (runBtn) {
    runBtn.addEventListener('click', runCode);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      loadPreset(presetSelect ? presetSelect.value : 'glassCard');
    });
  }

  if (presetSelect) {
    presetSelect.addEventListener('change', (e) => {
      loadPreset(e.target.value);
    });
  }
}

document.addEventListener('DOMContentLoaded', initPlayground);
