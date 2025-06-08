import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Custom = () => {
    var [input, setinput]=useState({title:"",des:"",content:"",url:"",link:"",datetime:"",name:""});

    const inputhandler=(e)=>{
          setinput({...input,[e.target.name]:e.target.value});
          console.log(input);
      }

      const submitHandler = () => {
    console.log("btn clicked");
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
    
    
    <TextField variant='outlined' label='description' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='des' value={input.des} ></TextField>
    <br/><br/>
    <Typography variant='h6' sx={{  textAlign: 'left' }}>Content Of The News:</Typography>
    
    
    <TextField variant='outlined' label='content' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='content' value={input.content}></TextField>

    <br/><br/>
    <Typography variant='h6' sx={{  textAlign: 'left' }}>Url Of The News:</Typography>
    
    
    <TextField variant='outlined' label='url' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='url' value={input.url}></TextField>
    <br/>
    <br/>

    <Typography variant='h6' sx={{  textAlign: 'left' }}>Image Of The News:</Typography>
    
    
    <TextField variant='outlined' label='link' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='link' value={input.link}></TextField>
    <br/>
    <br/>

    <Typography variant='h6'sx={{  textAlign: 'left' }}>Published At:</Typography>
    
    
    <TextField variant='outlined' label='date & time' fullWidth sx={{ mt: 2 }} onChange={inputhandler} name='datetime' value={input.datetime}></TextField>
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