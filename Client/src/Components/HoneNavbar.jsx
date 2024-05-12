import React, { useState } from 'react';
import { LightModeOutlined, DarkModeOutlined, Search, SettingsOutlined, ShoppingCart } from '@mui/icons-material'; // Import ShoppingCart icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlexBetween from "./flexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state/index";
import { AppBar, IconButton, InputBase, Menu, MenuItem, Toolbar, useTheme, Link } from "@mui/material"; // Added Link from React Router

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log('Rendering Navbar...'); // Debugging

  const isDarkMode = theme.palette.mode === "dark";

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
        {/* Left Side */}
        <FlexBetween>
          <div>
            {/* Wrap "GO_Tech" with Link */}
            <Link href="/home" sx={{ textDecoration: 'none', color: 'inherit' }}>
              <b>GO_Tech</b>
            </Link>
          </div>
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap= "1.5rem">
          {/* Account Circle Icon with dropdown */}
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
                  <Link href="/dashboard" sx={{ textDecoration: 'none' }} color= 'inherit' >Dashboard</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ShoppingCart />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}><Link href="/login" sx={{ textDecoration: 'none', color: 'inherit' }}>Login</Link></MenuItem>
              <MenuItem onClick={handleMenuClose}><Link href="/registerUser" sx={{ textDecoration: 'none', color: 'inherit' }}>Register</Link></MenuItem>
              {/* Replace "Cart" text with ShoppingCart icon */}
            </Menu>
          </div>

          {/* Button for light/dark mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          {/* Button for settings */}
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;
