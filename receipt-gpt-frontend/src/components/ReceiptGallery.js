import React, { useState, useRef } from 'react';
import ChatBot from './ChatBot';
import SearchBox from './SearchBox';
import './ReceiptGallery.css';

const ReceiptGallery = () => {
  const [receipts, setReceipts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileInput = (files) => {
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newReceipt = {
          id: Date.now(),
          name: file.name,
          date: new Date().toLocaleDateString('he-IL'),
          price: (Math.random() * 1000).toFixed(2),
          imageUrl: e.target.result,
        };
        setReceipts(prevReceipts => [...prevReceipts, newReceipt]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (event) => {
    handleFileInput(event.target.files);
  };

  const handleCameraInputChange = (event) => {
    handleFileInput(event.target.files);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredReceipts = receipts.filter(receipt =>
    receipt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.price.toString().includes(searchTerm)
  );

  return (
    <div className="container">
      <header>
        <h1>Receipts GPT</h1>
        <p className="tagline">צפה ונהל את כל הקבלות שלך במקום אחד</p>
      </header>

      <div className="upload-btn-container">
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <label htmlFor="fileInput" className="upload-btn">העלה קבלות</label>
        <input
          type="file"
          id="cameraInput"
          style={{ display: 'none' }}
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={handleCameraInputChange}
        />
        <label htmlFor="cameraInput" className="camera-btn">צלם קבלה</label>
      </div>

      <SearchBox onSearch={handleSearch} />

      <div className="receipt-gallery-container">
        <div className="receipt-gallery">
          {filteredReceipts.map((receipt) => (
            <div className="receipt-thumbnail" key={receipt.id}>
              <img src={receipt.imageUrl} alt={receipt.name} />
              <div className="receipt-info">
                <div className="receipt-name">{receipt.name}</div>
                <div className="receipt-date">{receipt.date}</div>
                <div className="receipt-price">₪{receipt.price}</div>
              </div>
              <div className="delete-icon">🗑️</div>
              <input type="checkbox" className="receipt-checkbox" />
              <div className="tag-button">תג</div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-interface">
        <ChatBot />
      </div>
    </div>
  );
};

export default ReceiptGallery;