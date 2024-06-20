import React from 'react';
import axios from 'axios';
import { Button, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from 'state/api';

const AddToCartForm = ({ product }) => {
    const theme = useTheme();
    const { userID } = useSelector((state) => state.global.user);
    const { data, error, isLoading } = useGetUserQuery(userID);
    console.log(data)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('userId', data._id);
        formData.append('productId', product._id);
        formData.append('quantity', 1);

        try {
            await axios.post('https://gotech-ecommerce.onrender.com/api/user/addCart', formData);
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding product to cart', error);
            alert('Failed to add product to cart.');
        }
    };

    return (
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
    );
};

export default AddToCartForm;
