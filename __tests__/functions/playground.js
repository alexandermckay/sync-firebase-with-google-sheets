const exec = require('../../functions/playground');
const { fillList } = exec();

describe('playground', () => {
  it('fillList should fill list with values', () => {
    console.log(fillList);
  });
});
