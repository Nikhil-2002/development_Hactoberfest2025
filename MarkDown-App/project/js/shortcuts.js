import { state, elements, showToast } from './app.js';

// Initialize keyboard shortcuts
function initKeyboardShortcuts() {
  document.addEventListener('keydown', handleKeyboardShortcut);
}

// Handle keyboard shortcuts
function handleKeyboardShortcut(e) {
  // Ignore if inside text inputs (except for Escape key)
  if (e.key !== 'Escape' && 
      (e.target.tagName === 'INPUT' || 
       e.target.tagName === 'TEXTAREA' || 
       e.target.isContentEditable)) {
    return;
  }
  
  // Ctrl/Cmd + S: Save
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    
    // Get save function from the app
    if (state.activeNoteId && state.isEditorDirty) {
      // Use event to trigger save
      const event = new Event('blur');
      elements.markdownEditor.dispatchEvent(event);
      showToast('Note saved');
    }
  }
  
  // Ctrl/Cmd + N: New note
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    elements.newNoteBtn.click();
  }
  
  // Ctrl/Cmd + E: Toggle view mode
  if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
    e.preventDefault();
    elements.viewModeBtn.click();
  }
  
  // Delete/Backspace: Delete note (only if not in an input/editor)
  if ((e.key === 'Delete' || e.key === 'Backspace') && 
      e.target === document.body && 
      state.activeNoteId) {
    elements.deleteNoteBtn.click();
  }
  
  // Ctrl/Cmd + Shift + E: Export
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
    e.preventDefault();
    if (state.activeNoteId) {
      elements.exportBtn.click();
    }
  }
  
  // Escape: Close modals
  if (e.key === 'Escape') {
    // Check if delete modal is open
    if (elements.deleteModal.classList.contains('show')) {
      elements.cancelDeleteBtn.click();
    }
    
    // Close toast if open
    const toast = document.getElementById('toast');
    if (toast.classList.contains('show')) {
      toast.classList.remove('show');
    }
  }
}

export { initKeyboardShortcuts };