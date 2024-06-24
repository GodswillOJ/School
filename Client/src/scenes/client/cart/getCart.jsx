import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearCart, removeFromCart } from 'state/cartFunctions/cartActions'; // Assuming these actions are defined in your state management

const GetCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items); // Assuming the cart is stored in state.cart.items

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.productId}>
            <ListItemText
              primary={item.name}
              secondary={`Price: $${item.price} - Quantity: ${item.quantity}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleRemove(item.productId)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {cart.length > 0 && (
        <Button variant="contained" color="secondary" onClick={handleClear}>
          Clear Cart
        </Button>
      )}
      {cart.length === 0 && (
        <Typography variant="subtitle1" gutterBottom>
          Your cart is empty.
        </Typography>
      )}
    </div>
  );
};

export default GetCart;
