const token = 'aasqe1412';
const successCode = 200;
const sheetName = 'users';
const sheetValues = [
  // eslint-disable-next-line no-sparse-arrays
  ['id', 'name', 'sex', 'confirm', , 'add', 'kids', 0, 'missing', undefined],
  [1, 'Tom', 'M', true, '', '123 Street', 1, null, undefined, undefined],
  [2, 'Kate', 'F', false, undefined, '456 Place', 0, NaN, undefined, undefined]
];

const ScriptApp = {
  getOAuthToken: () => token
};

const HTTPResponse = {
  getResponseCode: () => successCode
};

const UrlFetchApp = {
  // eslint-disable-next-line no-unused-vars
  fetch: (url, fetchOptions) => HTTPResponse
};

const getName = () => sheetName;
const getValues = () => sheetValues;
const getDataRange = () => ({ getValues });
const getSheet = () => ({
  getDataRange,
  getName
});

const event = {
  range: { getSheet }
};

module.exports = {
  event,
  sheetValues,
  token,
  HTTPResponse,
  ScriptApp,
  UrlFetchApp
};
