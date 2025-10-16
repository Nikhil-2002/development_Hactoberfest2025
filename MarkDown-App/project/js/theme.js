import { saveSettings, getSettings } from './storage.js';

// Initialize the theme functionality
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  
  // Get saved theme or use default
  const settings = getSettings();
  const currentTheme = settings.theme || 'light';
  
  // Apply theme
  applyTheme(currentTheme);
  
  // Add click event to toggle theme
  toggleBtn.addEventListener('click', () => {
    const body = document.body;
    const newTheme = body.classList.contains('theme-light') ? 'dark' : 'light';
    
    applyTheme(newTheme);
    saveSettings({ theme: newTheme });
  });
  
  // Add keyboard shortcut (Shift + Alt + T)
  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.altKey && e.key === 'T') {
      toggleBtn.click();
    }
  });
}

// Apply theme to the document
function applyTheme(theme) {
  const body = document.body;
  
  // Remove existing theme classes
  body.classList.remove('theme-light', 'theme-dark');
  
  // Add new theme class
  body.classList.add(`theme-${theme}`);
}

export { initTheme };