// scripts.js

// Theme color pills logic
function setColorTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('bbs-color-theme', theme);
  document.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-theme') === theme));
}

(() => {
  const saved = localStorage.getItem('bbs-color-theme') || 'blue';
  setColorTheme(saved);
})();

document.querySelectorAll('.pill').forEach(p => {
  p.onclick = () => setColorTheme(p.getAttribute('data-theme'));
});

// Theme mode toggle logic (dark/light)
const setTheme = mode => {
  document.body.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('bbs-theme', mode);
  for (const btn of [document.getElementById('theme-toggle')]) {
    if (!btn) continue;
    btn.innerHTML = mode === 'dark'
      ? '<i class="ri-sun-line"></i>'
      : '<i class="ri-moon-clear-line"></i>';
  }
};

const toggleTheme = () => {
  const dark = !document.body.classList.contains('dark');
  setTheme(dark ? 'dark' : 'light');
};

const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) themeToggleBtn.onclick = toggleTheme;

(() => {
  const saved = localStorage.getItem('bbs-theme');
  if (saved) setTheme(saved);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  else setTheme('light');
})();

// AI Assistant sidebar (simple demo)
function showAISidebar() {
  if (document.getElementById('ai-sidebar')) return;
  const sidebar = document.createElement('div');
  sidebar.id = 'ai-sidebar';
  sidebar.innerHTML = `
    <style>
      #ai-sidebar {
        position: fixed; right: 0; top: 0; height: 100vh; width: 320px; max-width: 90vw;
        background: linear-gradient(135deg,#23263b 60%,var(--theme) 100%);
        color: #fff; z-index: 210; box-shadow: -2px 0 18px var(--theme, #8cc2ff40);
        display: flex; flex-direction: column;
        animation: fadeInSidebar .3s ease forwards;
      }
      @keyframes fadeInSidebar {
        from {opacity: 0; right: -40px;}
        to {opacity: 1; right: 0;}
      }
      #ai-sidebar .header {
        background: #23263b;
        padding: 16px 20px;
        font-size: 1.1em;
        font-weight: 700;
        border-bottom: 1.2px solid #8cc2ff40;
        display: flex; justify-content: space-between; align-items: center;
      }
      #ai-sidebar .close-btn {
        background: none; border: none; color: #fff; font-size: 1.3em; cursor: pointer;
      }
      #ai-chat-log {
        flex: 1; overflow-y: auto; padding: 10px 15px;
        font-size: 0.95rem;
      }
      #ai-sidebar .footer {
        padding: 10px 15px;
        border-top: 1px solid #8cc2ff36;
      }
      #ai-input-bar {
        width: 100%; padding: 0.5em 0.75em; border-radius: 6px;
        border: none; outline: none; background: #202442; color: #fff;
        font-size: 1rem;
      }
      #ai-input-bar:focus { background: #2a2d47; }
      #ai-sidebar .ai-bubble {
        background: var(--theme, #8cc2ff);
        color: #fff;
        border-radius: 14px 14px 2px 14px;
        padding: 0.5em 0.9em;
        margin: 0.25em 0;
        box-shadow: 0 1.5px 7px var(--theme, #8cc2ff1b);
        animation: bubbleIn .2s ease forwards;
      }
      @keyframes bubbleIn {
        from {opacity: 0; transform: scale(0.9);}
        to {opacity: 1; transform: scale(1);}
      }
    </style>
    <div class="header">
      <span><i class="ri-robot-2-line"></i> Billing Pro AI</span>
      <button class="close-btn" onclick="document.body.removeChild(document.getElementById('ai-sidebar'))"><i class="ri-close-line"></i></button>
    </div>
    <div id="ai-chat-log">
      <div class="ai-bubble">Hi! I’m your AI assistant. Ask me anything about Business Billing System.</div>
    </div>
    <div class="footer">
      <form onsubmit="return sendAIMessage();">
        <input id="ai-input-bar" type="text" placeholder="Type your question..." autocomplete="off"/>
      </form>
    </div>
  `;
  document.body.appendChild(sidebar);
  document.getElementById('ai-input-bar').focus();
}

window.showAISidebar = showAISidebar;

window.sendAIMessage = function() {
  const input = document.getElementById('ai-input-bar');
  const log = document.getElementById('ai-chat-log');
  if (!input.value.trim()) return false;

  const userBubble = document.createElement('div');
  userBubble.className = 'ai-bubble';
  userBubble.style.background = '#23263b';
  userBubble.style.textAlign = 'right';
  userBubble.textContent = input.value.trim();
  log.appendChild(userBubble);

  const aiBubble = document.createElement('div');
  aiBubble.className = 'ai-bubble';
  aiBubble.textContent = 'Thinking...';
  log.appendChild(aiBubble);
  log.scrollTop = log.scrollHeight;

  setTimeout(() => {
    aiBubble.textContent = "Sorry! (Demo) – I'm ready to answer business billing questions soon.";
    log.scrollTop = log.scrollHeight;
  }, 1000);

  input.value = '';
  return false;
};

// Login/Logout simulation script

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-login-header').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const text = btn.textContent.trim().toLowerCase();

      if (text === 'login') {
        localStorage.setItem('bbs-logged-in', 'true');
        window.location.href = 'index.html';
      } else if (text === 'logout') {
        localStorage.removeItem('bbs-logged-in');
        window.location.href = 'login.html';
      }
    });
  });

  const loggedIn = localStorage.getItem('bbs-logged-in') === 'true';
  const url = window.location.pathname;
  const onLoginPage = url.endsWith('login.html') || url.endsWith('register.html');
  const onDashboardPage = url.endsWith('index.html') || url.endsWith('dashboard.html');

  if (!loggedIn && !onLoginPage) {
    window.location.href = 'login.html';
  } else if (loggedIn && onLoginPage) {
    window.location.href = 'index.html';
  }
});
