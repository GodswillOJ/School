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
import room from 'assets/room.jpg';
import lapp2 from 'assets/lapp2.jpg';
import axios from 'axios';
import { Card, CardMedia, CardContent, CardActions, Button, Rating } from '@mui/material';
import 'home.css';

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://gotech-ecommerce.onrender.com/api/', { image, title, price, rating }); // Replace with your actual endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
      {products.map(product => (
        <Card key={product._id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.title}
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
  );
};

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const theme = useTheme();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
                pagination={{
                  type: 'progressbar',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Box
                    component="img"
                    alt="backgroundImg"
                    src={phone}
                    width="100%"
                    sx={{ objectFit: "cover" }}
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <Box
                    component="img"
                    alt="backgroundImg"
                    src={room}
                    width="100%"
                    sx={{ objectFit: "cover" }}
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <Box
                    component="img"
                    alt="backgroundImg"
                    src={lapp2}
                    width="100%"
                    sx={{ objectFit: "cover" }}
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <Box
                    component="img"
                    alt="backgroundImg"
                    src={phone}
                    width="100%"
                    sx={{ objectFit: "cover" }}
                  />
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

      <ProductShowcase />
    </div>
  );
};

export default Home;
