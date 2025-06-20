import { AppBar,Box, Button, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';



const Navbar = ({ setShowLikedOnly}) => {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
 
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setLeftMenuOpen(true)} // <-- open menu
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuickBytes
          </Typography>
            
           {/*  Login */}
          <Button color="inherit">
            Login
          </Button>
              
           <Button color="inherit"> <Link to ={'/r'} style={{color:"white"}}>dashboard</Link> </Button>

            
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
