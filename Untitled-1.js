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

// const mapHeaderKeyToCellValue = (headerRow, rowObj) => (cell, cellIndex) => {
//   const isIdCol = equalsZero(cellIndex);
//   if (isIdCol) return;
//   if (equalsEmpty(cell)) {
//     cell = na;
//   }
//   let headerCol = headerRow[cellIndex];
//   if (equalsEmpty(headerCol)) {
//     headerCol = na;
//   }
//   rowObj[headerCol] = cell;
// };

// const rowToObj = (arr) => {
//   const id = head(arr)
//   return arr.reduce((acc, cell, index) => {
//     if (equalsZero(index)) {
//       return { ...acc, [id]: null };
//     } else {
//       return {...acc, [id]: {}}
//     }
//   }, {});
// };

const rowToObj = (id, headerRow, arr) =>
  arr.reduce((acc, cell, index) => {
    if (equalsZero(index)) {
      return acc;
    }
    return { ...acc, [headerRow[index]]: cell };
  }, {});

// function updateFirebase(changeEvent) {
function updateFirebase() {
  // const rows = getRows(changeEvent);
  const rows = [
    ['id', 'name', 'age'],
    ['am27', 'Alex', 27],
    ['am50', 'Andrew', 50]
  ];
  const headerRow = head(rows);
  // const jsData = {};

  // function createRowObject(row, rowIndex) {
  //   const rowObj = {};
  //   const isHeaderRow = equalsZero(rowIndex);
  //   if (isHeaderRow) return;

  // row.forEach(mapHeaderKeyToCellValue(headerRow, rowObj));

  // const idCol = head(row);
  // if (idCol === '') return;

  // jsData[idCol] = rowObj;
  // }

  // [row[0]]: { [headerRow[1]]: row[1], [headerRow[2]]: row[2] }

  return rows.reduce((acc, row, index) => {
    const id = head(row);
    if (equalsZero(index)) {
      return acc;
    }
    return { ...acc, [id]: rowToObj(id, headerRow, row) };
    // return {
    //   ...acc,
    //   rowToObj(headerRow, row)
    // }
  }, {});

  // return rows.map(createRowObject);

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
}

// module.exports = updateFirebase;

console.log(updateFirebase());
