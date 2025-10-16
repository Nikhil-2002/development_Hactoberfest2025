// Debounce function to limit how often a function can be called
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format date for display
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Truncate text with ellipsis
function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Extract first heading from markdown
function extractTitle(markdown) {
  if (!markdown) return '';
  
  // Look for # heading
  const headingMatch = markdown.match(/^# (.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }
  
  // No heading found, use first line or empty string
  const firstLine = markdown.split('\n')[0];
  return firstLine ? truncateText(firstLine, 30) : '';
}

// Generate excerpt from markdown
function generateExcerpt(markdown, maxLength = 100) {
  if (!markdown) return '';
  
  // Remove markdown formatting for cleaner excerpt
  let plainText = markdown
    .replace(/#+\s+/g, '') // remove headings
    .replace(/\*\*(.+?)\*\*/g, '$1') // remove bold
    .replace(/\*(.+?)\*/g, '$1') // remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // remove links
    .replace(/!\[.+?\]\(.+?\)/g, '') // remove images
    .replace(/`(.+?)`/g, '$1') // remove inline code
    .replace(/```[\s\S]+?```/g, '') // remove code blocks
    .replace(/^\s*[-*+]\s+/gm, '') // remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // remove numbered list markers
    .replace(/\n\s*\n/g, '\n'); // collapse multiple newlines
  
  return truncateText(plainText, maxLength);
}

export {
  debounce,
  formatDate,
  truncateText,
  extractTitle,
  generateExcerpt
};