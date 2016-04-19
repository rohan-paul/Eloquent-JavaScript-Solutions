/*Problem statement - The below set of data is given about Mountain names, heights and countries. Write codes to show this data in well organized table format, as shown down below.

[
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

  Final formatted table should look like as below

  name         height country
  ------------ ------ -------------
  Kilimanjaro   5895   Tanzania
  Everest       8848   Nepal
  Mount Fuji    3776   Japan
  Mont Blanc    4808   Italy/France
  Vaalserberg   323    Netherlands
  Denali        6168   United States
  Popocatepetl  5465   Mexico*/

var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

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

// code to draw the table
function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
      var blocks = row.map(function(cell, colNum) {
        return cell.draw(widths[colNum], heights[rowNum]);
      });
      return blocks[0].map(function(_, lineNo) {
        return drawLine(blocks, lineNo);
      }).join("\n");
  }
  return rows.map(drawRow).join("\n");
}


function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++) {
    result += string;
  }
  return result;
}

function TextCell(text) {
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
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

/* UnderlinedCell - We will want to highlight the top row, which contains the column names, by underlining the cells with a series of dash characters. An underlined cell contains another cell. It reports its minimum size as being the same as that of its inner cell (by calling through to that cell’s minWidth and minHeight methods) but adds one to the height to account for the space taken up by the underline.
To draw the inner cell, we take the content of the inner cell and concatenate a single line full of dashes to it.
*/
function UnderlinedCell(inner) {
  this.inner = inner;
};

UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};

UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};

UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
};

// Now we finally write the function to build up a grid of cells from our original data set.
function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });

  var body = data.map(function(row) {
    return keys.map(function(name) {
      var value = row[name];
      if (typeof value == "number")
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    });
  });
  return [headers].concat(body);
}

/*Few notes on the above function
A) In line 'Object.keys(data[0])' data[0] means the first element of the array of arrays, of the origianl data set (the variable MOUNTAINS).
 That is, the first row which is - {name: "Kilimanjaro", height: 5895, country: "Tanzania"}
*/

// Create RTextCell() function, being a subclass of TextCell() to right align the number column
function RTextCell(text) {
  TextCell.call(this, text);
}

RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width-line.length) + line);
  }
  return result;
}

console.log(drawTable(dataTable(MOUNTAINS)));
