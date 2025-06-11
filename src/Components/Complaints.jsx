import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Complaints = () => {
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = { date, issue, description };

    axios
      .post('http://localhost:3000/complaints', input)
      .then((res) => {
        console.log(res);
        alert(res.data);
        setIssue('');
        setDescription('');
        navigate('/r'); // Redirect after successful submission
      })
      .catch((err) => {
        console.error(err);
        alert('Error submitting complaint. Please try again.');
      });
  };

  return (
    <div className="complaint-form-container">
      <form onSubmit={handleSubmit}>
        <div className="complaint-form-group">
          <label>Date</label>
          <input type="text" value={date} readOnly />
        </div>

        <div className="complaint-form-group">
          <label>Issue</label>
          <input
            type="text"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          />
        </div>

        <div className="complaint-form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Complaints;
