import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@mui/material';

const Select = ({ label, value, onChange, options, ...props }) => {
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} onChange={onChange} label={label} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;