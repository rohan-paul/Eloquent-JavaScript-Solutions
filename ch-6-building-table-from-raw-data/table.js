// The 2 functions rowHeights() and colWidths() compute arrays of minimum column widths and row heights for a grid of cells. The rows variable will hold and array of arrays, with each inner array representing a row of cells.
function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth())
    }, 0);
  });
}

function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++) {
    result += string;
  }
  return result;
}

function TeXtCell(text) {
  this.text = text.split("\n");
}

TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};

TextCell.prototype.draw = function(width, height) {
  var result = [];

};
