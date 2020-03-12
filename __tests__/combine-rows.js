/* eslint-disable quote-props */
const { sheetValues } = require('../client/appscript-dependencies');
const { head, combineRows } = require('../client/update-firebase');

describe('combineRows', () => {
  it('should combine row objects into one object', () => {
    const headerRow = head(sheetValues);
    const rows = sheetValues;
    const result = combineRows(rows, headerRow);
    const expected = {
      '1': {
        '0': 'NA',
        name: 'Tom',
        sex: 'M',
        confirm: true,
        NA: 'NA',
        add: '123 Street',
        kids: 1,
        missing: 'NA'
      },
      '2': {
        '0': 'NA',
        name: 'Kate',
        sex: 'F',
        confirm: false,
        NA: 'NA',
        add: '456 Place',
        kids: 0,
        missing: 'NA'
      }
    };
    expect(result).toEqual(expected);
  });
});
