import React, { useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  function saveNote() {
    if (!title.trim() || !content.trim()) {
      alert('Please enter both fields');
      return;
    }

    if (editId !== null) {
      setNotes(notes.map(note =>
        note.id === editId
          ? { ...note, title, content }
          : note
      ));
      setEditId(null);
    } else {
      setNotes([...notes, {
        id: Date.now(),
        title,
        content
      }]);
    }

    setTitle('');
    setContent('');
  }

  function editNote(note) {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id));
  }

  return (
    <div className="container">
      <h1>My Notes 📝</h1>
      <p>Save your ideas in one place!</p>

      <div className="form">
        <input
          placeholder="Note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write something..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <button onClick={saveNote}>
          {editId !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>

      <h2>My Saved Notes</h2>

      <div className="notes">
        {notes.map(note => (
          <div className="card" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => editNote(note)}>Edit</button>
            <button onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {notes.length === 0 && <p>No notes yet. Add your first note!</p>}
    </div>
  );
}

export default App;
