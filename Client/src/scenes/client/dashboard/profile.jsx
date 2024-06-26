import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from 'state/api';
import defaultProfile from 'assets/profile.jpg'; // Import the default profile image

const UserProfile = () => {
    const { userID } = useSelector((state) => state.global.user);
  
    const { data, error, isLoading } = useGetUserQuery(userID);
    const isSmallScreen = useMediaQuery('(max-width:760px)');
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      {/* Parent Box container */}
      <Box
        display="grid"
        gridTemplateColumns={isSmallScreen ? '1fr' : '1fr 1fr'}
        gap="2rem"
        padding="2rem"
        bgcolor="white"
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        maxWidth="800px"
        width="100%"
      >
        {/* First child container */}
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Image container */}
          <Box
            component="img"
            alt="profile"
            src={defaultProfile}
            height="150px"
            width="150px"
            borderRadius="50%"
            sx={{ objectFit: "cover", marginBottom: '1rem' }}
          />
          {/* About Me container */}
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>About Me</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </Box>

        {/* Second child container with grid display */}
        <Box display="grid" gridTemplateRows="1fr 1fr" gap="2rem">
          {/* First grid sub-container */}
          <Box textAlign="center">
            <Typography variant="h2">Hi</Typography>
            <Typography>Hi I am {data.username}.</Typography>
          </Box>
          {/* Second grid sub-container */}
          <Box display="grid" gridTemplateRows="1fr auto" gap="1rem">
            {/* Nested grid container */}
            <Box display="flex" flexDirection="column" alignItems="center">
              <span>Age: {data.age}</span>
              <span>Email: {data.email}</span>
              <span>Verified: {data.is_verified}</span>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button variant="contained">My Number</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
