import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { useGetTransactionsQuery } from 'state/api';

const Transactions = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState('dateOrdered');
  const [sortOrder, setSortOrder] = useState('desc');
  const { data, isLoading } = useGetTransactionsQuery({ page: page + 1, limit: rowsPerPage, sortField, sortOrder });
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
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
                <TableCell onClick={() => handleSort('productId')}>Product ID</TableCell>
                <TableCell onClick={() => handleSort('clientUsername')}>Client Username</TableCell>
                <TableCell onClick={() => handleSort('quantity')}>Quantity</TableCell>
                <TableCell onClick={() => handleSort('amount')}>Amount</TableCell>
                <TableCell onClick={() => handleSort('dateOrdered')}>Date Ordered</TableCell>
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
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <Typography>No transactions found.</Typography>
      )}
    </Box>
  );
};

export default Transactions;
