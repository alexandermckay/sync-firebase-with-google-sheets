const { sheetValues } = require('../../appscript/testing/appscript-mock');
const { head, rowToObj } = require('../../appscript/update-firebase');

describe('rowToObj', () => {
  const headerRow = head(sheetValues);
  it('should convert array row and header row into an object', () => {
    const rowOne = sheetValues[1];
    const result = rowToObj(rowOne, headerRow);
    const expected = {
      name: 'Tom',
      sex: 'M',
      confirm: true,
      add: '123 Street',
      kids: 1
    };
    expect(result).toEqual(expected);
  });
  it('should convert second row and header row into an object', () => {
    const rowTwo = sheetValues[2];
    const result = rowToObj(rowTwo, headerRow);
    const expected = {
      0: 'NA',
      name: 'Kate',
      sex: 'F',
      confirm: false,
      add: '456 Place',
      kids: 0
    };
    expect(result).toEqual(expected);
  });
  it('should collapse all "NA" header row keys into one key/value pair', () => {
    const rowTwo = sheetValues[2];
    const result = rowToObj(rowTwo, headerRow);
    const resultKeys = Object.keys(result);
    expect(rowTwo.length).not.toBe(resultKeys.length);
    expect(rowTwo.length).toBe(10);
    expect(resultKeys.length).toBe(6);
  });
});
