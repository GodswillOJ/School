// src/App.js

import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import ClientDashboard from "./scenes/client/dashboard/index";
import Dashboard from "./scenes/dashboard/index";
import AddProduct from "./scenes/dashboard/addProducts";
import Products from "./scenes/dashboard/addProductStat";
import AddToCartForm from "./scenes/includes/Cart";
import GetCart from "./scenes/client/cart/getCart";
import OrderNew from "./scenes/client/cart/orderNew";
import OrderView from "./scenes/client/orders/orderView";
import UserProfile from "./scenes/client/dashboard/profile";
import Home from "./scenes/home/index";
import Transactions from "./scenes/transactions/index";
import Geography from "./scenes/geography/index";
import AdminHome from "./scenes/home/admin_home";
import VerifyMail from "./scenes/home/verifyMail";
import { Register, Login, UserVerify } from "./scenes/home/userAuth";
import { RegisterClient, LoginClient, VerifyClient } from "./scenes/client/home/clientLogin";
import Layout from "./scenes/layout/index"; // for admin
import ClientLayout from "./scenes/client/layout/index"; // for clients navbar and setups
import HomeLayout from "./scenes/homeLayout/index";
import Customers from "./scenes/customers/customer";
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
            
            {/* Home_Layouts */}
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginUser" element={<LoginClient />} />
              <Route path="/registerClient" element={<RegisterClient />} />
              <Route path="/register" element={<Register />} />
              <Route path="/userVerifyMail/:id" element={<UserVerify />} />
              <Route path="/user/addCart" element={
                <PrivateRoute>
                  <AddToCartForm />
                </PrivateRoute>
              } />
              <Route path="/clientVerifyMail/:id" element={<VerifyClient />} />
            </Route>

              {/* Admin Layouts */}
            <Route element={<Layout />}>
              <Route path="user/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/add_product" element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              } />
              <Route path="/user/products" element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              } />
              <Route path="/user/customers" element={
                <PrivateRoute>
                  <Customers />
                </PrivateRoute>
              } />
              <Route path="/user/view_transactions" element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              } />
              <Route path="/user/geography" element={
                <PrivateRoute>
                  <Geography />
                </PrivateRoute>
              } />
            </Route>

              {/* Client Layouts */}
            <Route element={<ClientLayout />}>
              <Route path="user/clientDashboard" element={
                <PrivateRoute>
                  <ClientDashboard />
                </PrivateRoute>
              } />
              <Route path="/" element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              } />
              <Route path="/user/cart" element={
                <PrivateRoute>
                  <GetCart />
                </PrivateRoute>
              } />

              <Route path="/user/profile" element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              } />

              <Route path="/user/order_new" element={
                <PrivateRoute>
                  <OrderNew />
                </PrivateRoute>
              } />

              <Route path="/user/view_order/:userID" element={
                <PrivateRoute>
                  <OrderView />
                </PrivateRoute>
              } />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
