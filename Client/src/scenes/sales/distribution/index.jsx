import React from "react";
import { Box } from "@mui/material";
import Header from "Components/Header";
import BreakdownChart from "Components/BreakdownChart";

const Breakdown = () => {
  return (
    <Box m="1.5rem 1rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;