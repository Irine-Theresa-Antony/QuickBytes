import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Custom = () => {
    var [input, setinput]=useState({title:"",description:"",content:"",url:"",link:"",datetime:"",name:""});

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
        width: 400,
        my: 4,
        marginLeft:'40rem',
        alignItems: 'center',
        gap: 4,
        p: 2,
        border: '2px solid lightblue',
      }}
    >
    <Typography variant='h4' >Custom News</Typography>
    <br/><br/>
      <Typography variant='h6' >Title Of The News:</Typography>
    
    
    <TextField variant='outlined' label='title name' onChange={inputhandler} name='title' value={input.title}></TextField>
    <br/><br/>
    <Typography variant='h6'>Description Of The News:</Typography>
    
    
    <TextField variant='outlined' label='description' onChange={inputhandler} name='description' value={input.description} ></TextField>
    <br/><br/>
    <Typography variant='h6'>Content Of The News:</Typography>
    
    
    <TextField variant='outlined' label='content' onChange={inputhandler} name='content' value={input.content}></TextField>

    <br/><br/>
    <Typography variant='h6'>Url Of The News:</Typography>
    
    
    <TextField variant='outlined' label='url' onChange={inputhandler} name='url' value={input.url}></TextField>
    <br/>
    <br/>

    <Typography variant='h6'>Image Of The News:</Typography>
    
    
    <TextField variant='outlined' label='link' onChange={inputhandler} name='link' value={input.link}></TextField>
    <br/>
    <br/>

    <Typography variant='h6'>Published At:</Typography>
    
    
    <TextField variant='outlined' label='date & time' onChange={inputhandler} name='datetime' value={input.datetime}></TextField>
    <br/>
    <br/>

    <Typography variant='h6'>Published By:</Typography>
    
    
    <TextField variant='outlined' label='name' onChange={inputhandler} name='name' value={input.name}></TextField>
    <br/>
    <br/>
    <Button variant='contained' onClick={submitHandler}>Enter</Button>
    </Box>
    
    </div>
  )
}

export default Custom