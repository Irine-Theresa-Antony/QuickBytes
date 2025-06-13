import { AppBar,Box, Button, IconButton, Toolbar, Typography,Menu, MenuItem, InputBase, Drawer, List, ListItem, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';


const Navbar = ({ setCategory ,setCountry,setSearch,setShowLikedOnly}) => {
  const [anchorEl, setAnchorEl] = useState(null); // for category button
  const categories = ['general', 'technology', 'sports', 'health', 'business', 'science', 'entertainment'];
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
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

  const [searchInput, setSearchInput] = useState('');
  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearch(searchInput); // pass search term to parent
    }
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
            onClick={() => setLeftMenuOpen(true)} // <-- open menu
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuickBytes
          </Typography>

           {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: 1, px: 1 }}>
            <InputBase
              placeholder="Search…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              sx={{ ml: 1, flex: 1 }}
            />
            <SearchIcon sx={{ color: 'gray' }} />
          </Box>

            
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
