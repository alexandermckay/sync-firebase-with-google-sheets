const compose = require('ramda/src/compose');
const equals = require('ramda/src/equals');
const head = require('ramda/src/head');
const filter = require('ramda/src/filter');
const update = require('ramda/src/update');
const indexOf = require('ramda/src/indexOf');
const findIndex = require('ramda/src/findIndex');
const map = require('ramda/src/map');
const addIndex = require('ramda/src/addIndex');
const ifElse = require('ramda/src/ifElse');
const always = require('ramda/src/always');

const isTest = equals(process.env.NODE_ENV, 'test');

const exec = () => {
  const data = [
    ['id', 'name', 'gender'],
    [125, 'Alex', 'M'],
    [542, 'Tom', 'M']
  ];
  const rowId = 542;
  const cellId = 'name';
  const value = 'TOM';

  const fillList = (value) => (arr) => arr.fill(value);
  const fillListNull = fillList(null);
  const headerRow = head(data);
  const equalsRowId = equals(rowId);
  const rowIndex = findIndex(compose(equalsRowId, head))(data);
  const cellIndex = indexOf(cellId, headerRow);
  const equalsRowIndex = equals(rowIndex);
  const equalsCellIndex = equals(cellIndex);
  const rowTwoDimension = filter(compose(equalsRowId, head))(data);
  const rowOneDimension = head(rowTwoDimension);
  const updateRow = update(cellIndex, value, rowOneDimension);
  const updateData = update(rowIndex, updateRow, data);
  const mapWithIndex = addIndex(map);

  const nullUnchangedCells = mapWithIndex((row, index) =>
    ifElse(
      equalsRowIndex,
      always(
        mapWithIndex((cell, index) =>
          ifElse(equalsCellIndex, always(cell), always(null))(index)
        )(row)
      ),
      always(fillListNull(row))
    )(index)
  );
  console.log(nullUnchangedCells(updateData));
  if (isTest) {
    return {
      fillList,
      fillListNull,
      headerRow,
      equalsRowId,
      rowIndex,
      cellIndex,
      equalsRowIndex,
      equalsCellIndex,
      rowTwoDimension,
      updateRow,
      updateData,
      mapWithIndex
    };
  }
};

exec();
