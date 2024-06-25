import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton, Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetUserQuery } from 'state/api';
import axios from 'axios';

const GetCart = () => {
  const { userID } = useSelector((state) => state.global.user);
  const { data, error, isLoading, refetch } = useGetUserQuery(userID);
  console.log(data);

  const removeFromCart = async (productId) => {
    try {
      await axios.post('https://gotech-ecommerce.onrender.com/api/user/removeFromCart', { userID, productId });
      refetch();  // Refetch cart data after removing item
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.post('https://gotech-ecommerce.onrender.com/api/user/clearCart', { userID });
      refetch();  // Refetch cart data after clearing cart
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="subtitle1" color="error">Error loading cart.</Typography>;
  }

  const cartItems = data?.cart?.items || [];
  const totalPrice = data?.cart?.totalPrice || 0;

  return (
    <Box margin={'2rem'}>
      <Typography variant="h6">Your Cart</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.productId}>
            <ListItemText 
              primary={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item.name}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: {item.price}</span>
                </div>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.productId)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total Price: {totalPrice}</Typography>
      <Button variant="contained" color="secondary" onClick={clearCart}>Clear Cart</Button>
    </Box>
  );
};

export default GetCart;
