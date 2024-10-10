import React from 'react';
import { Card, Typography, Button } from '@mui/material';

const ReceiptThumbnail = ({ receipt, onDelete, onSelect, onImageClick, isSelected }) => {
  return (
    <div className="receipt-thumbnail">
      <img src={receipt.imageUrl} alt={receipt.name} onClick={() => onImageClick(receipt)} />
      <div className="receipt-info">
        <div className="receipt-name">{receipt.name}</div>
        <div className="receipt-date">{receipt.date}</div>
        <div className="receipt-price">₪{receipt.price}</div>
      </div>
      <div className="delete-icon" onClick={() => onDelete(receipt.id)}>🗑️</div>
      <input
        type="checkbox"
        className="receipt-checkbox"
        checked={isSelected}
        onChange={() => onSelect(receipt.id)}
      />
      <div className="tag-button">תג</div>
    </div>
  );
};

export default ReceiptThumbnail;