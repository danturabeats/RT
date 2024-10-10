import React from 'react';
import ReceiptGallery from './components/ReceiptGallery';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <ReceiptGallery />
      </Container>
    </>
  );
}

export default App;