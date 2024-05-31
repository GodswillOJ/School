// src/App.js

import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import Dashboard from "./scenes/dashboard/index";
import AddProduct from "./scenes/dashboard/addProducts";
import Home from "./scenes/home/index";
import { Register, Login, UserVerify } from "./scenes/home/userAuth";
import Layout from "./scenes/layout/index";
import HomeLayout from "./scenes/homeLayout/index";
import PrivateRoute from './Components/ProtectRoutes/PrivateRoute';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registerUser" element={<Register />} />
              <Route path="/userVerifyMail/:id" element={<UserVerify />} />
            </Route>
            <Route element={<Layout />}>
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/add_product" 
                element={
                  <PrivateRoute>
                    <AddProduct />
                  </PrivateRoute>
                } 
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
