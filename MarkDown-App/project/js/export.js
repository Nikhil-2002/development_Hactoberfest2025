// Export note as a markdown file
function exportMarkdownFile(note) {
  if (!note) return;
  
  // Prepare file name (use title or default)
  const fileName = (note.title || 'untitled').toLowerCase().replace(/[^a-z0-9]/g, '-') + '.md';
  
  // Create file content
  let fileContent = '';
  
  // Add title as H1 if not already present at the start
  if (!note.content.trim().startsWith('# ')) {
    fileContent += `# ${note.title || 'Untitled'}\n\n`;
  }
  
  // Add content
  fileContent += note.content;
  
  // Create blob and download link
  const blob = new Blob([fileContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  
  // Create download link
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';
  
  // Add to document, click, and remove
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

export { exportMarkdownFile };