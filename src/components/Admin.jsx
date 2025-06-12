
import { Button } from '@mui/material'

import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'

import React from 'react'
import { useState } from 'react';


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