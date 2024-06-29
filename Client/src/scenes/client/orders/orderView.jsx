import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useGetOrderViewQuery } from 'state/api';

const OrderView = () => {
  const { userID } = useSelector((state) => state.global.user);
  const { data, isLoading } = useGetOrderViewQuery(userID);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(orders)

  useEffect(() => {
    if (!isLoading && data) {
      setOrders(data.orders);
      setLoading(false);
    }
  }, [isLoading, data]);

  return (
    <Box margin="2rem">
      <Typography variant="h6" sx={{ textAlign: 'center' }}>My Orders</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : orders.length > 0 ? (
        orders.map(order => (
          <Box key={order._id} marginBottom="1rem">
            <Typography>Order ID: {order._id}</Typography>
            {order.orderDetails.totalPrice && (
              <Typography>Total Price: ${order.orderDetails.totalPrice}</Typography>
            )}
            <Typography>Shipping Address 1: {order.orderDetails.shippingAddress1}</Typography>
            <Typography>Shipping Address 2: {order.orderDetails.shippingAddress2}</Typography>
            <Typography>City: {order.orderDetails.city}</Typography>
            <Typography>ZIP Code: {order.orderDetails.zip}</Typography>
            <Typography>Country: {order.orderDetails.country}</Typography>
            <Typography>Phone: {order.orderDetails.phone}</Typography>
            {order.orderDetails.items && order.orderDetails.items.length > 0 && (
              <Typography>Items:</Typography>
            )}
            {order.orderDetails.items && order.orderDetails.items.map(item => (
              <Box key={item.productId} paddingLeft="1rem">
                <Typography>{item.name} - Quantity: {item.quantity} - Price: ${item.price}</Typography>
              </Box>
            ))}
          </Box>
        ))
      ) : (
        <Typography>No orders found.</Typography>
      )}
    </Box>
  );
};

export default OrderView;
