
import React from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import HomeNavbar from 'Components/HoneNavbar';

const HomeLayout = () => {
  const isNonMobile = useMediaQuery("(min-width: 760px)");

  return (
    <Box width="100%" height="100%">
      <Box>
        <HomeNavbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default HomeLayout;
