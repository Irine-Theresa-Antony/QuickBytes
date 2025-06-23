import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCompTab = () => {
  const [comp, setComp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/usercomp");
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setComp(sortedData);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (complaintId) => {
    try {
      await axios.patch(`http://localhost:3000/admin/respond-complaint/${complaintId}`, {
        status: 'responded'
      });
      await fetchComplaints();
      console.log("Complaint status updated successfully");
    } catch (err) {
      console.error("Error updating complaint status:", err);
      setError("Failed to update complaint status");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress style={{ color: '#800808' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography style={{ color: '#800808' }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        style={{ 
          color: '#800808', 
          marginBottom: '20px',
          fontWeight: 'bold'
        }}
      >
        User Complaints
      </Typography>
      
      <TableContainer component={Paper} style={{ backgroundColor: 'black' }}>
        <Table sx={{ minWidth: 650 }} aria-label="complaints table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#800808' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="center">Complaint ID</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="center">User Email</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="center">Issue</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="center">Description</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="center">Date</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="center">Status</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comp.length > 0 ? (
              comp.map((val) => (
                <TableRow 
                  key={val._id}
                  hover
                  style={{ 
                    backgroundColor: 'black',
                    '&:hover': { backgroundColor: '#1a1a1a' }
                  }}
                >
                  <TableCell style={{ color: 'white' }} align="center">{val._id}</TableCell>
                  <TableCell style={{ color: 'white' }} align="center">{val.userId?.email || 'N/A'}</TableCell>
                  <TableCell style={{ color: 'white' }} align="center">{val.issue}</TableCell>
                  <TableCell style={{ color: 'white' }} align="center">{val.description}</TableCell>
                  <TableCell style={{ color: 'white' }} align="center">
                    {new Date(val.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align="center">{val.status}</TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      style={{
                        backgroundColor: val.status === 'responded' ? '#DCDCDC' : '#800808',
                        color: val.status === 'responded' ? 'black' : 'white',
                        '&:hover': {
                          backgroundColor: '#800808',
                          color: 'white'
                        }
                      }}
                      onClick={() => handleRespond(val._id)}
                      disabled={val.status === 'responded'}
                    >
                      {val.status === 'responded' ? 'Responded' : 'Respond'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow style={{ backgroundColor: 'black' }}>
                <TableCell style={{ color: 'white' }} colSpan={7} align="center">
                  No complaints found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserCompTab;