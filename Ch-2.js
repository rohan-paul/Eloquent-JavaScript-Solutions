/* Eloquent JavaScript
Chapter 2 Solutions

Looping a Triangle:
 Write a loop that makes seven calls to console.log to output the following
 triangle:
 #
 ##
 ###
 ####
 #####
 ######
 #######
 */

console.log("Loopoing a Triangle..");

function loopingTriangle() {
    var str = "";
    for (var i = 0; i <= 7; i++) {
        str+="#"
		console.log(str);
    }
}

loopingTriangle();
console.log("***End of this solution 1 ***")

/*
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead. When you have that working, modify your program to print "FizzBuzz"
for numbers that are divisible by both 3 and 5.
*/

function fizzBuzz() {
    for (var i = 0; i <= 100; i++) {
        if ((i % 3 === 0) && (i % 5 === 0)) {
            console.log(i + ". FizzBuzz");
        } else if ( i %3 === 0 ) {
            console.log(i + ". Fizz");
        } else if (i % 5 === 0) {
            console.log(i + ". Buzz");
        }
    }
}

console.log(fizzBuzz());
console.log("***End of this solution 2 ***")

/* Chess Board - Write a program that creates a string that represents a grid of given size,
 using newline characters to separate lines. At each position of the grid there
 is either a space or a “#” character. The characters should form a chess board.
 */

console.log("Chess Board");

var matrixSize = 8;


for (var i = 0; i < matrixSize; i++) {
    var matrixValue = "";
    for (var j = 0; j < matrixSize; j++) {
        if ((i+j) % 2 === 0) {
            matrixValue += " ";
        } else {
            matrixValue += "#";
        }
    }
    console.log(matrixValue);
}

console.log("***End of this solution 3***")
