
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Viewcustom = () => {
 var [cnews,setcnews]=useState([])
  var navigate= useNavigate();
  useEffect(()=>{
    axios
    .get("http://localhost:3000/viewcustom")
    .then((res)=>{
      console.log(res.data)
      setcnews(res.data)
    })
    .catch((err)=>
      console.log(err)
    )
  },[])

  const DeleteHandler=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:3000/cdel/${id}`).then((res)=>{
          console.log(res);
          alert(res.data)
          window.location.reload()
        }).catch((err)=>{
          console.log(err);
        })
      }

      const updateHandler=(val)=>{
        console.log(val);
        navigate('/c',{state:{val}})
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
            <TableCell >Content</TableCell>
            <TableCell >Url</TableCell>
            <TableCell >Image</TableCell>
            <TableCell >PublishedAt</TableCell>
            <TableCell >PublishedBy</TableCell>
            <TableCell >Delete</TableCell>
            <TableCell >Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cnews.map((val,i)=>{
            return(
                <TableRow key={i}>
                <TableCell>{val.title}</TableCell>
                <TableCell>{val.description}</TableCell>
                <TableCell>{val.content}</TableCell>
                <TableCell>{val.url}</TableCell>
                <TableCell>{val.image}</TableCell>
                <TableCell>{val.publishedAt}</TableCell>
                <TableCell>{val.name}</TableCell>
                <TableCell><Button variant='outlined' color='error' onClick={()=>{DeleteHandler(val._id)}}>Delete</Button></TableCell>
                <TableCell><Button variant='outlined' color='success' onClick={()=>{updateHandler(val)}}>Update</Button></TableCell>
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

export default Viewcustom