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
    }
    return str;
}

console.log(loopingTriangle());

console.log("End of this solution ***************")

/*
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead. When you have that working, modify your program to print "FizzBuzz"
for numbers that are divisible by both 3 and 5.
*/

function fizzBuzz() {
    for (var i =0; i <=100; i++) {
        if ((i % 3 == 0) && (i % 5 ==0)) {
            console.log(i + ". FizzBuzz");
        } else if ( i %3 == 0 ) {
            console.log(i + ". Fizz");
        } else if (i % 5 == 0) {
            console.log(i + ". Buzz");
        }
    }
}

console.log(fizzBuzz());