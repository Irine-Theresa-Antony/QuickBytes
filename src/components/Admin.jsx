import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'

import React from 'react'
import { useState } from 'react';
import { Link,Route } from 'react-router-dom';


const drawerWidth = 240;

const Admin = () => {
  const [activeTab, setActiveTab] = useState('totalUsers');
  const [totalUsers, setTotalUsers] = useState(1250);
  const [monthlyUsers, setMonthlyUsers] = useState([
    { month: 'Jan', users: 100 },
    { month: 'Feb', users: 150 },
    { month: 'Mar', users: 200 },
    { month: 'Apr', users: 180 },
    { month: 'May', users: 220 },
    { month: 'Jun', users: 250 },
    { month: 'Jul', users: 300 },
    { month: 'Aug', users: 350 },
    { month: 'Sep', users: 400 },
    { month: 'Oct', users: 450 },
    { month: 'Nov', users: 500 },
    { month: 'Dec', users: 550 },
  ]);

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#ff9800';
      case 'resolved':
        return '#4caf50';
      case 'rejected':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'totalUsers':
        return (
          <Box p={3}>
            <h2>User Statistics</h2>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <h3>Total Users</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalUsers}</p>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#e3f2fd',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  color: '#1976d2',
                }}
              >
                <p>+12% from last month</p>
              </Box>
            </Box>

            <h3>Monthly User Growth</h3>
            <Box height="400px" mt={3}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyUsers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#1976D2" name="Number of Users" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        );
      case 'newUsers':
        return <Box p={3}>New Users Content</Box>;
      case 'userComplaints':
        return (
          <Box p={3}>
            <h2>User Complaints</h2>
            {loading ? (
              <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box color="red" p={2}>
                {error}
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="complaints table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#1976D2' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Subject</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {complaints.length > 0 ? (
                      complaints.map((complaint) => (
                        <TableRow key={complaint._id}>
                          <TableCell>{complaint._id}</TableCell>
                          <TableCell>{complaint.userName || complaint.userEmail}</TableCell>
                          <TableCell>{complaint.subject}</TableCell>
                          <TableCell>
                            {complaint.description.length > 50
                              ? `${complaint.description.substring(0, 50)}...`
                              : complaint.description}
                          </TableCell>
                          <TableCell>
                            {new Date(complaint.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span
                              style={{
                                padding: '5px 10px',
                                borderRadius: '12px',
                                backgroundColor: getStatusColor(complaint.status),
                                color: 'white',
                              }}
                            >
                              {complaint.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No complaints found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        );
      case 'users':
        return <Box p={3}>Users List Content</Box>;
      default:
        return <Box p={3}>Select a tab</Box>;
    }
  };

  return (
    <Box display="flex" height="100vh" fontFamily="Arial, sans-serif">
      {/* Sidebar */}
      <Box
        sx={{
          width: '200px',
          backgroundColor: '#1976D2',
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Button
          variant="contained"
          onClick={() => setActiveTab('totalUsers')}
          sx={{
            backgroundColor: activeTab === 'totalUsers' ? '#0d47a1' : '#2196f3',
            textAlign: 'left',
            '&:hover': { backgroundColor: '#0d47a1' },
          }}
          fullWidth
        >
          Total Users
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveTab('newUsers')}
          sx={{
            backgroundColor: activeTab === 'newUsers' ? '#0d47a1' : '#2196f3',
            textAlign: 'left',
            '&:hover': { backgroundColor: '#0d47a1' },
          }}
          fullWidth
        >
          New Users
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveTab('userComplaints')}
          sx={{
            backgroundColor: activeTab === 'userComplaints' ? '#0d47a1' : '#2196f3',
            textAlign: 'left',
            '&:hover': { backgroundColor: '#0d47a1' },
          }}
          fullWidth
        >
          User Complaints
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

      </Box>





      {/* Main Content */}
      <Box flex={1} bgcolor="white">
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Admin;
