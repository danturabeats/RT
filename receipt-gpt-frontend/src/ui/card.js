import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';

const Card = ({ title, content, onClick }) => {
  return (
    <MuiCard onClick={onClick} style={{ cursor: 'pointer', margin: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">
          {content}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;