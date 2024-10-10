const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-exp-0801" });

async function analyzeReceipt(receiptData, extractedText) {
  const prompt = `
    Based on the following receipt data:
    ${extractedText}

    Provide the following analysis:
    1. A brief summary of the purchase
    2. Any potential budget implications
    3. Suggestions for saving money in this category
    4. Any additional insights from the raw text

    Answer in a concise and informative manner.
    If you can't find specific information in the receipt, please say so.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { analyzeReceipt };