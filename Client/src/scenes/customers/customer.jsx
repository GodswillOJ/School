import React from 'react';
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from 'state/api';
import Header from "Components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customer = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  console.log("data", data);

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    // Add other necessary columns here based on your data structure
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />

      <Box 
        mt={2}
        height='75vh'
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none"
          },
          "& .MuiDataGrid-footerContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          }
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          rows={data || []}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default Customer;
