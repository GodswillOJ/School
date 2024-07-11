import React, { useEffect, useState } from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined
} from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { setMode, setLoginStatus } from "../state/index";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Button,
  MenuItem,
  Menu,
  Box,
  Typography,
  useMediaQuery
} from "@mui/material";
import FlexBetween from "./flexBetween";
import { useLocation, useNavigate } from 'react-router-dom';
import defaultProfile from '../assets/profile.jpg'; // Import the default profile image

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width:760px)');

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const userImageUrl = `https://gotech-ecommerce.onrender.com/public/${user.image}`;

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    dispatch(setLoginStatus(false));
    navigate('/loginUser');
  };

  const userMenuItems = [
    <MenuItem key="settings" onClick={handleClose}>
      <IconButton onClick={() => dispatch(setMode())}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlined sx={{ fontSize: "25px" }} />
        ) : (
          <LightModeOutlined sx={{ fontSize: "25px" }} />
        )}
      </IconButton>
    </MenuItem>,
    <MenuItem key="settings-icon">
      <IconButton>
        <SettingsOutlined sx={{ fontSize: "25px" }} />
      </IconButton>
    </MenuItem>,
    <MenuItem key="logout" onClick={() => { handleClose(); handleLogout(); }}>
      Log Out
    </MenuItem>
  ];

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", display: 'block' }}>
        <Box sx={{ display:'flex', justifyContent: "space-between" }}>
          {/* Left Side */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
          </FlexBetween>

          {/* Right Side */}
          <FlexBetween gap="1.5rem">
            {!isMobile && (
              <>
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
              </>
            )}
            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: "center",
                  textTransform: 'none',
                  gap: '1rem',
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={userImageUrl}
                  onError={(e) => e.target.src = defaultProfile}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100] }}>
                    {user.username}
                  </Typography>
                  <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[300] }}>
                    Username
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                {userMenuItems}
              </Menu>
            </FlexBetween>
          </FlexBetween>
        </Box>

        <Box>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            sx={{ width: '100%' }}
          >
            <InputBase
              placeholder='Search...'
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
                flexGrow:1
              }}
            />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </Box>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
