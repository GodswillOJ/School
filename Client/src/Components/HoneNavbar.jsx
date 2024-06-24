import React, { useState } from 'react';
import { LightModeOutlined, DarkModeOutlined, SettingsOutlined, ShoppingCart } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlexBetween from "./flexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLoginStatus } from "../state/index";
import { useGetUserQuery } from 'state/api';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, useTheme, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Corrected import statement

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.global.user.isLoggedIn);
  const userRole = useSelector(state => state.global.user.role); // Assuming the role is stored in state.global.user.role
  const { userID } = useSelector((state) => state.global.user);
  const { data, error, isLoading } = useGetUserQuery(userID);
  const [anchorEl, setAnchorEl] = useState(null);
  
  console.log("data: ", data, userID)

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
    navigate('/loginUser');
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
                <Link href={userRole === 'admin' ? '/clientDashboard' : '/dashboard'} sx={{ textDecoration: 'none', color: 'inherit' }}>
                  Dashboard
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/user/cart" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  <ShoppingCart />
                  {data && data.cart ? data.cart.items.length : 0} {/* Adjust this to reflect your data structure */}
                </Link>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : [
                <MenuItem key="login" onClick={handleMenuClose}>
                  <Link href="/loginUser" sx={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                </MenuItem>,
                <MenuItem key="register" onClick={handleMenuClose}>
                  <Link href="/registerClient" sx={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
                </MenuItem>
              ]}
            </Menu>
          </div>

          <IconButton onClick={() => dispatch(setMode())}>
            {isDarkMode ? (
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
