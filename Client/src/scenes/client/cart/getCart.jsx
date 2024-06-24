import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearCart, removeFromCart } from 'state/cartFunctions/cartActions'; // Assuming these actions are defined in your state management
import { useGetUserQuery } from 'state/api';

const GetCart = () => {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.global.user);
  const { data, error, isLoading } = useGetUserQuery(userID);
  console.log(data);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClear = () => {
    dispatch(clearCart());
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
    <>
      <Typography variant="h6">Your Cart</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.productId}>
            <ListItemText primary={item.name} secondary={`Price: ${item.price}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item.productId)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total Price: {totalPrice}</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>Clear Cart</Button>
    </>
  );
};

export default GetCart;
