import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Display = () => {
     var [articles,setarticles]=useState([])
    //useEffect(()=>{},[]) to maintain bulk users
    useEffect(()=>{
        //axios.get("url").then((res)=>{}).catch()
        axios.get("https://gnews.io/api/v4/top-headlines?token=7446a1d00903543ecdbe8506418ea6d6&lang=en&country=in&max=20").then((res)=>{
            console.log(res.data.articles.length)
            setarticles(res.data.articles)
        }).catch((err) => console.log(err))
    },[])
  return (
    <div className="box">
       <Grid container spacing={2}> 
      {
        articles.map((val,i)=>{
          return(
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                              sx={{ height: 240 }}
                              image={val.image || 'https://via.placeholder.com/345x240.png?text=No+Image'}
                              title={val.title}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h6" component="div">
                                {val.title}
                              </Typography>
                              <Typography gutterBottom variant="body2" component="div">
                                 {new Date(val.publishedAt).toLocaleString()}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                               { val.description}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" 
                              onClick={() =>
                    navigator.share
                      ? navigator.share({
                          title: val.title,
                          text: val.description,
                          url: val.url,
                        })
                      : alert('Share not supported in your browser')
                  }>Share</Button>
                              <Button size="small" href={val.url} target="_blank" rel="noopener noreferrer">Learn More</Button>
                            </CardActions>
                          </Card>
            </Grid>
         
          )
        })
      }
      </Grid> 
    </div>
  )
}

export default Display
