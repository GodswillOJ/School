import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useGetUserQuery } from 'state/api';

const OrderNew = () => {
    const { userID } = useSelector((state) => state.global.user);
    const { data, error, isLoading, refetch } = useGetUserQuery(userID);
    console.log(data);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data || !data.cart || !data.cart.items) {
            console.error('No cart data available');
            return;
        }

        const items = data.cart.items.map(product => ({
            name: product.name,
            productId: product._id,
            quantity: product.quantity,
            price: product.price,
        }));

        const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

        const orderDetails = {
            totalPrice,
            items,
        };

        console.log(totalPrice);

        try {
            const response = await axios.post('https://gotech-ecommerce.onrender.com/api/user/order_new', { userID, orderDetails, ...formData });
            console.log('Order placed:', response.data);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <Box margin={'2rem'}>
            <Typography variant="h6" sx={{ textAlign: 'center' }} >Place Order</Typography>
            <form onSubmit={handleSubmit}>
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
                    required
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
                <Box display={'flex'} justifyContent={'space-between'} marginTop={'1rem'}>
                    <Button variant="contained" color="primary" type="submit">Place Order</Button>
                </Box>
            </form>
        </Box>
    );
};

export default OrderNew;
