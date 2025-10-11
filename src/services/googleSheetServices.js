const { google } = require('googleapis');
const path = require('path');

// Load service account credentials
const credentials = require(path.resolve(__dirname, '../../credentials.json'));

// The scopes your app needs
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Create GoogleAuth object
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

async function appendRow(sheetId, values) {
  try {
    const client = await auth.getClient(); // Authorized client
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',     // Make sure the sheet name is correct
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [values] },  // ✅ use requestBody instead of resource (newer syntax)
    });

    console.log('✅ Added to Google Sheets');
    return response.data;
  } catch (err) {
    console.error('❌ Google Sheets Error:', err.message);
  }
}

module.exports = { appendRow };
