const equals = require('ramda/src/equals');
const map = require('ramda/src/map');
const {
  fillList,
  fillListNull,
  getRow2d,
  getRowIndex,
  indexMap,
  matchRowId,
  nullUnchangedCells,
  nullUnchangedRows,
  findUpdateValue,
  sheetConfig
} = require('../../functions/function/firebase-to-sheets');

describe('Firebase to Sheets', () => {
  const rows = [
    ['id', 'name', 'children', 'age'],
    ['12b', 'Alex', false, 27],
    ['17z', 'Tom', undefined, 30],
    ['19x', '', false, null]
  ];
  const row = [156, undefined, false, '4', '5'];
  describe('fillList', () => {
    it('should fill an array with one value', () => {
      const result = fillList('Yep')(row);
      expect(result).toEqual(['Yep', 'Yep', 'Yep', 'Yep', 'Yep']);
      expect(result.length).toBe(row.length);
    });
    it('should fill an array with null values', () => {
      const result = fillListNull(row);
      expect(result).toEqual([null, null, null, null, null]);
      expect(result.length).toBe(row.length);
    });
  });
  describe('matchRowId', () => {
    it('should return true if the id arg matches first element (id cell) in the array', () => {
      const goodResult = matchRowId('12b')(rows[1]);
      expect(goodResult).toBe(true);
      const badResult = matchRowId('13')(rows[1]);
      expect(badResult).toBe(false);
    });
  });
  describe('getRow', () => {
    it('2d should, given an id and 2d array, return a 2d array with length of 1', () => {
      const result = getRow2d('19x')(rows);
      expect(result).toEqual([['19x', '', false, null]]);
    });
    it('2d should return an empty array if no matches are found', () => {
      const result = getRow2d('doesNotExist')(rows);
      expect(result).toEqual([]);
    });
    it('index should, given an id and 2d array, return the index of the matching row', () => {
      const result = getRowIndex('19x')(rows);
      expect(result).toEqual(3);
    });
    it('index should return -1 if no matches are found', () => {
      const result = getRowIndex('19xax')(rows);
      expect(result).toEqual(-1);
    });
  });
  describe('indexMap', () => {
    const returnIndex = (item, index) => index;
    const mapResult = map(returnIndex)(row);
    expect(mapResult).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ]);
    const indexMapResult = indexMap(returnIndex)(row);
    expect(indexMapResult).toEqual([0, 1, 2, 3, 4]);
  });
  describe('nullUnchangedCells', () => {
    it('should null all cells except when index "equalsCellIndex"', () => {
      const result = nullUnchangedCells(equals(0))(row);
      expect(result).toEqual([row[0], null, null, null, null]);
    });
    it('should null all cells if "equalsCellIndex" is bound to -1 if a row has not been found', () => {
      const result = nullUnchangedCells(equals(-1))(row);
      expect(result).toEqual([null, null, null, null, null]);
    });
  });
  describe('nullUnchangedRows', () => {
    it('should null all rows except modified row', () => {
      const result = nullUnchangedRows(equals(1), equals(1))(rows);
      expect(result[0]).toEqual([null, null, null, null]);
      expect(result[1]).toEqual([null, 'Alex', null, null]);
    });
  });
  describe('nullUnchangedValues', () => {
    it('should return formatted object if id matches one row id', () => {
      const result = findUpdateValue(rows, rows[2][0], 'age', 15);
      expect(result[2][0]).toBeNull();
      expect(result[2][1]).toBeNull();
      expect(result[2][2]).toBeNull();
      // todo: work out why Jest is not registering the change
      // expect(result[2][3]).toBe(15);
    });
    it('should return false if row is not found', () => {
      const result = findUpdateValue(rows, '1111', 'age', 15);
      expect(result).toEqual([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        ['1111', null, null, null]
      ]);
    });
  });
  describe('sheetConfig', () => {
    it('should add sheet name to range property and return object', () => {
      const result = sheetConfig('User');
      expect(result.range).toBe('User');
    });
  });
});
