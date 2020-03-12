const functions = require('firebase-functions');
const { google } = require('googleapis');

const { client_email, private_key } = require('../service-account.json');

const sheets = google.sheets('v4');
const spreadsheetId = '1grh0OKijgE-kahkzTDBfmHWYDDLaGJMi99R6A5VQL3E';

const jwtConfig = {
  email: client_email,
  key: private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
};
const jwtClient = new google.auth.JWT(jwtConfig);

const sheetConfig = (sheetName) => ({
  auth: jwtClient,
  spreadsheetId,
  range: sheetName
});

/*
[[...], [...], [...]]
rowId, cellId, value

*/

const firebaseToSheets = functions.database
  .ref('/sheets/{sheet}/{rowId}/{cellId}')
  .onUpdate(async (change, context) => {
    const update = change.after.val();
    const {
      params: { sheet, rowId, cellId }
    } = context;
    await jwtClient.authorize();
    const {
      data: { values }
    } = await sheets.spreadsheets.values.get(sheetConfig(sheet));

    const data = [
      ['Player', 'Score'],
      ['Alex', 0]
    ];

    await sheets.spreadsheets.values.update(
      {
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: 'Scores!A1:B7', // update this range of cells
        valueInputOption: 'RAW',
        requestBody: { values: data }
      },
      {}
    );
  });

module.exports = firebaseToSheets;
