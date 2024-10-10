require('dotenv').config();
const { authorize } = require('../services/googleOCRService');

async function testAuthorize() {
  try {
    const auth = await authorize();
    console.log('Authorization successful:', auth);
  } catch (error) {
    console.error('Authorization failed:', error);
  }
}

testAuthorize();