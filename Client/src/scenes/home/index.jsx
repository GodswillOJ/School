import React, { useState, useEffect } from 'react';
import { Link, Box, Typography, IconButton, InputBase, useTheme } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined, SettingsOutlined, ShoppingCart, Search, ShoppingCartOutlined, CreditCardOutlined, LocalShippingOutlined, BadgeOutlined, Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import FlexBetween from "Components/flexBetween";
import phone from 'assets/phone.jpg';
import fan from 'assets/fan.jpg';
import ac from 'assets/ac.jpg';
import solar from 'assets//solar_inverter.jpg';
import room from 'assets/room.jpg';
import lapp2 from 'assets/lapp2.jpg';
import axios from 'axios';
import { Card, CardMedia, CardContent, CardActions, Button, Rating } from '@mui/material';
import 'home.css';

const Home = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product

    // Shuffle array utility function
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        // Fetch products from backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://gotech-ecommerce.onrender.com/api/');
                const fetchedProducts = response.data;

                // List of images to assign randomly
                const images = [phone, fan, ac, solar, room, lapp2];

                // Shuffle images and assign to products
                const shuffledImages = shuffleArray(images.slice());
                const productsWithImages = fetchedProducts.map((product, index) => ({
                    ...product,
                    image: shuffledImages[index % shuffledImages.length] // Assign a random image
                }));

                setProducts(productsWithImages);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleImageError = (event, category) => {
        switch (category) {
            case 'Phones':
                event.target.src = phone;
                break;
            case 'Fans':
                event.target.src = fan;
                break;
            case 'ACs':
                event.target.src = ac;
                break;
            default:
                event.target.src = phone; // default fallback image
                break;
        }
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product); // Set the selected product
    };

    const handleCloseDetails = () => {
        setSelectedProduct(null); // Clear the selected product
    };

    return (
        <div className='User_home' id="home_a">
            <div className="hero_sec">
                <Box mb="1rem">
                    <IconButton onClick={toggleDropdown}>
                        <Typography variant="h4" fontWeight="bold">
                            Explore category
                        </Typography>
                    </IconButton>
                    {showDropdown && (
                        <div className={`cat_dropdown ${theme.palette.mode === 'light' ? 'lightModeOutlined' : 'darkModeOutlined'}`}>
                            <Link href="#">Accessories</Link>
                            <Link href="#">Phones</Link>
                            <Link href="#">Appliances</Link>
                            <Link href="#">Housing</Link>
                            <Link href="#">Home-services</Link>
                        </div>
                    )}
                </Box>
                <div className='Hero_section'>
                    <FlexBetween>
                        <FlexBetween sx={{ flexDirection: 'column', gap: '1rem', margin: '0 2rem', mp: '1rem' }}>
                            <Box
                                sx={{
                                    backgroundColor: 'background.alt',
                                    borderRadius: '9px',
                                    padding: '0.1rem 1.5rem',
                                    width: {
                                        xs: '100%', // 100% width on extra-small screens
                                        sm: '80%',  // 80% width on small screens
                                        md: '100%',  // 60% width on medium screens
                                        lg: '100%',  // 40% width on large screens
                                        xl: '150%'   // 30% width on extra-large screens
                                    }
                                }}
                                display="flex"
                                padding="5px"
                            >
                                <InputBase placeholder='Search....' sx={{ width: '100%' }} />
                                <IconButton>
                                    <Search />
                                </IconButton>
                            </Box>
                        </FlexBetween>
                    </FlexBetween>

                    <div className="courses_info swiper-container">
                        <div className="courses_all swiper-wrapper">
                            <Swiper
                                pagination={{ type: 'progressbar' }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <Box component="img" alt="backgroundImg" src={phone} width="100%" sx={{ objectFit: "cover" }} />
                                </SwiperSlide>

                                <SwiperSlide>
                                    <Box component="img" alt="backgroundImg" src={room} width="100%" sx={{ objectFit: "cover" }} />
                                </SwiperSlide>

                                <SwiperSlide>
                                    <Box component="img" alt="backgroundImg" src={lapp2} width="100%" sx={{ objectFit: "cover" }} />
                                </SwiperSlide>

                                <SwiperSlide>
                                    <Box component="img" alt="backgroundImg" src={phone} width="100%" sx={{ objectFit: "cover" }} />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

            <Box>
                <div className='cart_link'>
                    <Link sx={{ textDecoration: 'none', color: 'inherit' }}>
                        <h4>Shipping Terms</h4>
                    </Link>
                    <Link sx={{ textDecoration: 'none', color: 'inherit' }}>
                        <h4>Incoming Products</h4>
                    </Link>
                </div>
            </Box>

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
                {products.map(product => (
                    <Card key={product._id} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.image}
                            alt={product.title}
                            onError={(e) => handleImageError(e, product.category)}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.title}
                            </Typography>
                            <Rating value={product.rating} readOnly />
                            <Typography variant="body2" color="text.secondary">
                                ${product.price.toFixed(2)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link href="/user/addCart">
                                <Button 
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
                            </Link>
                            
                            <Button 
                                size="small" 
                                sx={{
                                    backgroundColor: theme.palette.secondary.main, 
                                    color: theme.palette.secondary.contrastText,
                                    '&:hover': {
                                        backgroundColor: theme.palette.secondary.dark,
                                    },
                                }}
                                onClick={() => handleViewDetails(product)} // Event handler for View Details
                            >
                                View Details
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            {/* New Box container for latest products and browse more products */}
            <Box mt={4}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Box textAlign="center" width="100%">
                        <Typography variant="h2">Latest Products</Typography>
                        <Typography variant="h4">Browse More Products</Typography>
                    </Box>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                    {products.slice(0, 4).map(product => (
                        <Card key={product._id} sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.title}
                                onError={(e) => handleImageError(e, product.category)}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Rating value={product.rating} readOnly />
                                <Typography variant="body2" color="text.secondary">
                                    ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href="/user/addCart">
                                    <Button 
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
                                </Link>
                                
                                <Button 
                                    size="small" 
                                    sx={{
                                        backgroundColor: theme.palette.secondary.main, 
                                        color: theme.palette.secondary.contrastText,
                                        '&:hover': {
                                            backgroundColor: theme.palette.secondary.dark,
                                        },
                                    }}
                                    onClick={() => handleViewDetails(product)} // Event handler for View Details
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* New Box container for "Why Choose Us" and "Why Us" */}
            <Box mt={4}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Box textAlign="center" width="100%">
                        <Typography paragraph>Why Choose Us</Typography>
                        <Typography variant="h2">Why Us</Typography>
                    </Box>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                    {[
                        { icon: <ShoppingCartOutlined />, text: 'We offer endless shopping experience.' },
                        { icon: <CreditCardOutlined />, text: 'We accept both online and offline payments.' },
                        { icon: <LocalShippingOutlined />, text: 'We offer the fastest delivery services.' },
                        { icon: <BadgeOutlined />, text: 'We keep to our policies, and agreements.' }
                    ].map((item, index) => (
                        <Box key={index} display="flex" flexDirection="column" alignItems="center">
                            <Box display="flex" alignItems="center" mb={1}>
                                {item.icon}
                            </Box>
                            <Typography>{item.text}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Footer Box container */}
            <Box 
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    py: 4, 
                    bgcolor: "background.paper",
                    mt:"1rem",
                    width: "100%"
                }}
            >
                <Box display="flex" justifyContent="center" gap={2}>
                    <IconButton href="https://facebook.com" target="_blank" sx={{ color: "primary.main" }}>
                        <Facebook />
                    </IconButton>
                    <IconButton href="https://twitter.com" target="_blank" sx={{ color: "primary.main" }}>
                        <Twitter />
                    </IconButton>
                    <IconButton href="https://instagram.com" target="_blank" sx={{ color: "primary.main" }}>
                        <Instagram />
                    </IconButton>
                    <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "primary.main" }}>
                        <LinkedIn />
                    </IconButton>
                </Box>
                <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        &copy; 2024, Developer Godswill Ogono
                    </Typography>
                </Box>
            </Box>

            {/* Product Details Box */}
            {selectedProduct && (
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
                        zIndex: 9999 
                    }}
                    onClick={handleCloseDetails} // Close the details box on clicking outside
                >
                    <Box 
                        sx={{ 
                            backgroundColor: 'background.paper', 
                            padding: 4, 
                            borderRadius: 2, 
                            display: 'flex', 
                            flexDirection: 'row',
                            gap: 4
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing the box when clicking inside
                    >
                        <Box>
                            <CardMedia
                                component="img"
                                height="300"
                                image={selectedProduct.image}
                                alt={selectedProduct.title}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    {selectedProduct.title}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {selectedProduct.description}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    ${selectedProduct.price.toFixed(2)}
                                </Typography>
                            </Box>
                            <Button 
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
                        </Box>
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default Home;
