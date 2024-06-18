import React, { useState, useEffect } from 'react';
import { Link, Box, Typography, IconButton, InputBase, useTheme } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined, SettingsOutlined, ShoppingCart, Search } from '@mui/icons-material';
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

    return (
        <div className='User_home' id="home_a">
            <div className="hero_sec">
                <Box>
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
                            <Box sx={{ backgroundColor: 'background.alt', borderRadius: '9px', padding: '0.1rem 1.5rem' }}>
                                <InputBase placeholder='Search....' />
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
                            <Button size="small">Add to Cart</Button>
                            <Button size="small">View Details</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            {/* New Box container for latest products and browse more products */}
            <Box mt={4}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Box textAlign="center">
                        <Typography variant="h4">Browse More Products</Typography>
                        <Typography variant="h2">Latest Products</Typography>
                    </Box>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
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
                                <Button size="small">Add to Cart</Button>
                                <Button size="small">View Details</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default Home;
