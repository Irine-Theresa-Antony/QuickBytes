import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{
        width: '200px',

        backgroundColor: '#1976D2', // Blue

        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h2 style={{ margin: 0 }}>DASHBOARD</h2>
        <button style={btnStyle}>PROFILE</button>
        <button style={btnStyle}>COMPLAINTS</button>
        <button style={btnStyle}>CONTACT INFO</button>
        <button style={btnStyle}>TERMS AND CONDITIONS</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', position: 'relative' }}>
        
        {/* Calendar */}
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: '#2196f3', // Blue
          padding: '10px',
          borderRadius: '10px',
          color: 'white'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Calendar</h4>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>

      </div>
    </div>
  );
};

const btnStyle = {
  backgroundColor: '#2196f3', // Blue
  border: 'none',
  padding: '10px',
  color: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  textAlign: 'left'
};

export default DashboardPage;



