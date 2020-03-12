const { formatUrl } = require('../../client/update-firebase');
const { ScriptApp, token } = require('../../client/appscript-dependencies');

describe('formatUrl', () => {
  it('should generate a Url', () => {
    const sheetName = 'Users';
    const oAuthToken = ScriptApp.getOAuthToken();
    const dbUrl = 'https://fir-sheets-sync.firebaseio.com/';
    const notIncluded = 'gibberish';
    const result = formatUrl(sheetName, oAuthToken);
    expect(result.includes(token)).toBe(true);
    expect(result.includes(dbUrl)).toBe(true);
    expect(result.includes(notIncluded)).toBe(false);
  });
});
