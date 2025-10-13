import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { debounce } from './utils.js';

// Initialize the markdown editor
function initNoteEditor(editorElement, onChange) {
  if (!editorElement) return;

  // Handle editor input with debounce
  const handleInput = debounce((e) => {
    const content = e.target.value;
    onChange(content);
  }, 300);

  // Add event listener
  editorElement.addEventListener('input', handleInput);

  // Add tab key support
  editorElement.addEventListener('keydown', handleTabKey);

  // Setup auto-resize for textarea
  setupTextareaAutoResize(editorElement);

  return {
    getValue: () => editorElement.value,
    setValue: (value) => {
      editorElement.value = value;
      updateMarkdownPreview(value);
    }
  };
}

// Handle tab key in the editor (insert spaces instead of changing focus)
function handleTabKey(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const value = this.value;
    
    // Insert 2 spaces at cursor position or for selected text (for each line)
    if (start === end) {
      // No selection, just insert spaces at cursor
      this.value = value.substring(0, start) + '  ' + value.substring(end);
      this.selectionStart = this.selectionEnd = start + 2;
    } else {
      // For selections, handle each line
      const selectedText = value.substring(start, end);
      const lines = selectedText.split('\n');
      
      if (e.shiftKey) {
        // Shift+Tab: remove indentation
        const newLines = lines.map(line => 
          line.startsWith('  ') ? line.substring(2) : 
          line.startsWith('\t') ? line.substring(1) : line
        );
        const newText = newLines.join('\n');
        this.value = value.substring(0, start) + newText + value.substring(end);
        this.selectionStart = start;
        this.selectionEnd = start + newText.length;
      } else {
        // Tab: add indentation
        const newText = lines.map(line => '  ' + line).join('\n');
        this.value = value.substring(0, start) + newText + value.substring(end);
        this.selectionStart = start;
        this.selectionEnd = start + newText.length;
      }
    }
    
    // Trigger input event to save changes
    const inputEvent = new Event('input', { bubbles: true });
    this.dispatchEvent(inputEvent);
  }
}

// Auto-resize textarea to fit content
function setupTextareaAutoResize(textarea) {
  function resize() {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  
  // Initial resize
  resize();
  
  // Resize on input
  textarea.addEventListener('input', resize);
  
  // Resize on window resize
  window.addEventListener('resize', resize);
}

// Update the markdown preview
function updateMarkdownPreview(markdown) {
  const previewElement = document.getElementById('markdownPreview');
  if (!previewElement) return;
  
  if (!markdown) {
    previewElement.innerHTML = '<div class="empty-preview">Preview will appear here</div>';
    return;
  }
  
  try {
    // Convert markdown to HTML and sanitize
    const rawHtml = marked(markdown);
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);
    
    // Update preview
    previewElement.innerHTML = sanitizedHtml;
    
    // Handle checkboxes in preview
    setupCheckboxesInPreview(previewElement);
    
    // Apply syntax highlighting to code blocks
    highlightCodeBlocks(previewElement);
  } catch (error) {
    console.error('Error rendering markdown:', error);
    previewElement.innerHTML = '<div class="error">Error rendering markdown</div>';
  }
}

// Setup checkboxes in preview to be clickable
function setupCheckboxesInPreview(previewElement) {
  const checkboxes = previewElement.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    // Make checkboxes clickable in preview
    checkbox.addEventListener('change', function(e) {
      e.preventDefault(); // Prevent actual change in preview
      
      // Find the corresponding markdown in the editor
      const editorElement = document.getElementById('markdownEditor');
      if (!editorElement) return;
      
      const content = editorElement.value;
      const listItemText = this.parentElement.textContent.trim();
      
      // Create regex to find this specific checkbox
      const checkboxRegex = new RegExp(`- \\[([ x])\\] ${escapeRegExp(listItemText)}`, 'i');
      const match = content.match(checkboxRegex);
      
      if (match) {
        // Toggle the checkbox in the markdown
        const newContent = content.replace(
          checkboxRegex, 
          `- [${this.checked ? 'x' : ' '}] ${listItemText}`
        );
        
        // Update editor and trigger input event
        editorElement.value = newContent;
        const inputEvent = new Event('input', { bubbles: true });
        editorElement.dispatchEvent(inputEvent);
      }
    });
  });
}

// Escape special characters for regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Apply syntax highlighting to code blocks
function highlightCodeBlocks(previewElement) {
  const codeBlocks = previewElement.querySelectorAll('pre code');
  
  if (window.hljs) {
    codeBlocks.forEach(block => {
      window.hljs.highlightElement(block);
    });
  }
}

export { initNoteEditor, updateMarkdownPreview };