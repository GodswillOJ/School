import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetGeographyQuery } from 'state/api'; // Adjust the path as per your file structure

const Geography = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetGeographyQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching geography data: {error.message}</div>;
  }

  console.log('Geography data:', data);

  return (
    <div>
      <h2>Geography</h2>
      <Box>
        {/* Render your geography data here */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </div>
  );
};

export default Geography;
