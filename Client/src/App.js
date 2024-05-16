// import logo from './logo/svg';
import './App.css';
import './index.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import React, { useMemo } from 'react'
import Dashboard from "./scenes/dashboard/index"
import Home from "./scenes/home/index"
import { Register, Login, UserVerify } from "./scenes/home/userAuth"
import Layout from "./scenes/layout/index"
import HomeLayout from "./scenes/homeLayout/index"

function App() {
  // passing theme mode from theme folder to reset themes.
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      {/* wrapping the themes with the baseline */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route element={<HomeLayout/>}>
              <Route path="/" element={<Navigate to="/home" replace />}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/registerUser" element={<Register/>}/>
              <Route path="/loginUser" element={<Register/>}/>
              <Route path="/userVerifyMail/:id" element={<UserVerify/>}/>
              <Route path="/login" element={<Login/>}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;