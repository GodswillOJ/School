import React from 'react';
import { Box, useTheme } from '@mui/material';
import { ResponsiveChoropleth } from '@nivo/geo';
import { useGetGeographyQuery } from 'state/api'; // Adjust the path as per your file structure
import { countries } from 'state/geoData';

const Geography = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetGeographyQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching geography data:', error);
    return <div>Error fetching geography data: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    console.warn('No geography data found:', data);
    return <div>No geography data available.</div>;
  }

  // Ensure all entries have both id and value properties
  const filteredData = data.filter(entry => {
    if (entry.id && entry.value !== undefined) {
      return true;
    } else {
      console.warn('Invalid data entry:', entry);
      return false;
    }
  });

  if (filteredData.length === 0) {
    console.warn('No valid geography data found:', filteredData);
    return <div>No valid geography data available.</div>;
  }

  console.log('Geography data:', filteredData);

  return (
    <Box height={600} m='1.5rem 2 .5rem'>
      <h2>Geography</h2>
      <ResponsiveChoropleth
        data={filteredData}
        features={countries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
        colors="nivo"
        domain={[0, Math.max(...filteredData.map(item => item.value))]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={150}
        projectionTranslation={[0.45, 0.6]}
        projectionRotation={[0, 0, 0]}
        borderWidth={1.3}
        borderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -125,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: theme.palette.secondary[200],
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: theme.palette.background.alt,
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </Box>
  );
};

export default Geography;
