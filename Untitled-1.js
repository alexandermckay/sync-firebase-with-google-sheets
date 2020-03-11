// Delete
// const ScriptApp = {};
// const UrlFetchApp = {};
// Delete
// const databaseUrl = 'https://fir-sheets-sync.firebaseio.com/';
const getRows = (event) =>
  event.range
    .getSheet()
    .getDataRange()
    .getValues();
const emptyStr = '';
const na = 'NA';
const equals = (a) => (b) => a === b;
const equalsZero = equals(0);
const equalsEmpty = equals(emptyStr);
const head = (a) => a[0];
const safeKey = (a) => a || na;

const rowToObj = (headerRow, arr) =>
  arr.reduce((acc, cell, index) => {
    const key = safeKey(headerRow[index]);
    const value = safeKey(cell);
    return equalsZero(index) ? acc : { ...acc, [key]: value };
  }, {});

const combineRows = (rows, headerRow) =>
  rows.reduce((acc, row, index) => {
    const id = safeKey(head(row));
    return equalsZero(index) ? acc : { ...acc, [id]: rowToObj(headerRow, row) };
  }, {});

// function updateFirebase(changeEvent) {
function updateFirebase() {
  // const rows = getRows(changeEvent);
  const rows = [
    ['id', 'name', 'age'],
    ['am27', 'Alex', 27],
    ['am50', 'Andrew', 50],
    ['am51', undefined, 50]
  ];
  const headerRow = head(rows);
  return combineRows(rows, headerRow);
}

// const token = ScriptApp.getOAuthToken();
// const databaseRef = '/members';
// const dataFormat = '.json';
// const querySymbol = '?';
// const accessToken = `access_token=${encodeURIComponent(token)}`;
// const url =
//   databaseUrl + databaseRef + dataFormat + querySymbol + accessToken;

// const fetchOptions = {
//   method: 'put',
//   payload: JSON.stringify(jsData)
// };

// UrlFetchApp.fetch(url, fetchOptions);

console.log(updateFirebase());
