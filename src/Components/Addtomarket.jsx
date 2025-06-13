import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Addtomarket = (props) => {
  var [inputs,setInput]=useState({ProductName:'',Details:'',PhoneNumber:'',Email:''});
  var location =useLocation();
  var navigate= useNavigate();
  console.log("state:",location.state);
  const inputHandler=(e)=>{
    setInput({...inputs,[e.target.name]:e.target.value});
    console.log(inputs);
  };
  useEffect(()=> {
    if(location.state!==null){
      setInput({...inputs,
        ProductName:location.state.val.ProductName,
        Details:location.state.val.Details,
        PhoneNumber:location.state.val.PhoneNumber,
        Email:location.state.val.Email
      });
    }
  },[])

  const submitHandler=()=>{
    console.log("btn clicked");
    if(location.state!==null){
      axios
      .put(`http://localhost:3000/${location.state.val._id}`,inputs)
      .then((res)=>{
        alert(res.data);
        navigate('/home')
      })
      .catch((err)=>{
        console.log(err);
      });
    }
    else{
      axios.post('http://localhost:3000/addtomarket',inputs)
    .then((res)=>{
      console.log(res);
      alert(res.data)
      navigate('/')
    })
    .catch((err)=>{
      console.log(err);
    });
    }
  };
  return (
    <div >
        <Box sx={{ padding: 5, display: 'flex',flexDirection: 'column',alignItems: 'flex-start', }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '34rem' }}>
            <Typography variant='h2' color='#1976d2'>Marketplace & Careers</Typography>&nbsp;
            <Button variant='contained' color='success' onClick={submitHandler}sx={{borderRadius: '20px',px: 3,py:1,fontSize: '1.2rem','&:focus': {outline: 'none',border: 'none', },}}>
                SUBMIT
            </Button>
            </div>
            <br />
            <Typography variant='h4'>ProductName</Typography>
            <TextField fullWidth variant='outlined' label="productname" onChange={inputHandler} name='ProductName'value={inputs.ProductName}></TextField><br />
            <Typography fullWidth variant='h4'>Details</Typography>
            <TextField fullWidth variant='outlined' label="details" onChange={inputHandler} name='Details'value={inputs.Details} multiline rows={10} ></TextField><br />
            <Typography variant='h4'>PhoneNumber</Typography>        
            <TextField fullWidth variant='outlined' label="phonenumber" onChange={inputHandler} name='PhoneNumber'value={inputs.PhoneNumber}></TextField><br />
            <Typography variant='h4'>Email</Typography>
            <TextField fullWidth variant='outlined' label="email" onChange={inputHandler} name='Email'value={inputs.Email}></TextField>
        </Box>
    </div>
  )
}
export default Addtomarket
