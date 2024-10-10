const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { processReceipt } = require('../services/googleOCRService');
const { analyzeReceipt } = require('../services/geminiService');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('receipt'), async (req, res) => {
  console.log('Upload route hit');
  console.log('Received file:', req.file);
  console.log('Received fields:', req.body);
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    let response = {
      message: 'Receipt uploaded successfully',
      file: req.file,
      userId: userId
    };

    try {
      console.log('Starting OCR processing...');
      const extractedText = await processReceipt(req.file.path);
      console.log('OCR processing complete. Extracted text:', extractedText);
      response.extractedText = extractedText;

      console.log('Starting Gemini analysis...');
      const analysis = await analyzeReceipt(req.body, extractedText);
      console.log('Gemini analysis complete. Result:', analysis);
      response.analysis = analysis;
    } catch (error) {
      console.error('Error during processing:', error);
      response.processingError = error.message;
    }
    // Save receipt data to the database
    const newReceipt = new Receipt({
      userId: userId,
      imagePath: req.file.path,
      extractedText: extractedText,
      analysis: analysis
    });

    try {
      await newReceipt.save();
      console.log('Receipt saved to database');
      response.receiptId = newReceipt._id;
    } catch (dbError) {
      console.error('Error saving receipt to database:', dbError);
      response.dbError = 'Failed to save receipt to database';
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Receipt upload error:', error);
    res.status(500).json({ error: 'An unexpected error occurred', details: error.message });
  }
});

module.exports = router;