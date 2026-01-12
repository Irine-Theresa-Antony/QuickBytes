import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, {  useState } from 'react'
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

  const submitHandler=()=>{
    console.log("btn clicked");
    
      axios.post('http://localhost:3000/addtomarket',inputs)
    .then((res)=>{
      console.log(res);
      alert(res.data)
      navigate('/market')
    })
    .catch((err)=>{
      console.log(err);
    });
   
  };
  return (
    <div >
        
            <div style={{ display: 'flex', alignItems: 'center', gap: '34rem',backgroundColor:'white', width: "100%", padding: '0 2rem' }}>
            <Typography variant='h2' color='#800808'>Marketplace & Careers</Typography>&nbsp;
            <Button variant='contained' onClick={submitHandler}sx={{backgroundColor:"#800808", borderRadius: '20px',px: 3,py:1,fontSize: '1.2rem','&:focus': {outline: 'none',border: 'none', },}}>
                SUBMIT
            </Button>
            </div>
            <Box sx={{ padding: 5, display: 'flex',flexDirection: 'column',alignItems: 'flex-start',backgroundColor:"white" }}>
            <Typography variant='h4' color='black'>ProductName</Typography>
            <TextField fullWidth variant='outlined' label="productname" onChange={inputHandler} name='ProductName'value={inputs.ProductName}></TextField><br />
            <Typography fullWidth variant='h4'color='black'>Details</Typography>
            <TextField fullWidth variant='outlined' label="details" onChange={inputHandler} name='Details'value={inputs.Details} multiline rows={10} ></TextField><br />
            <Typography variant='h4'color='black'>PhoneNumber</Typography>        
            <TextField fullWidth variant='outlined' label="phonenumber" onChange={inputHandler} name='PhoneNumber'value={inputs.PhoneNumber}></TextField><br />
            <Typography variant='h4'color='black'>Email</Typography>
            <TextField fullWidth variant='outlined' label="email" onChange={inputHandler} name='Email'value={inputs.Email}></TextField>
        </Box>
    </div>
  )
}
export default Addtomarket
