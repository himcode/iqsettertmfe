import React, { useContext } from 'react';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { NotificationContext } from './NotificationProvider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


const Navbar = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { notify } = useContext(NotificationContext);
  // const accessToken = useSelector(state => state.auth.accessToken);

  // const handleLogout = () => {
  //   dispatch(logout());
  //   localStorage.removeItem('authState');
  //   notify && notify('Logged out successfully', 'success');
  //   navigate('/login');
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            IQsetter TM
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;