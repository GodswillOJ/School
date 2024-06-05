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
    const isNonMobile = useMediaQuery('(min-width: 1000px)');
    console.log('product data', data);

    return (
        <Box m="1.5rem 2.5rem">
            <Header title='PRODUCTS' subtitle='See all product list.' />
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Box 
                    mt="20px" 
                    display="grid" 
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="3.33px"
                >
                    {data?.map((product) => (
                        <Card key={product.id}>
                            <CardContent>
                                <Typography>{product.name}</Typography>
                                <Typography>{product.details}</Typography>
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
