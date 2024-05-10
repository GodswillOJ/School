import React, { useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import HomeNavbar from 'Components/HoneNavbar';
// import Sidebar from "Components/Sidebar"

const HomeLayout = () => {
  const isNonMobile = useMediaQuery("(min-width: 760px)");
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    // Material-UI gives CSS properties in Box
    return (
        <Box width="100%" height="100%">
          <Box>
          <HomeNavbar 
            
          />
          <Outlet
          />
          </Box>
            
        </Box>
    );
}

export default HomeLayout;
