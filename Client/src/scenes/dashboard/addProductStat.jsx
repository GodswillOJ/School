import React, { useState } from 'react';
import { 
    Box, 
    Card, 
    CardActions, 
    CardContent, 
    Collapse, 
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery
} from '@mui/material';
import Header from 'Components/Header';
import { useGetProductsQuery } from 'state/api';

const Products = () => {
    const { data, isLoading } = useGetProductsQuery();
    console.log('product data', data);

    return (
        <Box>
            <Header title='PRODUCTS' subtitle='See all product list.' />
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Box>
                    {data?.map((product) => (
                        <Card key={product.id}>
                            <CardContent>
                                <Typography>{product.name}</Typography>
                                <Typography>{product.description}</Typography>
                                <Rating value={product.rating} readOnly />
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Products;
