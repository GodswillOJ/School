import React, { useState } from 'react';
import { useGetOverallStatsQuery, useAddOverallStatMutation } from 'state/api';
import { Box, FormControl, MenuItem, InputLabel, Select, Link } from '@mui/material';
import Header from 'Components/Header';
import OverviewChart from 'Components/overview_chart';
import 'App.css';

const Overview = () => {
  const { data, error, isLoading } = useGetOverallStatsQuery();
  const [view, setView] = useState('units');
  const [addOverallStat] = useAddOverallStatMutation();

 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box m='1.5rem 2.5rem'>
     <Header title='OVERVIEw' subtitle='Overview of general revenue and profit' />
      <Box>
        <Link href="/overall_stats" sx={{color: 'blue'}}>
          View overall data
        </Link>
      </Box>
      <Box height='75vh'>
        <FormControl sx={{ mt:'1rem' }}>
            <InputLabel>View</InputLabel>
            <Select value={view} label='View' onChange={(e) => setView(e.target.value)}>
                <MenuItem value='sales'>Sales</MenuItem>
                <MenuItem value='units'>Units</MenuItem>
            </Select>
        </FormControl>

        <Overview view={view}/>
      </Box>
    </Box>
  );
};

export default Overview;
