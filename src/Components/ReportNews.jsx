import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ReportNews = () => {

  var [input, setinput] = useState({ title: "", description: "", location: "", datetime: "", name: "", email: "", num: "" });
  var location = useLocation();
  var navigate = useNavigate();

  const inputhandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  }

  useEffect(() => {
    if (location.state !== null)
      setinput({
        ...input,
        title: location.state.val.title,
        description: location.state.val.description,
        content: location.state.val.location,
        url: location.state.val.datetime,
        image: location.state.val.name,
        publishedAt: location.state.val.email,
        name: location.state.val.num,
      })
  }, [])

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
        width: '50%',
        margin: 'auto',
      }}>
        <Typography variant='h4' sx={{
          textAlign: 'center',
          color: '#800808',
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}>
          Report News
        </Typography>

        {[
          { label: 'Title', name: 'title', value: input.title },
          { label: 'Description', name: 'description', value: input.description },
          { label: 'Location', name: 'location', value: input.location },
          { label: 'Date & Time', name: 'datetime', value: input.datetime },
          { label: 'User Name', name: 'name', value: input.name },
          { label: 'Email Id', name: 'email', value: input.email },
          { label: 'Phone No', name: 'num', value: input.num }
        ].map((field, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant='h6' sx={{ color: '#DCDCDC', textAlign: 'left' }}>{field.label} :</Typography>
            <TextField
              variant='outlined'
              label={field.label.toLowerCase()}
              fullWidth
              name={field.name}
              value={field.value}
              onChange={inputhandler}
              sx={{
                mt: 1,
                backgroundColor: '#1e1e1e',
                borderRadius: '5px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#DCDCDC',
                  },
                  '&:hover fieldset': {
                    borderColor: '#800808',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#800808',
                  },
                  '& input': {
                    color: '#DCDCDC',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#DCDCDC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#800808',
                },
              }}
            />
          </Box>
        ))}

        <Button
          variant='contained'
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: '#800808',
            '&:hover': { backgroundColor: '#a00010' },
            color: '#FFFFFF',
            fontWeight: 'bold'
          }}
          onClick={submitHandler}
        >
          Enter
        </Button>
      </Box>
    </div>
  )
}

export default ReportNews
