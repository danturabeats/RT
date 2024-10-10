const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generateReport } = require('../services/reportService');

router.get('/summary', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const report = await generateReport(req.user._id, new Date(startDate), new Date(endDate));
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;