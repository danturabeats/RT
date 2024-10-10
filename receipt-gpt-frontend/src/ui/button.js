import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ onClick, children, type = 'button', className = '', ...props }) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      type={type}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;