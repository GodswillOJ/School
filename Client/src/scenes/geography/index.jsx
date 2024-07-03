import React from 'react'
import { Box, useTheme } from '@mui/material';
import { useGetGeographyQuery } from 'state/api';
import Header from 'Components/Header';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from 'state/geoData';

const Geography = () => {
    const theme = useTheme()
    const { data } = useGetGeographyQuery()
    console.log('geodata: ', data)
  return (
    <div>
      geography
    </div>
  )
}

export default Geography
