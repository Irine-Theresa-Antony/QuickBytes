import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Container,
  Typography,
  Alert
} from "@mui/material";
import "../Dashboard.css"; 

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reviews")
      .then((res) => {
        setReviews(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch reviews");
        setLoading(false);
      });
  }, []);

  

  return (
    <Container className="reviewbox-container">
      <Typography variant="h4" gutterBottom className="reviewbox-heading">
        User Reviews
      </Typography>
      <div className="reviewbox-list">
        {reviews.map((item, index) => (
          <div className="reviewbox-box" key={index}>
            <p className="reviewbox-text">"{item.review}"</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Review;

