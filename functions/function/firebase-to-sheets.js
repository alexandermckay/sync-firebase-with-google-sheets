const functions = require('firebase-functions');
const { google } = require('googleapis');
const compose = require('ramda/src/compose');
const equals = require('ramda/src/equals');
const head = require('ramda/src/head');
const filter = require('ramda/src/filter');
const update = require('ramda/src/update');
const indexOf = require('ramda/src/indexOf');
const findIndex = require('ramda/src/findIndex');
const map = require('ramda/src/map');
const addIndex = require('ramda/src/addIndex');
const ifElse = require('ramda/src/ifElse');
const always = require('ramda/src/always');

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

const firebaseToSheets = functions.database
  .ref('/sheets/{sheet}/{rowId}/{cellId}')
  .onUpdate(async (change, context) => {
    const updatedValue = change.after.val();
    const {
      params: { sheet, rowId, cellId }
    } = context;
    await jwtClient.authorize();
    const {
      data: { values }
    } = await sheets.spreadsheets.values.get(sheetConfig(sheet));
    const fillList = (value) => (arr) => arr.fill(value);
    const fillListNull = fillList(null);
    const headerRow = head(values);
    const equalsRowId = equals(rowId);
    const rowIndex = findIndex(compose(equalsRowId, head))(values);
    const cellIndex = indexOf(cellId, headerRow);
    const equalsRowIndex = equals(rowIndex);
    const equalsCellIndex = equals(cellIndex);
    const rowTwoDimension = filter(compose(equalsRowId, head))(values);
    const rowOneDimension = head(rowTwoDimension);
    const updateCell = update(cellIndex, updatedValue, rowOneDimension);
    const updateRow = update(rowIndex, updateCell, values);
    const mapWithIndex = addIndex(map);

    const nullUnchangedCells = mapWithIndex((row, index) =>
      ifElse(
        equalsRowIndex,
        always(
          mapWithIndex((cell, index) =>
            ifElse(equalsCellIndex, always(cell), always(null))(index)
          )(row)
        ),
        always(fillListNull(row))
      )(index)
    );

    await sheets.spreadsheets.values.update(
      // todo: convert to function
      {
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: sheet,
        valueInputOption: 'RAW',
        requestBody: { values: nullUnchangedCells(updateRow) }
      },
      {}
    );
  });

module.exports = firebaseToSheets;
