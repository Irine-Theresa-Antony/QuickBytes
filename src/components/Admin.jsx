
import { Button } from '@mui/material'

import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'

import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const drawerWidth = 240;

const Admin = () => {

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
        
        <button style={btnStyle} >Total Users</button>
        <button style={btnStyle}>New Users</button>
        <button style={btnStyle}>User Complaints</button>
        <button style={btnStyle}>Users</button>
        
        <Button
        variant="contained"
        sx={{
          backgroundColor: '#2196f3',
          textAlign: 'left',
          '&:hover': { backgroundColor: '#0d47a1' },
        }}
        fullWidth
      >
        <Link to="/c" style={{ color: 'white', textDecoration: 'none', width: '100%' }}>
          Add News
        </Link>
      </Button>
        
         <Button
        variant="contained"
        sx={{
          backgroundColor: '#2196f3',
          textAlign: 'left',
          '&:hover': { backgroundColor: '#0d47a1' },
        }}
        fullWidth
      >
        <Link to="/viewcustom" style={{ color: 'white', textDecoration: 'none', width: '100%' }}>
          View Added News
        </Link>
      </Button>

        <Button
        variant="contained"
        sx={{
          backgroundColor: '#2196f3',
          textAlign: 'left',
          '&:hover': { backgroundColor: '#0d47a1' },
        }}
        fullWidth
      >
        <Link to="/viewuser" style={{ color: 'white', textDecoration: 'none', width: '100%' }}>
          View Users List
        </Link>
      </Button>

      </div>




      {/* Main Content */}
      <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', position: 'relative' }}>
        
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


export default Admin