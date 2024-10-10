require('dotenv').config();
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/documents.readonly'];

async function authorize() {
  if (!process.env.GOOGLE_CLIENT_EMAIL) {
    throw new Error('GOOGLE_CLIENT_EMAIL is not set in the environment variables');
  }
  const auth = new GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`
    },
    scopes: SCOPES,
  });
  return auth.getClient();
}

async function uploadToDrive(auth, filePath) {
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: path.basename(filePath),
  };
  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream(filePath),
  };
  const file = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });
  return file.data.id;
}

async function convertToDocs(auth, fileId) {
  const drive = google.drive({ version: 'v3', auth });
  const body = {
    name: 'Converted Document',
    mimeType: 'application/vnd.google-apps.document'
  };
  const response = await drive.files.copy({
    fileId: fileId,
    requestBody: body
  });
  return response.data.id;
}

async function extractTextFromDocs(auth, docId) {
  const docs = google.docs({ version: 'v1', auth });
  const doc = await docs.documents.get({
    documentId: docId,
  });
  const content = doc.data.body.content;
  let text = '';
  content.forEach(elem => {
    if (elem.paragraph) {
      elem.paragraph.elements.forEach(paraElem => {
        if (paraElem.textRun) {
          text += paraElem.textRun.content;
        }
      });
    }
  });
  return text;
}

async function processReceipt(filePath) {
  try {
    const auth = await authorize();
    const fileId = await uploadToDrive(auth, filePath);
    const docId = await convertToDocs(auth, fileId);
    const text = await extractTextFromDocs(auth, docId);
    return text;
  } catch (err) {
    console.error('Error processing receipt:', err);
    throw err;
  }
}

module.exports = { processReceipt, authorize };