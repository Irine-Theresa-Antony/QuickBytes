import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Viewcustom = () => {
  var [cnews, setcnews] = useState([])
  var navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/viewcustom")
      .then((res) => {
        console.log(res.data)
        setcnews(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const DeleteHandler = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3000/cdel/${id}`)
      .then((res) => {
        console.log(res);
        alert(res.data)
        window.location.reload()
      }).catch((err) => console.log(err));
  }

  const updateHandler = (val) => {
    console.log(val);
    navigate('/c', { state: { val } })
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
          View Custom News
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#DCDCDC' }}>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Content</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Url</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>PublishedAt</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>PublishedBy</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Delete</TableCell>
                <TableCell sx={{ color: '#000000', fontWeight: 'bold' }}>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cnews.map((val, i) => (
                <TableRow key={i} sx={{
                  backgroundColor: '#1e1e1e'
                }}>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.title}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.description}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.content}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.url}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.image}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.publishedAt}</TableCell>
                  <TableCell sx={{ color: '#DCDCDC' }}>{val.name}</TableCell>
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
                      onClick={() => { updateHandler(val) }}
                    >
                      Update
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

export default Viewcustom
