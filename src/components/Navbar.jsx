import { AppBar,Box, Button, IconButton, Toolbar, Typography,Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = ({ setCategory ,setCountry}) => {
  const [anchorEl, setAnchorEl] = useState(null); // for category button
  const categories = ['general', 'technology', 'sports', 'health', 'business', 'science', 'entertainment'];

  const [anchorCountryEl, setAnchorCountryEl] = useState(null);
  const countries = [
      { code: 'us', name: 'United States' },
      { code: 'in', name: 'India' },
      { code: 'gb', name: 'United Kingdom' },
      { code: 'au', name: 'Australia' },
      { code: 'ca', name: 'Canada' }
    ];

  
  // When category button is clicked
  const handleCategoryClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu and optionally set category
  const handleCategoryClose = (category) => {
    setAnchorEl(null);
    if (category) setCategory(category);
  };

   // Handlers for Country
  const handleCountryClick = (event) => {
    setAnchorCountryEl(event.currentTarget);
  };

  const handleCountryClose = (code) => {
    setAnchorCountryEl(null);
    if (code) setCountry(code);
  };


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
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuickBytes
          </Typography>

           {/*  Category Filter Button */}
            <Button color="inherit" onClick={handleCategoryClick}>
            Category
            </Button>
            <br /><br />
          
           {/*  Country Placeholder */}
            <Button color="inherit" onClick={handleCountryClick}>Country</Button>
            <br /><br />
           {/*  Login */}
          <Button color="inherit">
            Login
          </Button>

             
           <Button color="inherit"> <Link to ={'/r'} style={{color:"white"}}>dashboard</Link> </Button>

            
        </Toolbar>
      </AppBar>

        {/*  Dropdown Menu for Category */}
         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleCategoryClose(null)}>
          {categories.map((cat, idx) => (
          <MenuItem key={idx} onClick={() => handleCategoryClose(cat)}>
           {cat.charAt(0).toUpperCase() + cat.slice(1)}
         </MenuItem>
              ))}
         </Menu>


      {/* Country Dropdown */}
      <Menu anchorEl={anchorCountryEl} open={Boolean(anchorCountryEl)} onClose={() => handleCountryClose(null)}>
        {countries.map((c, idx) => (
          <MenuItem key={idx} onClick={() => handleCountryClose(c.code)}>
            {c.name}
          </MenuItem>
        ))}
      </Menu>

    </Box>
    </div>
  )
}

export default Navbar
