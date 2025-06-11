import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Display = () => {
     var [articles,setarticles]=useState([])
     const [open, setOpen] = useState(false);
     const [selectedArticle, setSelectedArticle] = useState(null);
     
    //useEffect(()=>{},[]) to maintain bulk users
    useEffect(()=>{
        //axios.get("url").then((res)=>{}).catch()
        axios.get("https://gnews.io/api/v4/top-headlines?token=7446a1d00903543ecdbe8506418ea6d6&lang=en&country=in&max=20").then((res)=>{
            console.log(res.data.articles.length)
            setarticles(res.data.articles)
        }).catch((err) => console.log(err))
    },[])

    const handleOpen = (article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div style={{ paddingLeft: '3.5%', background: '#f4f4f4', minHeight: '100vh' }}>
       <Grid container spacing={3} justifyContent="center"> 
      {
        articles.map((val,i)=>{
          return(
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ maxWidth: 345,
                          borderRadius: 3,
                          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                          margin: 'auto',
                         backgroundColor: '#fff',
                         height: 450, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' 
                        }}>
                            <CardMedia
                              sx={{ height: 200 }}
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
                               { val.description?.slice(0, 120)}...
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
                              <Button size="small" onClick={() => handleOpen(val)}>Learn More</Button>
                            </CardActions>
                          </Card>
            </Grid>
         
          )
        })
      }
      </Grid> 
      {/* Dialog for full article */}
      {selectedArticle && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{selectedArticle.title}</DialogTitle>
          <DialogContent>
            <Typography gutterBottom variant="body2" component="div">
              {new Date(selectedArticle.publishedAt).toLocaleString()}
            </Typography>
            <Typography variant="body1">
              {selectedArticle.description || "No description available."}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button
              variant="contained"
              href={selectedArticle.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Source
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}


export default Display
