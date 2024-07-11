import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "Components/flexBetween";
import Header from "Components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetDashboardQuery, useGetOrderViewQuery } from "state/api";
import ClientBreakdown from "../orderCharts/distribution/index";
import OverviewChart from "Components/overview_chart";
import StatBox from "Components/StatBox";
import 'App.css';

const ClientDashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isBelow760px = useMediaQuery("(max-width: 760px)");
  const { data } = useGetDashboardQuery();
  const { userID } = useSelector((state) => state.global.user);
  const { data: ordersData, isLoading } = useGetOrderViewQuery(userID);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isLoading && ordersData) {
      setOrders(ordersData.orders);
      setLoading(false);
    }
  }, [isLoading, ordersData]);

  const handleSeeMore = (order) => {
    setSelectedOrder(order);
  };

  return (
    <Box
      sx={{
        margin: isBelow760px ? '1rem' : '1.5rem 2.5rem',
      }}
    >
      <FlexBetween
        sx={{
          display: isBelow760px ? 'block' : 'flex',
        }}
      >
        <Box sx={{ width:'100%', margin:'1rem' }}>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>

        <Box sx={{ textAlign: isBelow760px ? 'center' : 'right', marginTop: isBelow760px ? '1rem' : '0' }}>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
            minWidth: isSmallScreen ? "100%" : "unset",
          },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total likes"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Orders Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="orders" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Orders"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Orders"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 7"
          gridRow="span 3"
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
            p: "1rem",
            overflowX: 'auto'
          }}
        >
          <Typography variant="h6">My Orders</Typography>
          {selectedOrder && (
            <Box className="order-details">
              <Typography variant="h6">Order Details</Typography>
              <Typography>Order ID: {selectedOrder._id}</Typography>
              <Typography>Total Price: {selectedOrder.orderDetails.totalPrice}</Typography>
              <Typography>Shipping Address 1: {selectedOrder.shippingAddress1}</Typography>
              <Typography>Shipping Address 2: {selectedOrder.shippingAddress2}</Typography>
              <Typography>City: {selectedOrder.city}</Typography>
              <Typography>ZIP Code: {selectedOrder.zip}</Typography>
              <Typography>Country: {selectedOrder.country}</Typography>
              <Typography>Phone: {selectedOrder.phone}</Typography>
              <Typography>Name: {selectedOrder.orderDetails.name}</Typography>
              <Button onClick={() => setSelectedOrder(null)} sx={{color:'#b5382d'}}>Close</Button>
            </Box>
          )}
          {loading ? (
            <Typography>Loading...</Typography>
          ) : orders.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Order ID</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Date of Order</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Status</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{order._id}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{new Date(order.dateOrdered).toLocaleDateString()}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{order.status}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                      <Button onClick={() => handleSeeMore(order)} sx={{color:'#2b67b5'}}>See More</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography>No orders found.</Typography>
          )}
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="0.2rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Order By Category
          </Typography>
          <ClientBreakdown isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of user activities
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientDashboard;
