// Note model
class Note {
  constructor({
    id = null,
    title = '',
    content = '',
    category = '',
    created = Date.now(),
    lastModified = Date.now()
  } = {}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.created = created;
    this.lastModified = lastModified;
  }
  
  // Update the note with new data
  update(data) {
    Object.assign(this, data);
    this.lastModified = Date.now();
    return this;
  }
  
  // Create a formatted object for display
  toDisplayObject() {
    return {
      id: this.id,
      title: this.title || 'Untitled',
      content: this.content,
      category: this.category,
      created: new Date(this.created).toLocaleString(),
      lastModified: new Date(this.lastModified).toLocaleString()
    };
  }
  
  // Create a serializable object for storage
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      category: this.category,
      created: this.created,
      lastModified: this.lastModified
    };
  }
  
  // Create a Note instance from stored data
  static fromJSON(data) {
    return new Note(data);
  }
}

export default Note;