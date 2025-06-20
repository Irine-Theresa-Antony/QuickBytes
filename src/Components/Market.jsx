import { Button, Card, CardActionArea, CardContent, Grid, Typography, Box } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Market = () => {
    var [pro,setPro]=useState([]);
    useEffect(()=>{
            axios
            .get("http://localhost:3000/innovations")
            .then((res)=>{
                console.log(res.data);
                setPro(res.data)
            })
            .catch((err)=>console.log(err));
        },[])
  return (
    <div style={{
        backgroundImage:  "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2g5vi6Yyx57V5a8vbqY2AgQXR11yS743Cng&s')",
        minHeight: '100vh'}}>
       <Grid container spacing={2} justifyContent="center"> 
        <div style={{ display: 'flex', alignItems: 'center', gap: '34rem',backgroundColor:'#E3F2FD', width: "100%", padding: '0 2rem'}}>
            <Typography variant='h2' color='black'>Marketplace & Careers</Typography>&nbsp;
            <Button component={Link} to="/addtomarket" variant='contained' color='success' sx={{borderRadius: '20px',px: 3,py:1,fontSize: '1.2rem','&:focus': {outline: 'none',border: 'none', },}}>
                ADD   
            </Button>
        </div>
        {pro.map((val,i)=>{
            return(
                    <Grid item xs={12} sm={6} md={4} key={i} className="grid-item">
                        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', border:'2px solid rgb(0, 0, 0)', backgroundColor:'rgb(131, 180, 213)' }}>
                            <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ textAlign: 'left', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div>
                                        <Typography gutterBottom variant="h3" component="div">
                                            {val.ProductName}
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: 'black' , whiteSpace: 'pre-line' }}>
                                            <strong>Details:</strong> {val.Details}
                                        </Typography>
                                    </div>
                                    <Box sx={{ mt: 'auto' }}>
                                        <Typography variant='h5'><strong>Contact:</strong></Typography>
                                        <Typography variant="h6"><strong>Phone:</strong> {val.PhoneNumber}</Typography>
                                        <Typography variant="h6"><strong>Email:</strong> {val.Email}</Typography>
                                        <Typography variant="h6"><strong>Submitted on:</strong> {new Date(val.Doj).toLocaleDateString()}</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>   
                    </Grid>
            )
        })}
      </Grid> 
    </div>
  )
}

export default Market
