import { AccountCircleOutlined, EmailOutlined } from '@mui/icons-material'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserView = () => {
  var [vuser, setvuser] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  var navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/viewuser")
      .then((res) => {
        console.log(res.data)
        setvuser(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const DeleteHandler = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3000/udel/${id}`).then((res) => {
      console.log(res);
      alert(res.data)
      window.location.reload()
    }).catch((err) => {
      console.log(err);
    })
  }

  const filteredUsers = vuser.filter((user) =>
    user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      padding: '2rem'
    }}>
      <Box sx={{
        backgroundColor: '#000000',
        border: '1px solid #DCDCDC',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant='h4' sx={{
          textAlign: 'center',
          color: '#800808',
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}>
          User Management
        </Typography>

        <TextField
          label="Search by name or email"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '50%',
            marginBottom: '20px',
            backgroundColor: '#1e1e1e',
            borderRadius: '5px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#DCDCDC',
              },
              '&:hover fieldset': {
                borderColor: '#DCDCDC',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#DCDCDC',
              },
              '& input': {
                color: '#DCDCDC',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#DCDCDC',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#DCDCDC',
            },
          }}
        />

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#DCDCDC' }}>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircleOutlined fontSize="small" sx={{ mr: 1 }} />
                    UserName
                  </Box>
                </TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailOutlined fontSize="small" sx={{ mr: 1 }} />
                    Email
                  </Box>
                </TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((val, i) => (
                <TableRow key={i} sx={{
                  backgroundColor: '#1e1e1e'
                }}>
                  <TableCell sx={{ color: '#DCDCDC' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountCircleOutlined fontSize="small" sx={{ mr: 1 }} />
                      {val.Name}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailOutlined fontSize="small" sx={{ mr: 1 }} />
                      {val.Email}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      sx={{
                        backgroundColor: '#800808',
                        '&:hover': { backgroundColor: '#a00010' },
                        color: '#FFFFFF',
                        fontWeight: 'bold'
                      }}
                      onClick={() => { DeleteHandler(val._id) }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}

export default UserView
