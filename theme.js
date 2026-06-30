// Theme toggle script: respects system preference and persists choice
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const storageKey = 'theme-preference';

  function applyTheme(theme){
    if(theme === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
      toggle.setAttribute('aria-pressed','true');
      toggle.textContent = 'Light Mode';
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggle.setAttribute('aria-pressed','false');
      toggle.textContent = 'Dark Mode';
    }
  }

  // initial theme
  const saved = localStorage.getItem(storageKey);
  if(saved){
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  toggle.addEventListener('click', ()=>{
    const currentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = currentlyDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(storageKey, next);
  });
})();
