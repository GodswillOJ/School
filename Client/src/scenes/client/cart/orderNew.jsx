import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, TextField, Typography, Snackbar } from '@mui/material';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import { useGetUserQuery } from 'state/api';

const OrderNew = () => {
  const { userID } = useSelector((state) => state.global.user);
  const { data, error, isLoading } = useGetUserQuery(userID);
  
  const [formData, setFormData] = useState({
    shippingAddress1: '',
    shippingAddress2: '',
    city: '',
    zip: '',
    country: '',
    phone: '',
  });
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const flutterKey = process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY;
  console.log('Flutter Key:', flutterKey);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalPrice = data?.cart?.items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
console.log(totalPrice)
  const flutterwaveConfig = {
    public_key: flutterKey,
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: 'NGN',
    payment_options: 'card, mobilemoney, ussd',
    customer: {
      email: data?.email,
      phonenumber: formData.phone,
      name: data?.name,
    },
    customizations: {
      title: 'Fee Payment',
      description: 'Payment for items in cart',
      logo: 'https://gotech_shop', 
    },
  };

  const fwConfig = {
    ...flutterwaveConfig,
    text: 'Pay with Flutterwave!',
    callback: async (response) => {
      if (response.status !== "successful") {
        console.log("Failed transaction");
        setSnackbarMessage('Payment failed, please try again.');
      } else {
        await handleFlutterwavePayment(response);
      }
      closePaymentModal();
    },
    onClose: () => {
      console.log("Payment closed by user");
    },
  };

  const handleFlutterwavePayment = async (response) => {
    if (response.status === 'successful') {
      try {
        const items = data.cart.items.map(product => ({
          name: product.name,
          productId: product._id,
          quantity: product.quantity,
          price: product.price,
        }));

        const orderDetails = {
          totalPrice,
          items,
        };

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/order_new`, {
          userID,
          orderDetails,
          ...formData,
          transactionId: response.transaction_id,
        });

        console.log('Order placed successfully:', res.data);
        setSnackbarMessage('Order placed successfully!');
      } catch (error) {
        console.error('Error placing order:', error);
        setSnackbarMessage('Error placing order, please try again.');
      }
      setOpenSnackbar(true);
    } else {
      console.error('Payment failed:', response);
      setSnackbarMessage('Payment failed, please try again.');
      setOpenSnackbar(true);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching user data.</Typography>;

  return (
    <Box margin={'2rem'}>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>Place Order</Typography>
      <form>
        {['shippingAddress1', 'shippingAddress2', 'city', 'zip', 'country', 'phone'].map((field) => (
          <TextField
            key={field}
            label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} // Convert camelCase to human readable
            name={field}
            value={formData[field]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required={['shippingAddress1', 'city', 'zip', 'country', 'phone'].includes(field)} // Make some fields required
          />
        ))}
        <FlutterWaveButton {...fwConfig} />
      </form>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default OrderNew;
