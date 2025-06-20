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
  Typography,
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

import { Link,Route } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 240;

const Admin = () => {
  
  const [activeTab, setActiveTab] = useState('totalUsers');
  const [totalUsers, setTotalUsers] = useState(0);
  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [newUsers, setNewUsers] = useState([]);


  
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

  // Fetch user data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'totalUsers') {
          const countResponse = await axios.get('http://localhost:3000/count');
          setTotalUsers(countResponse.data.count);
          
          const monthlyResponse = await axios.get('http://localhost:3000/monthly-growth');
          setMonthlyUsers(monthlyResponse.data);
        } 
        else if (activeTab === 'newUsers') {
          const recentUsersResponse = await axios.get('http://localhost:3000/recent-users');
          setNewUsers(recentUsersResponse.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);


 // Format date to display "Today" or "Yesterday"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };


   
   // Helper function to calculate growth rate
  const calculateGrowthRate = () => {
    if (monthlyUsers.length < 2) return 0;
    const current = monthlyUsers[monthlyUsers.length - 1].count;
    const previous = monthlyUsers[monthlyUsers.length - 2].count;
    return (((current - previous) / previous) * 100).toFixed(1);
  };



  const renderContent = () => {
     switch (activeTab) {
      case 'totalUsers':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>User Statistics</Typography>
            
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <>
                <Box sx={{
                  backgroundColor: '#f5f5f5',
                  p: 3,
                  borderRadius: 2,
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box>
                    <Typography variant="h6">Total Users</Typography>
                    <Typography variant="h3" fontWeight="bold">{totalUsers}</Typography>
                  </Box>
                  <Box sx={{
                    backgroundColor: '#e3f2fd',
                    p: '10px 20px',
                    borderRadius: 1,
                    color: '#1976d2'
                  }}>
                    <Typography>
                      {monthlyUsers.length > 1 ? 
                        `+${calculateGrowthRate()}% from last month` : 
                        'No growth data available'}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h5" gutterBottom>Monthly User Growth</Typography>
                <Box height={400} mt={3}>
                  {monthlyUsers.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyUsers}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#1976D2" name="New Users" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <Typography>No monthly data available</Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        );

      
    
      case 'newUsers':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>New Users</Typography>
            
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Joined</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newUsers.length > 0 ? (
                      newUsers.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user.Name}</TableCell>                          
                          <TableCell>{user.Email}</TableCell>
                          <TableCell>
                            {formatDate(user.createdAt)}
                            <Typography variant="caption" display="block" color="textSecondary">
                              {new Date(user.createdAt).toLocaleTimeString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No new users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        );


      case 'userComplaints':
        return (
          <Box p={3}>
              
            <Link to='/admin/usercomp' />

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
        sx={{
          backgroundColor: '#2196f3',
          textAlign: 'left',
          '&:hover': { backgroundColor: '#0d47a1' },
        }}
        fullWidth
      >
        <Link to="/admin/usercomp" style={{ color: 'white', textDecoration: 'none', width: '100%' }}>
         User Complaints
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
