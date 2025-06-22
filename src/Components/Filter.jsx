import { Box, Button, InputBase, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Filter = ({ setCategory, setCountry, setSearch }) => {
    const categories = ['general', 'technology', 'sports', 'health', 'business', 'science', 'entertainment'];
  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'in', name: 'India' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'au', name: 'Australia' },
    { code: 'ca', name: 'Canada' }
  ];

  const [anchorElCat, setAnchorElCat] = useState(null);
  const [anchorElCountry, setAnchorElCountry] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearch(searchInput);
    }
  };
  return (
    <div>
       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
      {/* Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: 1, px: 1,border: '1px solid black' }}>
        <InputBase
          placeholder="Search…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          sx={{ ml: 1, flex: 1 }} 
        />
        <SearchIcon sx={{ color: 'gray' }} />
      </Box>

      {/* Category */}
      <Box>
        <Button variant="contained" sx={{
      backgroundColor: '#800808',
       '&:hover': { backgroundColor: '#a00a0a' }
       }}
    onClick={(e) => setAnchorElCat(e.currentTarget)}>Category</Button>
        <Menu anchorEl={anchorElCat} open={Boolean(anchorElCat)} onClose={() => setAnchorElCat(null)}>
          {categories.map((cat, idx) => (
            <MenuItem key={idx} onClick={() => { setCategory(cat); setAnchorElCat(null); }}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Country */}
      <Box>
        <Button variant="contained" sx={{
       backgroundColor: '#800808',
      '&:hover': { backgroundColor: '#a00a0a' }
       }}
       onClick={(e) => setAnchorElCountry(e.currentTarget)}>Country</Button>
        <Menu anchorEl={anchorElCountry} open={Boolean(anchorElCountry)} onClose={() => setAnchorElCountry(null)}>
          {countries.map((c, idx) => (
            <MenuItem key={idx} onClick={() => { setCountry(c.code); setAnchorElCountry(null); }}>
              {c.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
    </div>
  )
}

export default Filter
