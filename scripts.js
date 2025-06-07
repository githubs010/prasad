// scripts.js

const colorThemes=["blue","black","orange","sky"];
function setColorTheme(theme){
  if(!colorThemes.includes(theme)) theme="blue";
  document.documentElement.setAttribute("data-theme",theme);
  localStorage.setItem("bbs-color-theme",theme);
  document.querySelectorAll(".pill").forEach(p=>p.classList.toggle("active",p.getAttribute("data-theme")===theme));
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

  // handle login or register form submission
  const authForm = document.querySelector('form.login-form');
  if (authForm) {
    authForm.addEventListener('submit', e => {
      e.preventDefault();
      localStorage.setItem('bbs-logged-in', 'true');
      window.location.href = 'index.html';
    });
  }

  const loggedIn = localStorage.getItem('bbs-logged-in') === 'true';
  const url = window.location.pathname;
  const onLoginPage = url.endsWith('login.html') || url.endsWith('register.html');

  if (!loggedIn && !onLoginPage) {
    window.location.href = 'login.html';
  } else if (loggedIn && onLoginPage) {
    window.location.href = 'index.html';
  }
});
