import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const OrderView = () => {
  const { userID } = useSelector((state) => state.global.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://gotech-ecommerce.onrender.com/api/user/view_order/${userID}`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userID]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box margin="2rem">
      <Typography variant="h6" sx={{ textAlign: 'center' }}>My Orders</Typography>
      {orders.length > 0 ? (
        orders.map(order => (
          <Box key={order._id} marginBottom="1rem">
            <Typography>Order ID: {order._id}</Typography>
            <Typography>Total Price: ${order.orderDetails.totalPrice}</Typography>
            <Typography>Items:</Typography>
            {order.orderDetails.items.map(item => (
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
