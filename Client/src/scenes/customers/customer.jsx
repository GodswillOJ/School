import React from 'react'
import {
    Box,
    useTheme
} from "@mui/material";
import { useGetCustomersQuery } from 'state/api';
import Header from "Components/Header"
import { DataGrid } from "@mui/x-data-grid";


const Customer = () => {
  const theme = useTheme();
  const { data, isLoading }= useGetCustomersQuery();
  console.log("data", data)
  return (
    <div>
      <>Customer</>
    </div>
  )
}

export default Customer
