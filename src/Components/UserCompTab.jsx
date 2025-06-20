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
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/usercomp");
        // Sort by date in descending order (newest first)
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setComp(sortedData);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>User Complaints</Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="complaints table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Issue</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comp.length > 0 ? (
              comp.map((val) => (
                <TableRow key={val._id} hover>
                  <TableCell align="center">{val._id}</TableCell>
                  <TableCell align="center">{val.issue}</TableCell>
                  <TableCell align="center">{val.description}</TableCell>
                  <TableCell align="center">
                    {new Date(val.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      color="error"
                      onClick={()=>{respComp(val._id);}}
                    >
                      Respond
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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