// Local storage keys
const STORAGE_KEYS = {
  NOTES: 'markdown_notes_data',
  SETTINGS: 'markdown_notes_settings'
};

// Save a note to local storage
function saveNote(note) {
  // Get existing notes
  const notes = getAllNotes();
  
  // Find if note already exists
  const existingIndex = notes.findIndex(n => n.id === note.id);
  
  if (existingIndex >= 0) {
    // Update existing note
    notes[existingIndex] = note;
  } else {
    // Add new note
    notes.push(note);
  }
  
  // Save to local storage
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  
  return note;
}

// Get all notes from local storage
function getAllNotes() {
  try {
    const notesData = localStorage.getItem(STORAGE_KEYS.NOTES);
    return notesData ? JSON.parse(notesData) : [];
  } catch (error) {
    console.error('Error loading notes from storage:', error);
    return [];
  }
}

// Get a note by ID
function getNoteById(id) {
  const notes = getAllNotes();
  return notes.find(note => note.id === id);
}

// Delete a note
function deleteNote(id) {
  const notes = getAllNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(filteredNotes));
}

// Get a list of all categories
function getCategoryList() {
  const notes = getAllNotes();
  const categories = new Set();
  
  notes.forEach(note => {
    if (note.category) {
      categories.add(note.category);
    }
  });
  
  return Array.from(categories);
}

// Save app settings
function saveSettings(settings) {
  try {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updatedSettings));
    return updatedSettings;
  } catch (error) {
    console.error('Error saving settings:', error);
    return null;
  }
}

// Get app settings
function getSettings() {
  try {
    const settingsData = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settingsData ? JSON.parse(settingsData) : {
      theme: 'light',
      fontSize: 'normal',
      autoSave: true,
      viewMode: 'split'
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      theme: 'light',
      fontSize: 'normal',
      autoSave: true,
      viewMode: 'split'
    };
  }
}

// Create sample notes for first-time users
function createSampleNotes() {
  const notes = getAllNotes();
  
  // Only create samples if no notes exist
  if (notes.length === 0) {
    const sampleNotes = [
      {
        id: 'welcome-note',
        title: 'Welcome to Markdown Notes',
        content: `# Welcome to Markdown Notes!

This is a simple yet powerful markdown editor that lets you create and organize your notes.

## Features

- **Live Preview**: See your markdown rendered in real-time
- **Categories**: Organize notes by categories
- **Search**: Quickly find your notes
- **Export**: Save your notes as markdown files
- **Keyboard Shortcuts**: Boost your productivity

## Markdown Guide

Here's a quick guide to markdown syntax:

### Headers

# H1
## H2
### H3

### Formatting

**Bold text**
*Italic text*
~~Strikethrough~~

### Lists

- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item

### Checkboxes

- [ ] Unchecked item
- [x] Checked item

### Code

\`Inline code\`

\`\`\`javascript
// Code block
function hello() {
  console.log('Hello, world!');
}
\`\`\`

### Links and Images

[Link text](https://example.com)
![Image alt text](https://example.com/image.jpg)

### Blockquotes

> This is a blockquote

### Tables

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

Enjoy taking notes!`,
        category: 'help',
        created: Date.now(),
        lastModified: Date.now()
      },
      {
        id: 'getting-started',
        title: 'Getting Started',
        content: `# Getting Started with Markdown Notes

## Basic Usage

1. Create a new note using the "New Note" button
2. Give your note a title
3. Select a category (optional)
4. Write your content using markdown syntax
5. Your note is automatically saved

## Organization Tips

- Use categories to group related notes
- Use search to quickly find notes
- Use headers to structure your notes
- Export important notes for backup

## Keyboard Shortcuts

- Ctrl/Cmd + N: New note
- Ctrl/Cmd + S: Save note
- Ctrl/Cmd + F: Search
- Ctrl/Cmd + E: Toggle editor/preview mode

Happy note-taking!`,
        category: 'help',
        created: Date.now() - 1000,
        lastModified: Date.now() - 1000
      }
    ];
    
    // Save sample notes
    sampleNotes.forEach(note => saveNote(note));
    
    return sampleNotes;
  }
  
  return [];
}

// Export storage functions
export { 
  saveNote, 
  getAllNotes, 
  getNoteById, 
  deleteNote, 
  getCategoryList,
  saveSettings,
  getSettings,
  createSampleNotes
};