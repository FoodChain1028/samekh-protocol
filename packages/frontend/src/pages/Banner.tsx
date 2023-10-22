// src/components/Banner.tsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, Link as MuiLink } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const Banner: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            𐤎 Samekh Protocol
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button>
            <MuiLink component={Link} to="/" underline="none" color="inherit" onClick={toggleDrawer(false)}>
              Sign Up
            </MuiLink>
          </ListItem>
          <ListItem button>
            <MuiLink component={Link} to="/dashboard" underline="none" color="inherit" onClick={toggleDrawer(false)}>
              Dashboard
            </MuiLink>
          </ListItem>
          <ListItem button>
            <MuiLink component={Link} to="/login" underline="none" color="inherit" onClick={toggleDrawer(false)}>
              Log In
            </MuiLink>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Banner
