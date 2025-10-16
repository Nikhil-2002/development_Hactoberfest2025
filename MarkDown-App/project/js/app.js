import { marked } from 'marked';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { v4 as uuidv4 } from 'uuid';
import { 
  initNoteEditor, 
  updateMarkdownPreview 
} from './editor.js';
import { 
  saveNote, 
  deleteNote, 
  getAllNotes, 
  getNoteById,
  getCategoryList
} from './storage.js';
import { initSearch } from './search.js';
import { initTheme } from './theme.js';
import { exportMarkdownFile } from './export.js';
import { initKeyboardShortcuts } from './shortcuts.js';

// Main application state
const state = {
  notes: [],
  activeNoteId: null,
  filterCategory: 'all',
  searchQuery: '',
  isEditorDirty: false,
  viewMode: 'split', // split, editor, preview
};

// DOM Elements
const elements = {
  notesList: document.getElementById('notesList'),
  emptyState: document.getElementById('emptyState'),
  noteContainer: document.getElementById('noteContainer'),
  noteTitle: document.getElementById('noteTitle'),
  noteCategory: document.getElementById('noteCategory'),
  markdownEditor: document.getElementById('markdownEditor'),
  markdownPreview: document.getElementById('markdownPreview'),
  newNoteBtn: document.getElementById('newNoteBtn'),
  emptyStateNewBtn: document.getElementById('emptyStateNewBtn'),
  deleteNoteBtn: document.getElementById('deleteNoteBtn'),
  exportBtn: document.getElementById('exportBtn'),
  viewModeBtn: document.getElementById('viewModeBtn'),
  categoryFilter: document.getElementById('categoryFilter'),
  deleteModal: document.getElementById('deleteModal'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
  cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  toast: document.getElementById('toast'),
  toastMessage: document.getElementById('toastMessage'),
  editorContainer: document.querySelector('.editor-container'),
};

// Initialize the application
function initApp() {
  // Initialize marked options
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
    gfm: true,
    breaks: true,
  });

  // Initialize modules
  initTheme();
  initNoteEditor(elements.markdownEditor, onEditorChange);
  initSearch(onSearch);
  initKeyboardShortcuts();

  // Load notes from storage
  loadNotes();
  loadCategories();

  // Set up event listeners
  setupEventListeners();

  // Show empty state if no notes
  updateUIState();
}

// Load all notes from storage
function loadNotes() {
  state.notes = getAllNotes();
  renderNotesList();
}

// Load categories for filter dropdown
function loadCategories() {
  const categories = getCategoryList();
  
  // Clear existing options except "All Notes"
  const select = elements.categoryFilter;
  while (select.options.length > 1) {
    select.remove(1);
  }
  
  // Add categories to filter dropdown
  categories.forEach(category => {
    if (category) { // Skip empty categories
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      select.appendChild(option);
    }
  });
}

// Render the notes list
function renderNotesList() {
  elements.notesList.innerHTML = '';
  
  // Filter notes by category and search query
  const filteredNotes = state.notes.filter(note => {
    const matchesCategory = state.filterCategory === 'all' || note.category === state.filterCategory;
    const matchesSearch = state.searchQuery === '' || 
      note.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort notes by last modified date (newest first)
  filteredNotes.sort((a, b) => b.lastModified - a.lastModified);
  
  // Create note items
  filteredNotes.forEach(note => {
    const noteItem = createNoteListItem(note);
    elements.notesList.appendChild(noteItem);
  });
  
  // Update UI state
  updateUIState();
}

// Create a note list item
function createNoteListItem(note) {
  const noteItem = document.createElement('div');
  noteItem.classList.add('note-item');
  if (note.id === state.activeNoteId) {
    noteItem.classList.add('active');
  }
  noteItem.dataset.id = note.id;
  
  // Create excerpt from content (first 50 chars)
  const excerpt = note.content.substring(0, 50).replace(/\n/g, ' ') + (note.content.length > 50 ? '...' : '');
  
  // Format date
  const date = new Date(note.lastModified);
  const formattedDate = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  
  noteItem.innerHTML = `
    <div class="note-item-title">${note.title || 'Untitled'}</div>
    <div class="note-item-excerpt">${excerpt}</div>
    <div class="note-item-meta">
      <span>${formattedDate}</span>
      ${note.category ? `<span class="note-item-category" data-category="${note.category}">${note.category}</span>` : ''}
    </div>
  `;
  
  // Add click event to select the note
  noteItem.addEventListener('click', () => {
    selectNote(note.id);
  });
  
  return noteItem;
}

// Select a note
function selectNote(noteId) {
  // Check if we need to save the current note
  if (state.activeNoteId && state.isEditorDirty) {
    saveCurrentNote();
  }
  
  // Update active note
  state.activeNoteId = noteId;
  state.isEditorDirty = false;
  
  // Get note data
  const note = getNoteById(noteId);
  
  // Update UI
  elements.noteTitle.value = note.title || '';
  elements.noteCategory.value = note.category || '';
  elements.markdownEditor.value = note.content || '';
  
  // Update markdown preview
  updateMarkdownPreview(note.content);
  
  // Update UI state
  updateUIState();
  
  // Highlight the selected note in the list
  document.querySelectorAll('.note-item').forEach(item => {
    item.classList.toggle('active', item.dataset.id === noteId);
  });
}

// Create a new note
function createNewNote() {
  // Save the current note if it's dirty
  if (state.activeNoteId && state.isEditorDirty) {
    saveCurrentNote();
  }
  
  // Create a new note object
  const newNote = {
    id: uuidv4(),
    title: 'Untitled',
    content: '',
    category: '',
    created: Date.now(),
    lastModified: Date.now()
  };
  
  // Save the new note
  saveNote(newNote);
  
  // Add to state and update UI
  state.notes.push(newNote);
  state.activeNoteId = newNote.id;
  state.isEditorDirty = false;
  
  // Update UI
  elements.noteTitle.value = newNote.title;
  elements.noteCategory.value = newNote.category;
  elements.markdownEditor.value = '';
  updateMarkdownPreview('');
  
  // Render notes list and update UI state
  renderNotesList();
  updateUIState();
  
  // Focus the title input
  elements.noteTitle.focus();
  elements.noteTitle.select();
}

// Save the current note
function saveCurrentNote() {
  if (!state.activeNoteId) return;
  
  const note = getNoteById(state.activeNoteId);
  if (!note) return;
  
  // Update note data
  note.title = elements.noteTitle.value || 'Untitled';
  note.content = elements.markdownEditor.value;
  note.category = elements.noteCategory.value;
  note.lastModified = Date.now();
  
  // Save to storage
  saveNote(note);
  
  // Reset dirty state
  state.isEditorDirty = false;
  
  // Update UI
  renderNotesList();
  showToast('Note saved');
}

// Handle editor changes
function onEditorChange(content) {
  if (!state.activeNoteId) return;
  
  state.isEditorDirty = true;
  updateMarkdownPreview(content);
}

// Handle search input
function onSearch(query) {
  state.searchQuery = query;
  renderNotesList();
}

// Toggle view mode (split, editor only, preview only)
function toggleViewMode() {
  const container = elements.editorContainer;
  
  switch (state.viewMode) {
    case 'split':
      state.viewMode = 'editor';
      container.classList.add('editor-only');
      container.classList.remove('preview-only');
      break;
    case 'editor':
      state.viewMode = 'preview';
      container.classList.remove('editor-only');
      container.classList.add('preview-only');
      break;
    case 'preview':
      state.viewMode = 'split';
      container.classList.remove('editor-only');
      container.classList.remove('preview-only');
      break;
  }
}

// Show the delete confirmation modal
function showDeleteModal() {
  if (!state.activeNoteId) return;
  
  elements.deleteModal.classList.add('show');
}

// Hide the delete confirmation modal
function hideDeleteModal() {
  elements.deleteModal.classList.remove('show');
}

// Delete the current note
function deleteCurrentNote() {
  if (!state.activeNoteId) return;
  
  // Delete from storage
  deleteNote(state.activeNoteId);
  
  // Remove from state
  state.notes = state.notes.filter(note => note.id !== state.activeNoteId);
  
  // Clear active note
  state.activeNoteId = null;
  state.isEditorDirty = false;
  
  // Hide modal
  hideDeleteModal();
  
  // Update UI
  renderNotesList();
  updateUIState();
  
  // Show toast
  showToast('Note deleted');
}

// Export the current note
function exportCurrentNote() {
  if (!state.activeNoteId) return;
  
  const note = getNoteById(state.activeNoteId);
  if (!note) return;
  
  exportMarkdownFile(note);
  showToast('Note exported');
}

// Show a toast notification
function showToast(message) {
  elements.toastMessage.textContent = message;
  elements.toast.classList.add('show');
  
  // Hide after 3 seconds
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 3000);
}

// Update UI state based on current app state
function updateUIState() {
  const hasNotes = state.notes.length > 0;
  const hasActiveNote = !!state.activeNoteId;
  
  // Show/hide empty state
  elements.emptyState.style.display = !hasActiveNote ? 'flex' : 'none';
  elements.noteContainer.style.display = hasActiveNote ? 'flex' : 'none';
  
  // Disable buttons if no active note
  elements.deleteNoteBtn.disabled = !hasActiveNote;
  elements.exportBtn.disabled = !hasActiveNote;
}

// Set up event listeners
function setupEventListeners() {
  // New note buttons
  elements.newNoteBtn.addEventListener('click', createNewNote);
  elements.emptyStateNewBtn.addEventListener('click', createNewNote);
  
  // Save on title or category change
  elements.noteTitle.addEventListener('change', saveCurrentNote);
  elements.noteCategory.addEventListener('change', () => {
    saveCurrentNote();
    loadCategories();
  });
  
  // Auto-save on blur (when editor loses focus)
  elements.markdownEditor.addEventListener('blur', () => {
    if (state.isEditorDirty) {
      saveCurrentNote();
    }
  });
  
  // Delete note
  elements.deleteNoteBtn.addEventListener('click', showDeleteModal);
  elements.confirmDeleteBtn.addEventListener('click', deleteCurrentNote);
  elements.cancelDeleteBtn.addEventListener('click', hideDeleteModal);
  elements.closeModalBtn.addEventListener('click', hideDeleteModal);
  
  // Export note
  elements.exportBtn.addEventListener('click', exportCurrentNote);
  
  // View mode toggle
  elements.viewModeBtn.addEventListener('click', toggleViewMode);
  
  // Category filter
  elements.categoryFilter.addEventListener('change', (e) => {
    state.filterCategory = e.target.value;
    renderNotesList();
  });
  
  // Periodically save dirty notes (every 30 seconds)
  setInterval(() => {
    if (state.isEditorDirty && state.activeNoteId) {
      saveCurrentNote();
    }
  }, 30000);
  
  // Save before unload
  window.addEventListener('beforeunload', () => {
    if (state.isEditorDirty && state.activeNoteId) {
      saveCurrentNote();
    }
  });
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

export { state, elements, showToast };