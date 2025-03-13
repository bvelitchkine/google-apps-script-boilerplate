function SheetUtils() {
  function _getSpreadsheet(spreadsheetId = null) {
    if (spreadsheetId) {
      return SpreadsheetApp.openById(spreadsheetId);
    }
    return SpreadsheetApp.getActiveSpreadsheet();
  }

  function _getSheet(spreadsheet, sheetName = null) {
    if (sheetName) {
      return spreadsheet.getSheetByName(sheetName);
    }
    return spreadsheet.getActiveSheet();
  }

  function _getColumnHeaders(sheet) {
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    return headers;
  };

  function getSpreadsheetAndSheet(spreadsheetId = null, sheetName = null) {
    const spreadsheet = _getSpreadsheet(spreadsheetId);
    const sheet = _getSheet(spreadsheet, sheetName);
    return [spreadsheet, sheet];
  }

  function getSheetData(sheet) {
    return sheet.getDataRange().getValues();
  }

  function applyFunctionToColumn(sheet, columnName, func) {
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const columnIndex = headers.indexOf(columnName);
    if (columnIndex < 0) {
      Logger.log("Column not found in range");
      return
    }

    return data.slice(1).map(row => func(row[columnIndex]));
  }

  function saveNewColumnData(sheet, columnData, columnName) {
    const headers = _getColumnHeaders(sheet);
    const columnIndex = headers.indexOf(columnName);
    const dataToInsert = columnData.flat().map(row => [row]);
    // Column does not exist yet
    if (columnIndex < 0) {
      const lastCol = sheet.getLastColumn();
      sheet.insertColumnAfter(lastCol);
      Logger.log(lastCol + 1);
      Logger.log(dataToInsert.length + 1)
      sheet.getRange(1, lastCol + 1, dataToInsert.length + 1, 1).setValues([[columnName]].concat(dataToInsert));
      return;
    }
    sheet.getRange(2, columnIndex + 1, dataToInsert.length, 1).setValues(dataToInsert);
  }

  function saveObjectsAsColumns(sheet, objects) {
    if (!objects?.length) return;

    // Get all unique keys from the objects
    const allKeys = [...new Set(objects.flatMap(Object.keys))];

    // Transform objects into columns
    const columnData = {};
    allKeys.forEach(key => {
      columnData[key] = objects.map(obj => obj[key] || "");
    });

    // Save each column
    Object.entries(columnData).forEach(([columnName, values]) => {
      saveNewColumnData(sheet, values, columnName);
    });
  }

  return Object.freeze({
    getSpreadsheetAndSheet,
    getSheetData,
    applyFunctionToColumn,
    saveNewColumnData,
    saveObjectsAsColumns
  });
}
