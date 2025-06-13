import '../Dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [review, setReview] = useState('');

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

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (review.trim() === '') {
      alert('Please write a review before submitting.');
      return;
    }

    const input = {
      review: review,
    };

    axios
      .post('http://localhost:3000/reviews', input)
      .then((res) => {
        console.log(res);
        alert(res.data);
        setReview('');
      })
      .catch((err) => {
        console.error(err);
        alert('Error submitting review. Please try again.');
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
        <button>
          <Link to="/reviews">REVIEWS</Link>
        </button>
        <button>
          <Link to="/terms">TERMS AND CONDITIONS</Link>
        </button>
      </div>

      {/* Main Area */}
      <div className="main-content-with-review">
        <div className="left-column">
          {/* Note Input */}
          <div className="note-box">
            <h3><strong>Write Your Notes</strong></h3>
            <form onSubmit={handleNoteSubmit}>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type your notes here..."
              />
              <div className="note-submit-container">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>

          {/* Review Input */}
          <div className="review-box">
            <h3><strong>Write a Review</strong></h3>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Type your review here..."
              />
              <div className="review-submit-container">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
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
