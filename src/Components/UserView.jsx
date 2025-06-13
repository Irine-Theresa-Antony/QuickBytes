
import { AccountCircle, AccountCircleOutlined, EmailOutlined } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserView = () => {
  var [vuser,setvuser]=useState([])
  const [searchTerm, setSearchTerm] = useState("");

  var navigate= useNavigate();
  useEffect(()=>{
    axios
    .get("http://localhost:3000/viewuser")
    .then((res)=>{
      console.log(res.data)
      setvuser(res.data)
    })
    .catch((err)=>
      console.log(err)
    )
  },[])

  const DeleteHandler=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:3000/udel/${id}`).then((res)=>{
          console.log(res);
          alert(res.data)
          window.location.reload()
        }).catch((err)=>{
          console.log(err);
        })
      }

      const filteredUsers = vuser.filter((user) =>
  user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.Email.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    }}>
    <Typography variant="h4" sx={{ color: '#1976d2', marginTop: '10px', fontWeight: 'bold' }}>
        User Management
      </Typography>
      <TextField
  label="Search by name or email"
  variant="outlined"
  size="small"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  sx={{ width: '50%', mt: 2 }}
/>
    <Card
  sx={{
    width: '80%',
    marginTop: 5,
    mx: 'auto', // centers horizontally
    padding: 2,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    border: '2px solid lightblue',
    backgroundColor: '#fff',
  }}
>
 

  <CardContent>
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleOutlined fontSize="small" sx={{ mr: 1 }} />
                UserName
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailOutlined fontSize="small" sx={{ mr: 1 }} />
                Email
              </Box>
            </TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((val, i) => (
            <TableRow key={i}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountCircleOutlined fontSize="small" sx={{ mr: 1 }} />
                  {val.Name}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailOutlined fontSize="small" sx={{ mr: 1 }} />
                  {val.Email}
                </Box>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    DeleteHandler(val._id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </CardContent>
</Card>
    
    </div>
  )
}

export default UserView