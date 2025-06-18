import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const submitHandler = () => {
    axios
      .post('http://localhost:3000/login', { email, password })
      .then((result) => {
        console.log(result)
        if (result.data === "Success") {
          navigate('/home')
        }
      })
      .catch((err) => console.log(err))
  };

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="/videos/vecteezy_digital-earth-hud-rotating-globe-rotating_4358884.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box component="section" sx={{ p: 4, border: '1px solid rgb(1, 23, 46)',bgcolor:'rgb(54, 92, 133)' }} width={300} height={380}>
          <Typography variant='h2'>LogIn</Typography><br />
          <Typography variant='h5'>Email</Typography>
          <TextField variant='outlined' label="Email" onChange={(e) => setEmail(e.target.value)}></TextField><br /><br />
          <Typography variant='h5'>Password</Typography>
          <TextField variant='outlined' label="password" onChange={(e) => setPassword(e.target.value)}></TextField><br /><br />
          <Button variant='contained' onClick={submitHandler} sx={{ borderRadius: '20px', px: 4, alignSelf: 'center', '&:focus': { outline: 'none', border: 'none', }, }}>LogIn</Button>
        </Box>
      </div>
    </>
  )
}

export default Login
