/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const split = (delimiter) => (str) => str.split(delimiter);
const splitD = split('/d/');
const splitEdit = split('/edit');
const url = process.argv[2];
// eslint-disable-next-line no-unused-vars
const [_, keyWithEdit] = splitD(url);
const [key] = splitEdit(keyWithEdit);

const dirPath = path.join(__dirname, '..', 'functions', 'config');
const filePath = path.join(dirPath, 'spreadsheet-id.js');

const createFile = async (k) => {
  try {
    await fs.promises.mkdir(dirPath, {
      recursive: true
    });
    fs.writeFileSync(filePath, `module.exports = "${k}"`);
    console.log(
      'Successfully created file, please continue with the instructions'
    );
  } catch (e) {
    console.error(e);
  }
};

createFile(key);
