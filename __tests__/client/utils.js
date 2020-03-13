const {
  na,
  equals,
  equalsFalse,
  equalsZero,
  head,
  safeKey
} = require('../../appscript/update-firebase');

describe('Utils', () => {
  describe('equals', () => {
    it('should return true when passed the same value', () => {
      const result = equals(5)(5);
      expect(result).toBe(true);
    });
    it('should return false when passed two different values', () => {
      const result = equals(5)(10);
      expect(result).toBe(false);
    });
    it('should not coerce values into a falsy value', () => {
      const result = equals(0)(false);
      expect(result).toBe(false);
    });
    it('should not coerce values into a truthy value', () => {
      const result = equals(1)('Hello');
      expect(result).toBe(false);
    });
  });
  describe('equalsZero', () => {
    it('should return true when passed a zero', () => {
      const result = equalsZero(0);
      expect(result).toBe(true);
    });
    it('should return false when passed a value other than zero', () => {
      const result = equalsZero(10);
      expect(result).toBe(false);
    });
  });
  describe('equalsFalse', () => {
    it('should return true when passed a false', () => {
      const result = equalsFalse(false);
      expect(result).toBe(true);
    });
    it('should return false when passed a value other than false', () => {
      const result = equalsFalse(10);
      expect(result).toBe(false);
    });
  });
  describe('head', () => {
    it('should get the first element of a 1 dimensional array', () => {
      const oneD = [1, 2, 3, 4, 5];
      const result = head(oneD);
      expect(result).toBe(1);
    });
    it('should get the first array of a 2 dimensional array', () => {
      const twoD = [
        [1, 2, 3],
        [4, 5, 6]
      ];
      const result = head(twoD);
      expect(result).toEqual([1, 2, 3]);
    });
    it('should get the first letter of a string', () => {
      const str = 'Tom';
      const result = head(str);
      expect(result).toBe('T');
    });
  });
  describe('safeKey', () => {
    it('should return string argument if provided', () => {
      const result = safeKey('Name');
      expect(result).toBe('Name');
    });
    it('should return 0 if argument is 0', () => {
      const result = safeKey(0);
      expect(result).toBe(0);
    });
    it('should return false if argument is false', () => {
      const result = safeKey(false);
      expect(result).toBe(false);
    });
    it('should return "NA" if argument is undefined', () => {
      const result = safeKey(undefined);
      expect(result).toBe(na);
    });
    it('should return "NA" if argument is null', () => {
      const result = safeKey(null);
      expect(result).toBe(na);
    });
    it('should return "NA" if argument is ""', () => {
      const result = safeKey('');
      expect(result).toBe(na);
    });
    it('should return "NA" if argument is NaN', () => {
      const result = safeKey(NaN);
      expect(result).toBe(na);
    });
  });
});
