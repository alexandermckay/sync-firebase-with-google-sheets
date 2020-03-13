const {
  getSheet,
  getRows,
  getSheetName
} = require('../../appscript/update-firebase');
const { event } = require('../../appscript/testing/appscript-mock');

describe('getSheet', () => {
  it('should return', () => {
    const result = getSheet(event);
    const keys = Object.keys(result);
    expect(keys.includes('getDataRange')).toBe(true);
    expect(keys.includes('getName')).toBe(true);
    expect(keys.includes('gibberish')).toBe(false);
  });
  describe('getRows', () => {
    it('should return an array of the correct length', () => {
      const result = getRows(event);
      expect(result.length).toBe(3);
    });
  });
  describe('getSheetName', () => {
    it('should return an the correct sheet name', () => {
      const result = getSheetName(event);
      expect(result).toBe('users');
    });
  });
});
