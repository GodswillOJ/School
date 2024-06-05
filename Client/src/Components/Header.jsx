import { Typography, Box, useTheme } from "@mui/material";
import React from 'react';

const Header = ({ title, subtitle }) => {
const theme = useTheme();
return (
    <Box m="1.5rem 2.5rem">
        <Typography 
         variant="h2" 
         color={ theme.palette.secondary[100] } 
         fontWeight='bold'
         sx={{ mb:'5px'}}
         >
            {title}
        </Typography>

        <Typography 
         variant="p" 
         color={ theme.palette.secondary[300] } 
         fontWeight='bold'
         sx={{ mb:'5px'}}
         >
            {subtitle}
        </Typography>
    </Box>
)
}

export default Header