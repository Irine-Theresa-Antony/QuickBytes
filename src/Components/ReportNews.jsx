import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ReportNews = () => {

    var [input, setinput]=useState({title:"",description:"",location:"",datetime:"",name:"",email:"",num:""});
    var location=useLocation();
    var navigate=useNavigate();

    const inputhandler=(e)=>{
          setinput({...input,[e.target.name]:e.target.value});
          console.log(input);
      }

      useEffect(()=>{
              if(location.state!==null)
                    setinput({...input,
                  title:location.state.val.title,
                  description:location.state.val.description,
                  content:location.state.val.location,
                  url:location.state.val.datetime,
                  image:location.state.val.name,
                 publishedAt:location.state.val.email,
                  name:location.state.val.num,
                  })
            },[])

    const submitHandler = () => {
    console.log("btn clicked");
    
      axios
        .post("http://localhost:3000/addreport", input)
        .then((res) => {
          alert(res.data);
           navigate('/')
        })
        .catch((err) => {
          console.log(err);
        });
    
}

  return (
    <div>
        <Box
      sx={{
        height: '100%',
        width: 800,
        my: 4,
        marginLeft:'40rem',
        alignItems: 'center',
        gap: 4,
        p: 2,
        border: '2px solid lightblue',
        mx:'auto',
      }}
    >
    <Typography variant='h4' >Report News</Typography>
    <br/><br/>
      <Typography variant='h6' sx={{  textAlign: 'left' }} >Title :</Typography>
    
    
    <TextField variant='outlined'  label='title' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='title' value={input.title}></TextField>
    <br/><br/>
    <Typography variant='h6' sx={{  textAlign: 'left' }}>Description :</Typography>
    
    
    <TextField variant='outlined' label='description' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='description' value={input.description} ></TextField>
    <br/><br/>
    <Typography variant='h6' sx={{  textAlign: 'left' }}>Location :</Typography>
    
    
    <TextField variant='outlined' label='location and district' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='location' value={input.location}></TextField>

    <br/><br/>
    

    <Typography variant='h6'sx={{  textAlign: 'left' }}>Date & Time :</Typography>
    
    
    <TextField variant='outlined' label='date & time' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='datetime' value={input.datetime}></TextField>
    <br/>
    <br/>

    <Typography variant='h6' sx={{  textAlign: 'left' }}>User Name:</Typography>
    
    
    <TextField variant='outlined' label='name' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='name' value={input.name}></TextField>
    <br/>
    <br/>

    <Typography variant='h6' sx={{  textAlign: 'left' }}>Email Id:</Typography>
    
    
    <TextField variant='outlined' label='email' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='email' value={input.email}></TextField>
    <br/>
    <br/>

    <Typography variant='h6' sx={{  textAlign: 'left' }}>Phone No :</Typography>
    
    
    <TextField variant='outlined' label='mobile number' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='num' value={input.num}></TextField>
    <br/>
    <br/>
    <Button variant='contained' fullWidth sx={{ mt: 3 }} onClick={submitHandler}>Enter</Button>
    </Box>
    
    </div>
  )
}

export default ReportNews