import React from 'react';
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined } from '@mui/icons-material';
import FlexBetween from "./flexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state/index";
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from "@mui/material";

const Navbar = (
    // hiding side bar functionality
{    isSidebarOpen,
    setIsSidebarOpen,}
) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  console.log('Rendering Navbar...'); // Debugging

  return (
      <AppBar 
          sx={{
              position: "static",
              background: "none",
              boxShadow: "none",
          }}
      >
          <Toolbar sx={{ justifyContent: "space-between"}}>
              {/* Left Side */}
              <FlexBetween>
              {/*  rendering the sidebar button functionality */}
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen) }>
                      <MenuIcon/>
                  </IconButton>
                  <FlexBetween 
                      backgroundColor={theme.palette.background.alt}
                      borderRadius="9px"
                      gap="3rem"
                      p="0.1rem 1.5rem"
                  >
                      <InputBase placeholder='Search....'/>
                      <IconButton>
                          <Search/>
                      </IconButton>
                  </FlexBetween>
              </FlexBetween>

              {/* Right Side */}
              <FlexBetween gap= "1.5rem">
                  {/* button light/dark mode */}
                  <IconButton onClick={() => dispatch(setMode())}>
                      {theme.palette.mode === "dark" ? (
                          <DarkModeOutlined sx={{ fontSize: "25px" }} />
                      ) : (
                          <LightModeOutlined sx={{ fontSize: "25px" }} />
                      )}
                  </IconButton>

                  {/* button light/dark mode */}
                  <IconButton>
                      <SettingsOutlined sx={{ fontSize: "25px" }}/>
                  </IconButton>

              </FlexBetween>
          </Toolbar>
      </AppBar>
  );
};

export default Navbar;
