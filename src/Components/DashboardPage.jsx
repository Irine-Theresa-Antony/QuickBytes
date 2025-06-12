import '../Dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleNoteSubmit = (e) => {
    e.preventDefault();

    if (note.trim() === '') {
      alert('Please write a note before submitting.');
      return;
    }

    
    const dateOnly = selectedDate.toISOString().split('T')[0];

    const input = {
      note: note,
      date: dateOnly,
    };

    axios
      .post('http://localhost:3000/notes', input)
      .then((res) => {
        console.log(res);
        alert(res.data);
        setNote('');
      })
      .catch((err) => {
        console.error(err);
        alert('Error submitting note. Please try again.');
      });
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>DASHBOARD</h2>
        <button>
          <Link to="/profile">PROFILE</Link>
        </button>
        <button>
          <Link to="/complaints">COMPLAINTS</Link>
        </button>
        <button>CONTACT INFO</button>
        <button>
          <Link to="/terms">TERMS AND CONDITIONS</Link>
        </button>
      </div>

      {/* Main Area */}
      <div className="main-content">
        {/* Note Input */}
        <div className="note-box">
          <h3>📝 <strong>Write Your Note</strong></h3>
          <form onSubmit={handleNoteSubmit}>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Type your note here..."
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* Calendar */}
        <div className="calendar-box">
          <h4>Calendar</h4>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
