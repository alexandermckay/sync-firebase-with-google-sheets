const functions = require('firebase-functions');
const firebaseToSheets = require('./function/firebase-to-sheets');

exports.firebaseToSheets = firebaseToSheets;
