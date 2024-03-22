import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  Avatar
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';


const drawerWidth = 240;
const navItems = [
  { label: 'Products', link: '/' },
  { label: 'Add Products', link: '/add' },
  { label: 'Update Products', link: '/update' }
];
const navItems2 = [
  { label: 'Signup', link: '/signup' },
  { label: 'Login', link: '/login' },
];
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Logged out successfully');
  };
  const auth = localStorage.getItem('user');
const [user,setUser]=useState(auth)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setUser(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
      };
const handleProfile = () => {
  navigate( '/profile')
  setAnchorEl(null);

}
const handleLogout = () => {
  localStorage.removeItem('user');
  navigate('/login');
  setAnchorEl(null);
    toast.success('Logged out successfully');
}

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
       MERN E-Com
      </Typography>
      <Divider />
      {auth ? <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.link} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> : <List>
        {navItems2.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.link} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>}

    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color='secondary' component="nav" position='sticky'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MERN E-Com
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
           {(auth ? navItems.map((item) => (
              <Button className='navul' key={item.label} component={Link} to={item.link} >
                {item.label}
              </Button>
            )) : navItems2.map((item) => (
              <Button  key={item.label} component={Link} to={item.link} sx={{marginLeft:2,width:'50px'}} variant='contained'>
                {item.label}
              </Button>
            )))}
          </Box>
          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
               <Avatar>{JSON.parse(auth).name[0]} </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ):null}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

    </Box>
  );
}


export default DrawerAppBar;
