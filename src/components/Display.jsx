


import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Display = () => {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const normalizeApi1 = (item) => ({
    title: item.title,
    description: item.description,
    content: item.content,
    url: item.url,
    image: item.urlToImage || 'https://via.placeholder.com/345x240.png?text=No+Image',
    publishedAt: new Date(item.publishedAt),
    source: item.source?.name || 'Source 1',
  });

  const normalizeApi2 = (item) => ({
    title: item.title,
    description: item.description,
    content: item.content,
    url: item.url,
    image: item.image || 'https://via.placeholder.com/345x240.png?text=No+Image',
    publishedAt: new Date(item.publishedAt),
    source: item.source?.name || 'Source 2',
  });

  const normalizeApi3 = (item) => ({
    title: item.title,
    description: item.description,
    content: item.content,
    url: item.url,
    image: item.image || 'https://via.placeholder.com/345x240.png?text=No+Image',
    publishedAt: new Date(item.publishedAt),
    source: item.name,
  });

  useEffect(() => {
    const fetchNews = async () => {
      let data = [];
      let combinedData = [];
      let apiNews = [];


      try {
      // Try API 1
      const res1 = await axios.get(
        'https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&pageSize=20&language=en&apiKey=954c3723dea74bdcbb55ab18866a3274'
      );
      apiNews = res1.data.articles.map(normalizeApi1);
    } catch (err) {
      console.warn('API 1 failed, trying fallback:', err.response?.status || err.message);
      try {
        // Try API 2 if API 1 fails
        const res2 = await axios.get(
          'https://gnews.io/api/v4/top-headlines?token=7446a1d00903543ecdbe8506418ea6d6&lang=en&country=in&max=10'
        );
        apiNews = res2.data.articles.map(normalizeApi2);
      } catch (err2) {
        console.error('Both APIs failed:', err2);
      }
    }

      //custom news
       
    try {
      const res3 = await axios.get("http://localhost:3000/viewcustom");
      const customNews = res3.data.map(normalizeApi3);

      // Combine API + Custom
      combinedData = [...apiNews, ...customNews];
    } catch (err3) {
      console.error("Custom API failed:", err3);
      // Even if custom fails, still use API news
      combinedData = [...apiNews];
    }

      setArticles(combinedData.sort((a, b) => b.publishedAt - a.publishedAt));
    };

    fetchNews();
  }, []);


  //useEffect(()=>{},[]) to maintain bulk users
      useEffect(()=>{
        
          //axios.get("url").then((res)=>{}).catch()
          axios.get("https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&pageSize=20&language=en&apiKey=954c3723dea74bdcbb55ab18866a3274")
          .then((res)=>{
              console.log(res.data.articles.length)
              setArticles(res.data.articles)
          }).catch((err) => console.log(err))
      },[])
  
      const handleOpen = (articles) => {
      setSelectedArticle(articles);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedArticle(null);
    };
  


  return (
    <div className="box">
      <Grid container spacing={2} justifyContent="center">
        {articles.map((val, i) => (
          <Grid item xs={12} sm={6} md={4} key={i} className="grid-item">
            
             <Card className="newscard" sx={{ maxWidth: 345 }}>

              <CardMedia sx={{ height: 240 }} image={val.image} title={val.title} />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {val.title}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  {val.publishedAt.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {val.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() =>
                    navigator.share
                      ? navigator.share({
                          title: val.title,
                          text: val.description,
                          url: val.url,
                        })
                      : alert('Share not supported in your browser')
                  }
                >
                  Share
                </Button>
                <Button size="small" onClick={() => handleOpen(val)}>
                 Learn More
                
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
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
  );
};

export default Display;
