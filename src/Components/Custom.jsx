import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Custom = () => {
    var [input, setinput] = useState({ title: "", description: "", content: "", url: "", image: "", publishedAt: "", name: "" });
    var location = useLocation();
    var navigate = useNavigate();

    const inputhandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (location.state !== null)
            setinput({
                ...input,
                title: location.state.val.title,
                description: location.state.val.description,
                content: location.state.val.content,
                url: location.state.val.url,
                image: location.state.val.image,
                publishedAt: location.state.val.publishedAt,
                name: location.state.val.name,
            });
    }, []);

    const submitHandler = () => {
        if (location.state !== null) {
            axios.put(`http://localhost:3000/cupdate/${location.state.val._id}`, input)
                .then((res) => {
                    alert(res.data);
                    window.location.reload();
                    navigate('/');
                }).catch((err) => console.log(err));
        } else {
            axios.post("http://localhost:3000/addcustom", input)
                .then((res) => {
                    alert(res.data);
                    navigate('/home');
                }).catch((err) => console.log(err));
        }
    }

    return (
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', padding: '2rem' }}>
            <Box
                sx={{
                    width: 800,
                    margin: '3rem auto',
                    padding: '3rem',
                    backgroundColor: '#000000',
                    border: '1px solid #DCDCDC',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'bold', color: '#800808', mb: 4 }}>
                    Custom News
                </Typography>

                {[
                    { label: "Title Of The News", name: "title" },
                    { label: "Description Of The News", name: "description" },
                    { label: "Content Of The News", name: "content" },
                    { label: "Url Of The News", name: "url" },
                    { label: "Image Of The News", name: "image" },
                    { label: "Published At", name: "publishedAt" },
                    { label: "Published By", name: "name" },
                ].map((field, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1, color: '#FFFFFF',textAlign: 'left' }}>{field.label}:</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name={field.name}
                            value={input[field.name]}
                            onChange={inputhandler}
                            label={field.label}
                            InputLabelProps={{
                                sx: {
                                    color: '#DCDCDC',
                                    '&.Mui-focused': { color: '#800808' }
                                }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#DCDCDC' },
                                    '&:hover fieldset': { borderColor: '#800808' },
                                    '&.Mui-focused fieldset': { borderColor: '#800808' },
                                },
                                '& input': {
                                    color: '#FFFFFF',
                                },
                               
                            }}
                        />
                    </Box>
                ))}

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: '#800808',
                        '&:hover': { backgroundColor: '#a00010' },
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        padding: '0.8rem',
                        color: '#FFFFFF',
                        borderRadius: '8px',
                    }}
                    onClick={submitHandler}
                >
                    Submit
                </Button>
            </Box>
        </div>
    );
}

export default Custom;
