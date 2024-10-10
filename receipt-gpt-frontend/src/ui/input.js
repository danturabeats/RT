import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ label, value, onChange, type = 'text', ...props }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      variant="outlined"
      fullWidth
      margin="normal"
      {...props}
    />
  );
};

export default Input;