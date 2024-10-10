import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid } from '@mui/material';

const ReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!receipt) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{receipt.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={receipt.imageUrl} alt={receipt.name} style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Receipt Details</Typography>
            <Typography>Date: {new Date(receipt.date).toLocaleDateString()}</Typography>
            <Typography>Amount: ${receipt.amount.toFixed(2)}</Typography>
            {receipt.vendor && <Typography>Vendor: {receipt.vendor}</Typography>}
            {receipt.category && <Typography>Category: {receipt.category}</Typography>}
            {receipt.items && (
              <>
                <Typography variant="h6" style={{ marginTop: '1rem' }}>Items</Typography>
                {receipt.items.map((item, index) => (
                  <Typography key={index}>{item.name}: ${item.price.toFixed(2)}</Typography>
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReceiptModal;