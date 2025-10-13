import { debounce } from './utils.js';

// Initialize the search functionality
function initSearch(onSearch) {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  // Create a debounced search function
  const debouncedSearch = debounce((query) => {
    onSearch(query.trim().toLowerCase());
  }, 300);
  
  // Add event listener for input
  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
  
  // Add keyboard shortcut focus (Ctrl/Cmd + F)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      searchInput.focus();
    }
  });
  
  // Clear search when pressing Escape
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      debouncedSearch('');
    }
  });
  
  return {
    getValue: () => searchInput.value,
    setValue: (value) => {
      searchInput.value = value;
      debouncedSearch(value);
    },
    clear: () => {
      searchInput.value = '';
      debouncedSearch('');
    }
  };
}

export { initSearch };