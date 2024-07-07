import React, { useState } from 'react';
import { useGetOverallStatsQuery, useAddOverallStatMutation } from 'state/api';
import { Box, FormControl, MenuItem, InputLabel, Select, Link, CircularProgress, Typography } from '@mui/material';
import Header from 'Components/Header';
import OverviewChart from 'Components/overview_chart';
import 'App.css';

const Overview = () => {
  const [view, setView] = useState('units');
  const { data: overallStats, isLoading, error } = useGetOverallStatsQuery();
  const [addOverallStat] = useAddOverallStatMutation();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error fetching data</Typography>;
  }

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='OVERVIEW' subtitle='Overview of general revenue and profit' />
      <Box>
        <Link href="/overall_stats" sx={{color: 'blue'}}>
          View overall data
        </Link>
      </Box>
      <Box > 
        <FormControl sx={{ mt:'1rem' }}>
          <InputLabel>View</InputLabel>
          <Select value={view} label='View' onChange={(e) => setView(e.target.value)}>
            <MenuItem value='sales'>Sales</MenuItem>
            <MenuItem value='units'>Units</MenuItem>
          </Select>
        </FormControl>
        {overallStats && <OverviewChart view={view} data={overallStats} />}
      </Box>
    </Box>
  );
};

export default Overview;
