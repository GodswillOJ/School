import React, { useState } from 'react';
import { Link, Box, Typography, IconButton, InputBase, useTheme } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined, SettingsOutlined, ShoppingCart } from '@mui/icons-material'; // Import ShoppingCart icon
import { Swiper, SwiperSlide } from 'swiper/react';
import 'home.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import FlexBetween from "Components/flexBetween";
import { Search } from '@mui/icons-material';
import phone from 'assets/phone.jpg';
import room from 'assets/room.jpg';
import lapp2 from 'assets/lapp2.jpg';

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
                        <FlexBetween sx={{ flexDirection: 'column', gap: '1rem', margin: '0 2rem', mp:'1rem', }}>
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
                        <h4>incoming Products</h4>
                    </Link>
                </div>
            </Box>

            <div>
                
            </div>
        </div>
    );
};

export default Home;
