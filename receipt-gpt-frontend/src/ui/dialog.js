import React from 'react';
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Dialog = ({ isOpen, onClose, title, children, actions }) => {
  return (
    <MuiDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions}
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;