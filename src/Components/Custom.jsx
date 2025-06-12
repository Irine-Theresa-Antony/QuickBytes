import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Custom = () => {
    var [input, setinput]=useState({title:"",description:"",content:"",url:"",image:"",publishedAt:"",name:""});
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
            content:location.state.val.content,
            url:location.state.val.url,
            image:location.state.val.image,
           publishedAt:location.state.val.publishedAt,
            name:location.state.val.name,
            })
      },[])

      const submitHandler = () => {
    console.log("btn clicked");
    if (location.state !== null) {
      axios
        .put(`http://localhost:3000/cupdate/${location.state.val._id}`, input)
        .then((res) => {
          alert(res.data);
          navigate('/')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:3000/addcustom", input)
        .then((res) => {
          alert(res.data);
           navigate('/')
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    <Typography variant='h4' >Custom News</Typography>
    <br/><br/>
      <Typography variant='h6' sx={{  textAlign: 'left' }} >Title Of The News:</Typography>
    
    
    <TextField variant='outlined'  label='title name' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='title' value={input.title}></TextField>
    <br/><br/>
    <Typography variant='h6' sx={{  textAlign: 'left' }}>Description Of The News:</Typography>
    
    
    <TextField variant='outlined' label='description' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='description' value={input.description} ></TextField>
    <br/><br/>
    <Typography variant='h6' sx={{  textAlign: 'left' }}>Content Of The News:</Typography>
    
    
    <TextField variant='outlined' label='content' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='content' value={input.content}></TextField>

    <br/><br/>
    <Typography variant='h6' sx={{  textAlign: 'left' }}>Url Of The News:</Typography>
    
    
    <TextField variant='outlined' label='url' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='url' value={input.url}></TextField>
    <br/>
    <br/>

    <Typography variant='h6' sx={{  textAlign: 'left' }}>Image Of The News:</Typography>
    
    
    <TextField variant='outlined' label='link' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='image' value={input.image}></TextField>
    <br/>
    <br/>

    <Typography variant='h6'sx={{  textAlign: 'left' }}>Published At:</Typography>
    
    
    <TextField variant='outlined' label='date & time' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='publishedAt' value={input.publishedAt}></TextField>
    <br/>
    <br/>

    <Typography variant='h6' sx={{  textAlign: 'left' }}>Published By:</Typography>
    
    
    <TextField variant='outlined' label='name' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='name' value={input.name}></TextField>
    <br/>
    <br/>
    <Button variant='contained' fullWidth sx={{ mt: 3 }} onClick={submitHandler}>Enter</Button>
    </Box>
    
    </div>
  )
}

export default Custom