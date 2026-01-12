import React, { useEffect, useState } from 'react';
import { TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);

  const username = localStorage.getItem('username') || 'You';

  //Listen for incoming messages
   useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receiveMessage');
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' && !file) return;

    const messageData = {
      sender: username,
      text: newMessage,
      type: file ? 'media' : 'text',
      file: null,
    };
  if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        messageData.file = reader.result; 
        socket.emit('sendMessage', messageData);
        setMessages((prev) => [...prev, messageData]);
        setNewMessage('');
        setFile(null);
      };
      reader.readAsDataURL(file);
    } else {
      socket.emit('sendMessage', messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage('');
    }
  };

  return (
    <div><br /><br />
        <Typography 
            variant='h3' 
            style={{ 
                textAlign: 'center', 
                color: 'white' 
            }}
            >
            QuickBytes Community Chat
        </Typography><br />
        <div className="chat-outer">
        <div className="chat-box">
            <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-group ${msg.sender === username ? 'right' : 'left'}`}
              >
                <div className="chat-username">
                  {msg.sender === username ? 'You' : msg.sender}
                </div>
                <div className="chat-bubble">
                {msg.type === 'media' && msg.file ? (
                  msg.file.startsWith('data:video') ? (
                    <video src={msg.file} controls style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  ) : (
                    <img src={msg.file} alt="sent-media" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  )
                ) : (
                  msg.text
                )}
              </div>
              </div>
            ))}
            </div>
            <div className="chat-input">
            <TextField
                variant="outlined"
                placeholder="Type a message"
                fullWidth
                value={file ? file.name : newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
                }}
                InputProps={{
                style: { color: 'white' },
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton component="label">
                        <AttachFileIcon />
                        <input
                          type="file"
                          hidden
                          onChange={(e) => setFile(e.target.files[0])}
                        />

                    </IconButton>
                    <IconButton onClick={handleSendMessage}>
                        <SendIcon style={{ color: 'white' }} />
                    </IconButton>
                    </InputAdornment>
                ),
                }}
                sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                    borderColor: 'white',
                    borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                    borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                    borderColor: 'white',
                    },
                },
                }}
            />
            </div>
        </div>
        </div>
    </div>
  );
};

export default Message;
