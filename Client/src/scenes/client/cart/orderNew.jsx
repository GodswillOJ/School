import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, TextField, Typography } from '@mui/material';
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalPrice = data?.cart?.items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  const flutterwaveConfig = {
    public_key: process.env.FLUTTER_KEY, // Replace with your actual public key
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: 'USD', // Change this to your preferred currency
    payment_options: 'card, mobilemoney, ussd',
    customer: {
      email: data?.email, // User's email fetched from state
      phonenumber: formData.phone,
      name: data?.name,
    },
    customizations: {
      title: 'Your Shop Name',
      description: 'Payment for items in cart',
      logo: 'https://gotech_shop', // Add your shop logo
    },
  };

  const handleFlutterwavePayment = async (response) => {
    if (response.status === 'successful') {
      try {
        // Prepare order data to send to your backend
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
  
        const res = await axios.post(process.env.REACT_APP_BASE_URL, {
          userID,
          orderDetails,
          shippingAddress1: formData.shippingAddress1,
          shippingAddress2: formData.shippingAddress2,
          city: formData.city,
          zip: formData.zip,
          country: formData.country,
          phone: formData.phone,
          transactionId: response.transaction_id,  // Pass the transaction ID to the backend
        });
  
        console.log('Order placed successfully:', res.data);
        closePaymentModal(); // Close Flutterwave modal programmatically
        // Optionally, show success message or redirect to a success page
      } catch (error) {
        console.error('Error placing order:', error);
        // Optionally, show an error message to the user
      }
    } else {
      console.error('Payment failed:', response);
      // Optionally, show an error message to the user
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching user data.</Typography>;

  return (
    <Box margin={'2rem'}>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>Place Order</Typography>
      <form>
        <TextField
          label="Shipping Address 1"
          name="shippingAddress1"
          value={formData.shippingAddress1}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Shipping Address 2"
          name="shippingAddress2"
          value={formData.shippingAddress2}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        {/* Flutterwave Payment Button */}
        <FlutterWaveButton
          className="flutterwave-button"
          {...flutterwaveConfig}
          text="Place Order & Pay"
          callback={handleFlutterwavePayment}
          onClose={() => console.log('Payment modal closed')}
        />
      </form>
    </Box>
  );
};

export default OrderNew;
