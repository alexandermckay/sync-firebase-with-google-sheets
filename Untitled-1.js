// Constants
const databaseUrl = 'https://fir-sheets-sync.firebaseio.com/';
const na = 'NA';

// Utils
const equals = (a) => (b) => a === b;
const equalsZero = equals(0);
const head = (a) => a[0];
const safeKey = (a) => a || na;

// Get Spreadsheet Data
const getRows = (event) =>
  event.range
    .getSheet()
    .getDataRange()
    .getValues();

// Format Each Row
const rowToObj = (headerRow, arr) =>
  arr.reduce((acc, cell, index) => {
    const key = safeKey(headerRow[index]);
    const value = safeKey(cell);
    return equalsZero(index) ? acc : Object.assign(acc, { [key]: value });
  }, {});

// Combine All Rows
const combineRows = (rows, headerRow) =>
  rows.reduce((acc, row, index) => {
    const id = safeKey(head(row));
    return equalsZero(index)
      ? acc
      : Object.assign(acc, { [id]: rowToObj(headerRow, row) });
  }, {});

// Format Url
const formatUrl = (token) => {
  const databaseRef = '/';
  const dataFormat = '.json';
  const querySymbol = '?';
  const accessToken = `access_token=${encodeURIComponent(token)}`;
  return databaseUrl + databaseRef + dataFormat + querySymbol + accessToken;
};

function updateFirebase(changeEvent) {
  const rows = getRows(changeEvent);
  const headerRow = head(rows);
  const url = formatUrl(ScriptApp.getOAuthToken());
  const data = combineRows(rows, headerRow);
  const fetchOptions = {
    method: 'put',
    payload: JSON.stringify(data)
  };

  UrlFetchApp.fetch(url, fetchOptions);
}
