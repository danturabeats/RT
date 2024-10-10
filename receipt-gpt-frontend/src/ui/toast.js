import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toast = ({ open, message, severity, onClose }) => {
  if (!open) return null;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;