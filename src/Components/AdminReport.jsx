
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminReport = () => {

    var [repo,setrepo]=useState([])
  var navigate= useNavigate();
  useEffect(()=>{
    axios
    .get("http://localhost:3000/viewreport")
    .then((res)=>{
      console.log(res.data)
      setrepo(res.data)
    })
    .catch((err)=>
      console.log(err)
    )
  },[])

  const DeleteHandler=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:3000/rdel/${id}`).then((res)=>{
          console.log(res);
          alert(res.data)
          window.location.reload()
        }).catch((err)=>{
          console.log(err);
        })
      }

      const MarkAsReadHandler = (id) => {
  console.log(id);
  axios.put(`http://localhost:3000/markasread/${id}`).then((res)=>{
    console.log(res);
    alert(res.data);
    window.location.reload();
  }).catch((err)=>{
    console.log(err);
  })
}



  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    }}>
    <TableContainer style={{
          margin:'30px',
          border: '2px solid lightblue',
          width: '100%',  
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Location</TableCell>
            <TableCell >Date & Time</TableCell>
            <TableCell >User Name</TableCell>
            <TableCell >Email Id</TableCell>
            <TableCell >Number</TableCell>
            <TableCell >Delete</TableCell>
            <TableCell >Mark As Read</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...repo].reverse().map((val,i)=>{
            return(
                <TableRow key={i} style={val.isRead ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
                <TableCell>{val.title}</TableCell>
                <TableCell>{val.description}</TableCell>
                <TableCell>{val.location}</TableCell>
                <TableCell>{val.datetime}</TableCell>
                <TableCell>{val.name}</TableCell>
                <TableCell>{val.email}</TableCell>
                <TableCell>{val.num}</TableCell>
                <TableCell><Button variant='outlined' color='error' onClick={()=>{DeleteHandler(val._id)}}>Delete</Button></TableCell>
                <TableCell><Button variant='outlined' color='success' onClick={()=>{MarkAsReadHandler(val._id)}}>Mark As Read</Button></TableCell>
                </TableRow>
            )
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default AdminReport