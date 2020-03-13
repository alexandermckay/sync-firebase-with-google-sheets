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
const append = require('ramda/src/append');

const { client_email, private_key } = require('../service-account.json');

const sheets = google.sheets('v4');
const spreadsheetId = '1grh0OKijgE-kahkzTDBfmHWYDDLaGJMi99R6A5VQL3E';
const spreadsheetScope = 'https://www.googleapis.com/auth/spreadsheets';

const fillList = (value) => (arr) => arr.fill(value);
const fillListNull = fillList(null);
const matchRowId = (rowId) => compose(equals(rowId), head);
const getRowIndex = (rowId) => findIndex(matchRowId(rowId));
const getRow2d = (rowId) => filter(matchRowId(rowId));
const indexMap = addIndex(map);

const nullUnchangedCells = (equalsCellIndex) =>
  indexMap((cell, index) =>
    ifElse(equalsCellIndex, always(cell), always(null))(index)
  );

const nullUnchangedRows = (equalsRowIndex, equalsCellIndex) =>
  indexMap((row, index) =>
    ifElse(
      equalsRowIndex,
      always(nullUnchangedCells(equalsCellIndex)(row)),
      always(fillListNull(row))
    )(index)
  );

const findUpdateValue = (values, rowId, cellId, updatedValue) => {
  const headerRow = head(values);
  const rowIndex = getRowIndex(rowId)(values);
  const cellIndex = indexOf(cellId, headerRow);
  const equalsRowIndex = equals(rowIndex);
  const equalsCellIndex = equals(cellIndex);
  const row2d = getRow2d(rowId)(values);
  const row1d = head(row2d);
  // rowFound, therefore update
  if (row1d) {
    const updatedRow = update(cellIndex, updatedValue, row1d);
    const updatedRows = update(rowIndex, updatedRow, values);
    return nullUnchangedRows(equalsRowIndex, equalsCellIndex)(updatedRows);
  } else {
    // rowNotFound, therefore append
    const nullAll = map(fillListNull)(values);
    const newRow = update(0, rowId, head(nullAll));
    return append(newRow, nullAll);
  }
};

const auth = new google.auth.JWT({
  email: client_email,
  key: private_key,
  scopes: [spreadsheetScope]
});
const sheetConfig = (sheetName) => ({
  auth,
  spreadsheetId,
  range: sheetName
});

const updateSheet = async (change, context) => {
  const updatedValue = change.after.val();
  const {
    params: { sheet, rowId, cellId }
  } = context;
  await auth.authorize();
  const {
    data: { values }
  } = await sheets.spreadsheets.values.get(sheetConfig(sheet));
  const updatedData = findUpdateValue(values, rowId, cellId, updatedValue);
  if (updatedData) {
    const requestObj = Object.assign(sheetConfig(sheet), {
      valueInputOption: 'RAW',
      requestBody: { values: updatedData }
    });
    await sheets.spreadsheets.values.update(requestObj);
  }
};

const firebaseToSheets = functions.database
  .ref('/sheets/{sheet}/{rowId}/{cellId}')
  .onUpdate(updateSheet);

module.exports = {
  fillList,
  fillListNull,
  firebaseToSheets,
  getRow2d,
  matchRowId,
  getRowIndex,
  indexMap,
  nullUnchangedCells,
  nullUnchangedRows,
  findUpdateValue,
  sheetConfig
};
