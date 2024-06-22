import React, { useState } from 'react';
import axios from 'axios';
import { Button, useTheme, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from 'state/api';

const AddToCartForm = ({ product }) => {
  const theme = useTheme();
  const { userID } = useSelector((state) => state.global.user);
  const { data, error, isLoading } = useGetUserQuery(userID);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', { userID: data._id, productId: product._id });
    
    const formData = { userID: data._id, productId: product._id };

    try {
      await axios.post('/api/user/addCart', formData);
      setMessage('Product added to cart successfully!');
      setIsError(false);
    } catch (error) {
      console.error('Error adding product to cart', error);
      setMessage('Failed to add product to cart.');
      setIsError(true);
    }
  };

  const handleCloseMessage = () => {
    setMessage(null);
  };

  return (
    <>
      {message && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'background.paper',
              padding: 4,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {message}
            </Typography>
            <Button variant="contained" onClick={handleCloseMessage}>
              OK
            </Button>
          </Box>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          size="small"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Add to Cart
        </Button>
      </form>
    </>
  );
};

export default AddToCartForm;
