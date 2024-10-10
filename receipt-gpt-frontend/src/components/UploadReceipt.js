import React, { useState } from 'react';
import { Button, Input } from '../ui';

const UploadReceipt = ({ onUpload }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      files.forEach(file => {
        onUpload({
          id: Date.now(),
          name: file.name,
          date: new Date().toISOString(),
          amount: Math.floor(Math.random() * 1000),
          file: file, // Include the file object
        });
      });
      setFiles([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        multiple
      />
      <Button type="submit" disabled={files.length === 0}>
        Upload Receipt{files.length > 1 ? 's' : ''}
      </Button>
    </form>
  );
};

export default UploadReceipt;