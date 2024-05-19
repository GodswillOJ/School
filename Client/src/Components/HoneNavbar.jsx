import React, { useState } from 'react';
import { LightModeOutlined, DarkModeOutlined, SettingsOutlined, ShoppingCart } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlexBetween from "./flexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLoginStatus } from "../state/index";
import { AppBar, IconButton, Menu, MenuItem, Toolbar, useTheme, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.global.user.isLoggedIn);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isDarkMode = theme.palette.mode === "dark";

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    dispatch(setLoginStatus(false));
    navigate('/login');
  };

  return (
    <AppBar 
      sx={{
        position: "fixed",
        background: isDarkMode ? theme.palette.background.default : "white",
        boxShadow: isDarkMode ? "0px 0px 10px 0px rgba(255,255,255,0.5)" : "#000",
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between"}}>
        <FlexBetween>
          <div>
            <Link href="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
              <b>GO_Tech</b>
            </Link>
          </div>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          <div className='User_nav'>
            <IconButton onClick={handleMenuOpen}>
              <AccountCircleIcon/>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link href="/dashboard" sx={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ShoppingCart />
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : [
                <MenuItem key="login" onClick={handleMenuClose}>
                  <Link href="/login" sx={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                </MenuItem>,
                <MenuItem key="register" onClick={handleMenuClose}>
                  <Link href="/registerUser" sx={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
                </MenuItem>
              ]
              }
            </Menu>
          </div>

          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;
