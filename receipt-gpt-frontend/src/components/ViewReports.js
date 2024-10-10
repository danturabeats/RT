import React from 'react';
import { Typography } from '@mui/material';

const ViewReports = ({ receipts }) => {
  const totalAmount = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);

  return (
    <div>
      <Typography variant="h6">Reports</Typography>
      <Typography>Total Receipts: {receipts.length}</Typography>
      <Typography>Total Amount: ${totalAmount.toFixed(2)}</Typography>
    </div>
  );
};

export default ViewReports;