const Receipt = require('../models/receipt');

async function generateReport(userId, startDate, endDate) {
  console.log(`Generating report for user ${userId} from ${startDate} to ${endDate}`);

  const receipts = await Receipt.find({
    user: userId,
    date: { $gte: startDate, $lte: endDate }
  });

  console.log(`Found ${receipts.length} receipts`);

  let totalSpent = 0;
  const categorySums = {};
  const merchantFrequency = {};

  receipts.forEach(receipt => {
    totalSpent += receipt.amount;
    
    // Sum by category
    categorySums[receipt.category] = (categorySums[receipt.category] || 0) + receipt.amount;
    
    // Count merchant frequency
    merchantFrequency[receipt.merchant] = (merchantFrequency[receipt.merchant] || 0) + 1;
  });

  // Sort categories by total amount spent
  const topCategories = Object.entries(categorySums)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Sort merchants by frequency
  const topMerchants = Object.entries(merchantFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const report = {
    totalSpent,
    receiptCount: receipts.length,
    topCategories,
    topMerchants,
    averageSpendPerReceipt: receipts.length > 0 ? totalSpent / receipts.length : 0
  };

  console.log('Generated report:', report);

  return report;
}

module.exports = { generateReport };