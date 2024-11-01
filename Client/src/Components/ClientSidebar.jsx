import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
    Link
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    Menu as MenuIcon,
    PointOfSaleOutlined
} from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './flexBetween';
import profile from '../assets/profile.jpg';

const navItems = [
    { text: "dashboard", icon: <HomeOutlined />, path: "user/clientDashboard" },
    { text: "Client Sidebar", icon: null },
    { text: "Cart", icon: <ShoppingCartOutlined />, path: "/user/cart" },
    { text: "Profile", icon: <Groups2Outlined />, path: "user/profile" },
    { text: "Accounts", icon: <ReceiptLongOutlined />, path: "/user/view_order/:userID" },
    { text: "Geography", icon: <PublicOutlined />, path: "/user/geography_c" },
    { text: "Sales", icon: null },
    { text: "Overview", icon: <PointOfSaleOutlined />, path: "#" },
    { text: "Daily", icon: <TodayOutlined />, path: "/user/daily" },
    { text: "Monthly", icon: <CalendarMonthOutlined />, path: "/user/monthly" },
    { text: "Breakdown", icon: <PieChartOutlined />, path: "/user/breakdown" },
    { text: "Management", icon: null },
    { text: "Admin", icon: <AdminPanelSettingsOutlined />, path: "/admin" },
    { text: "Performance", icon: <TrendingUpOutlined />, path: "/performance" },
];

const ClientSidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    const userImageUrl = `https://gotech-ecommerce.onrender.com/public/${user.image}`;

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        },
                    }}
                >
                    {/* Scrollable content */}
                    <Box width="100%" sx={{ overflowY: 'auto', flexGrow: 1 }}>
                        <Box m="1.5rem 0 2rem 0">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <FlexBetween color={theme.palette.secondary.main}>
                                        <Box display="flex" alignItems="center" ml="4rem">
                                            <Link href="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Typography variant="h4" fontWeight="bold">
                                                    GO_Tech
                                                </Typography>
                                            </Link>
                                        </Box>
                                        {!isNonMobile && (
                                            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                                <MenuIcon />
                                            </IconButton>
                                        )}
                                    </FlexBetween>
                                </Box>
                            </FlexBetween>
                            <List>
                                {navItems.map(({ text, icon, path }) => {
                                    if (!icon) {
                                        return (
                                            <Typography key={text} sx={{ m: "0.25rem 0 1rem 3rem" }}>
                                                {text}
                                            </Typography>
                                        );
                                    }

                                    const lcText = text.toLowerCase();

                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(path);
                                                    setActive(lcText);
                                                }}
                                                sx={{
                                                    backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                                    color: active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[100],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        ml: "2rem",
                                                        color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lcText && (
                                                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Box>
                    </Box>

                    {/* User image at the bottom */}
                    <Box width='222px' p="1rem" sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                        <FlexBetween textTransform="none" gap="1rem">
                            <Box
                                component="img"
                                alt="profile"
                                src={userImageUrl}
                                onError={(e) => { e.target.onerror = null; e.target.src = profile; }}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>
                                    {user.username}
                                </Typography>
                                <Typography fontSize="0.8rem" sx={{ color: theme.palette.secondary[300] }}>
                                    Username
                                </Typography>
                            </Box>
                            <SettingsOutlined sx={{ color: theme.palette.secondary[300] }} fontSize="25px" />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default ClientSidebar;
