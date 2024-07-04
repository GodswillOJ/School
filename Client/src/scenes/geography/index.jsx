import React from 'react';
import { Box, useTheme } from '@mui/material';
import { ResponsiveChoropleth } from '@nivo/geo';
import { useGetGeographyQuery } from 'state/api'; // Adjust the path as per your file structure
import {countries} from 'state/geoData';

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

  console.log('Geography data:', data);

  return (
    <Box height={600}>
      <h2>Geography</h2>
      <ResponsiveChoropleth
        data={data}
        features={countries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[0, Math.max(...data.map(item => item.value))]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={150}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#444444',
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000000',
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
