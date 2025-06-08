import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'


const drawerWidth = 240;

const Admin = () => {
  return (
    <div >
            <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', justifyContent:'center',
          backgroundColor: '#1976D2', color:'white',},
        }}
      >
        
          <List>
            {['Custom News', 'User Management', 'Alerts', 'Profile'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          
        
      </Drawer>

    </div>
  )
}

export default Admin