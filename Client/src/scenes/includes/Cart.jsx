import React from 'react';
import axios from 'axios';
import { Button, useTheme } from '@mui/material';

const AddToCartForm = ({ product }) => {
    const theme = useTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append('product.quantity', 1); // Add default quantity to form data

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
            <input type="hidden" name="product.image" value={product.image} />
            <input type="hidden" name="product.title" value={product.title} />
            <input type="hidden" name="product.price" value={product.price} />
            <input type="hidden" name="product._id" value={product._id} />
            <input type="hidden" name="product.quantity" value={1} /> {/* Hidden quantity input */}
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
