import React, { useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from 'Components/Navbar';
import ClientSidebar from "Components/ClientSidebar";
import { useGetUserQuery } from 'state/api';

const ClientLayout = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { userID } = useSelector((state) => state.global.user);
  const { data, error } = useGetUserQuery(userID);
  console.log('data', data, error);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100vh">
      <ClientSidebar 
        user={data || {}} // ensures no break in data fetch
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1} display="flex" flexDirection="column" height="100vh">
        <Navbar 
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1} overflow="auto" className="custom-scrollbar">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default ClientLayout;
