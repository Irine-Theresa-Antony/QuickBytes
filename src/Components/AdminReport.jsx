import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminReport = () => {

  var [repo, setrepo] = useState([])
  var navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/viewreport")
      .then((res) => {
        console.log(res.data)
        setrepo(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const DeleteHandler = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3000/rdel/${id}`).then((res) => {
      console.log(res);
      alert(res.data)
      window.location.reload()
    }).catch((err) => {
      console.log(err);
    })
  }

  const MarkAsReadHandler = (id) => {
    console.log(id);
    axios.put(`http://localhost:3000/markasread/${id}`).then((res) => {
      console.log(res);
      alert(res.data);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }

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
          Admin Reports
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#DCDCDC' }}>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Date & Time</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>User Name</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Email Id</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Number</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Delete</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Mark As Read</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...repo].reverse().map((val, i) => (
                <TableRow key={i} sx={{
                  backgroundColor: '#1e1e1e',
                  ...(val.isRead ? { opacity: 0.5, pointerEvents: 'none' } : {})
                }}>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.title}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.description}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.location}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.datetime}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.name}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.email}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.num}</TableCell>
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
                  <TableCell>
                    <Button
                      variant='contained'
                      sx={{
                        backgroundColor: '#DCDCDC',
                        color: '#000000',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#bbbbbb',
                        }
                      }}
                      onClick={() => { MarkAsReadHandler(val._id) }}
                    >
                      Mark As Read
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

export default AdminReport
