const compose = require('ramda/src/compose');
const equals = require('ramda/src/equals');
const head = require('ramda/src/head');
const filter = require('ramda/src/filter');
const update = require('ramda/src/update');
const indexOf = require('ramda/src/indexOf');
const findIndex = require('ramda/src/findIndex');
const not = require('ramda/src/not');
const map = require('ramda/src/map');
const addIndex = require('ramda/src/addIndex');
const ifElse = require('ramda/src/ifElse');
const complement = require('ramda/src/complement');
const always = require('ramda/src/always');

const data = [
  ['id', 'name', 'gender'],
  [125, 'Alex', 'M'],
  [542, 'Tom', 'M']
];
const rowId = 542;
const cellId = 'name';
const value = 'TOM';

const headerRow = head(data);
const equalsRowId = equals(rowId);
const row = filter(compose(equalsRowId, head))(data);
const rowOneD = head(row);
const rowIndex = findIndex(compose(equalsRowId, head))(data);
const cellIndex = indexOf(cellId, headerRow);
const equalsRowIndex = equals(rowIndex);
const equalsCellIndex = equals(cellIndex);
const updateRow = update(cellIndex, value, rowOneD);
const updateData = update(rowIndex, updateRow, data);
const mapIndexed = addIndex(map);

const nullUnchangedCells = mapIndexed((row, index) => {
  // ifElse(complement(equalsRowIndex), always(row.fill(null)))
  if (complement(equalsRowIndex)(index)) return row.fill(null);
  return mapIndexed((cell, index) =>
    ifElse(complement(equalsCellIndex), always(null), always(cell))(index)
  )(row);
});

console.log(nullUnchangedCells(updateData));
