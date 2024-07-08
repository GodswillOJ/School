import React from 'react';
import { useGetOverallStatsQuery, useAddOverallStatMutation } from 'state/api';
import { Box, Typography, Button, Grid } from '@mui/material';
import 'App.css';

const OverallStat = () => {
  const { data, error, isLoading } = useGetOverallStatsQuery();
  const [addOverallStat] = useAddOverallStatMutation();

  const handleAddStat = async () => {
    const newStat = {
      totalCustomers: 100,
      yearlySalesTotal: 15000,
      yearlyTotalSoldUnits: 800,
      year: new Date().getFullYear(),
      monthlyData: [
        { month: 'January', totalSales: 1000, totalUnits: 50 },
        // Add other months...
      ],
      dailyData: [
        { date: '2022-07-01', totalSales: 100, totalUnits: 5 },
        // Add other dates...
      ],
      salesByCategory: {
        Electronics: 5000,
        Clothing: 3000,
        // Add other categories...
      },
    };

    try {
      await addOverallStat(newStat).unwrap();
    } catch (error) {
      console.error('Failed to add stat:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box className="container">
      <Typography variant="h4" className="title">Overall Statistics</Typography>
      <Grid container spacing={2}>
        {data && data.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat._id}>
            <Box className="statBox">
              <Typography>Total Customers: {stat.totalCustomers}</Typography>
              <Typography>Yearly Sales Total: {stat.yearlySalesTotal}</Typography>
              <Typography>Yearly Total Sold Units: {stat.yearlyTotalSoldUnits}</Typography>
              <Typography>Year: {stat.year}</Typography>
              {/* Render other fields as needed */}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddStat} 
        className="button"
      >
        Add Stat
      </Button>
    </Box>
  );
};

export default OverallStat;
