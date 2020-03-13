const { updateFirebase } = require('../../appscript/update-firebase');
const { event } = require('../../appscript/testing/appscript-mock');

describe('Update Firebase', () => {
  it('should execute without throwing an error', () => {
    try {
      expect(updateFirebase(event)).toEqual(undefined);
    } catch (error) {
      // this assertion will only be invoked if the catch block is executed.
      expect(error).toMatch(undefined);
    }
  });
});
