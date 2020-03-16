/* eslint-disable quote-props */
const { sheetValues } = require('../../appscript/testing/appscript-mock');
const { head, combineRows } = require('../../appscript/update-firebase');

describe('combineRows', () => {
  it('should combine row objects into one object', () => {
    const headerRow = head(sheetValues);
    const rows = sheetValues;
    const result = combineRows(rows, headerRow);
    const expected = {
      '1': {
        name: 'Tom',
        sex: 'M',
        confirm: true,
        add: '123 Street',
        kids: 1
      },
      '2': {
        '0': 'NA',
        name: 'Kate',
        sex: 'F',
        confirm: false,
        add: '456 Place',
        kids: 0
      }
    };
    expect(result).toEqual(expected);
  });
});
