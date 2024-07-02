import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useGetTransactionsQuery } from 'state/api';

const Transactions = () => {
  const { data, isLoading } = useGetTransactionsQuery();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (!isLoading && data) {
      setTransactions(data.transactions);
      setLoading(false);
    }
  }, [isLoading, data]);

  const handleViewMore = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <Box>
      <Typography variant="h6">Transactions</Typography>
      {selectedTransaction && (
        <Box>
          <Typography variant="h6">Transaction Details</Typography>
          <Typography>Product ID: {selectedTransaction.productId}</Typography>
          <Typography>Client Username: {selectedTransaction.clientUsername}</Typography>
          <Typography>Quantity: {selectedTransaction.quantity}</Typography>
          <Typography>Amount: {selectedTransaction.amount}</Typography>
          <Button onClick={() => setSelectedTransaction(null)} sx={{ color: '#b5382d' }}>Close</Button>
        </Box>
      )}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : transactions.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Client Username</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date Ordered</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction.productId}</TableCell>
                  <TableCell>{transaction.clientUsername}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{new Date(transaction.dateOrdered).toLocaleDateString()}</TableCell>
                  <TableCell><Button onClick={() => handleViewMore(transaction)} sx={{ color: '#2b67b5' }}>View More</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No transactions found.</Typography>
      )}
    </Box>
  );
};

export default Transactions;
