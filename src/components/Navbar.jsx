import { AppBar,Box, Button, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';



const Navbar = ({ setShowLikedOnly}) => {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
 
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#800808' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setLeftMenuOpen(true)} // <-- open menu
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='left'>QuickBytes</Typography>
          <Button color="inherit"> <Link to ={'/home'} style={{color:"white"}}>Home</Link> </Button> 
          <Button color="inherit"> <Link to ={'/market'} style={{color:"white"}}>Market</Link> </Button>
          <Button color="inherit"><Link to ={'/message'} style={{color:"white"}}>Chat</Link></Button>
          <Button color="inherit"> <Link to ={'/r'} style={{color:"white"}}>Dashboard</Link> </Button>
          <Button color="inherit"><Link to ={'/login'} style={{color:"white"}}>Logout</Link></Button>
        </Toolbar>
      </AppBar>

        
     {/*  */}
     <Drawer anchor="left" open={leftMenuOpen} onClose={() => setLeftMenuOpen(false)}>
    <List>
    <ListItem button onClick={() => {
      setShowLikedOnly(prev => !prev);
      setLeftMenuOpen(false);
    }}>
      <ListItemText primary="Show Liked News" />
    </ListItem>
   </List>
   </Drawer>
    </Box>
    </div>
  )
}

export default Navbar
