import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useGetOrderViewQuery } from 'state/api';
import 'App.css';

const OrderView = () => {
  const { userID } = useSelector((state) => state.global.user);
  const { data, isLoading } = useGetOrderViewQuery(userID);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isLoading && data) {
      setOrders(data.orders);
      setLoading(false);
    }
  }, [isLoading, data]);

  const handleSeeMore = (order) => {
    setSelectedOrder(order);
  };

  return (
    <Box className="order-view">
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
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date of Order</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.dateOrdered).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td><Button onClick={() => handleSeeMore(order)} sx={{color:'#2b67b5'}}>See More</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography>No orders found.</Typography>
      )}
    </Box>
  );
};

export default OrderView;
