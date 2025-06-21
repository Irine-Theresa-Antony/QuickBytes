import { useEffect, useState } from 'react';
import '../Dashboard.css';
import axios from 'axios';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const name = localStorage.getItem('username'); 

  useEffect(() => {
    const fetchNotes = async () => {
      if (!name) {
        alert('User not logged in');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/notes/${name}`);
        setNotes(res.data);
      } catch (err) {
        console.error(err);
        alert('Error fetching notes');
      }
    };

    fetchNotes();
  }, [name]);

  return (
    <div className="profile-container">
      <h2 style={{ color: "#800808", textAlign: "center" }}>My Notes</h2>
      {notes.length === 0 ? (
        <p style={{ textAlign: "center" }}>No notes found</p>
      ) : (
        <ul className="note-list">
          {notes.map((note, index) => (
            <li key={index} className="note-item" style={{ marginBottom: "15px", backgroundColor: "#f2f2f2", padding: "15px", borderRadius: "8px" }}>
              <strong>Date:</strong> {new Date(note.date).toLocaleDateString()}<br />
              <strong>Note:</strong> {note.note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyNotes;
