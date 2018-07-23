/*
The "#"" characters in this plan represent walls and rocks, and the "o" characters represent "critters". The spaces, as you might have guessed, are empty space.

What is a Vector object? X and Y coordinates

What is a Grid object? Grid is a view of a World at that moment.

What is a World object? A world contains a grid, and a legend of wall, critter and empty space characters, and where these elements are at that moment. The constructor of World object, takes a "plan" (the array of strings representing the world’s grid), which is the "map" argument - and a "legend" as arguments. A "legend" is an object that tells us what each character in the map means. It contains a constructor for every character—except for the space character, which always refers to null, the value we’ll use to represent empty space.

forEach loop in World constructor uses grid.set builds world and elementFromChar to build grid
What is the plan array?  An array that builds the grid/world.
What is a View object? A view object knows about the world and the critter’s current position in that world.
What is a Plant? A simple life-like form.

Variables 'map' is an array representing the initial "plan" variable. And 'legend' is an object, having a key-value pair.
*/

/*We can define a world with a plan, an array of strings that lays out the world’s grid using one character per square. Such an object keeps track of the size and content of the world. It has a toString method, which converts the world back to a printable string (similar to the plan it was based on) so that we can see what’s going on inside. The world object also has a turn method, which allows all the critters in it to take one turn and updates the world to reflect their actions.
*/
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

/*The 'space' variable is an array, and a vector is used for transforming from 2 dimension (x, y) to an index i into space*/
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};

/* .get() and .set(), simply find the position of an item in the array, and read, or write the value in said position. */
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};

/*Explanation of the grid function - See also my details note in ../Eloquent-Book/Ch-7-My-Explanation-on-turning-2D-Matrix-to-1D-Array  AND also my blog - https://goo.gl/yz4DfP

The general arithmetic behind converting a 2D array into 1D is

2d[height][width] = 1d[ width + height * Total number_of_columns_in_the_Matrix ]

With ‘i’ representing the row number (i.e. height or distance from the top of the Matrix), and ‘j’ the column number (i.e. width or distance from the left of the Matrix). And that, I start numbering from i,j = (0,0) representing a position at row 0 and column 0, for a row-major ordering (i.e. consecutive elements of the rows of the array are contiguous in memory and all the rows are listed one after other).

So, [0][1] is the second item on the top row, [1][n] is on the second row and so forth.

The array elements here in a single row are in groups of 3 ("top left", "top middle", "top right"). So, I need to find the index or count of where the group that I want is starting. That’s what the part of the formula i * Total_number_of_columns_in_the_matrix does. Once I find where the group I want starts, then I add j to get the count of the cell I want.

While counting the index for the first row (which represents i=0), I don't have any previous counts of elements to add. So the Array indices for the first row will just be 0,1,2.

Then, as I get to the second row (i = 1), now, because, I already have 3 entries from the first row, so I need to start with indices 1*3 + 0,1,2 and so on.
*/

var directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1),
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
}

/*critters just follow their nose until it hits an obstacle and then bounces off in a random open direction. So randomElement() function has to return a random element from the passed-in array */
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
  this.direction = randomElement(directionNames);
}

BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

/*From note at the begining - The constructor of World object, takes a "plan" (the array of strings representing the world’s grid), which is the "map" argument - and a "legend" as arguments.*/

function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}

function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

// The below toString() function iterates thought the grid, one line at time, converting each element of the grid to a string. And adding a new line after each line of the original grid.
World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

function Wall() {}

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});

// console.log(world.toString());

/*here is a forEach method for our Grid type, which calls a given function f, for each element in the grid that isn’t null or undefined: Further note, the first argument of the below forEach() function will be a functioin which will be called or invoked (with .call() mehtod on the "context" object)*/

Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++ ) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if(value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};

/*The turn method for the world object that gives the critters a chance to act. It will go over the grid using the forEach(), looking for objects with an act method. And also that before we are letting a critter to turn, that they already did not take their turn. That's why we are keeping a log array "acted"*/

World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};









//----
