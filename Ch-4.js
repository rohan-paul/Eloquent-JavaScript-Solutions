/* Chapter-4/Problem-1
 The introduction of this book alluded to the following as a nice way to com-
 pute the sum of a range of numbers:
 console.log(sum(range(1, 10)));

Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and includ-ing) end.
    Next, write a sum function that takes an array of numbers and returns the sum of these numbers. Run the previous program and see whether it does indeed return 55.

As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used to build up the array. If no step is given, the array elements go up by increments of one, corresponding to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].
*/

function range(start, end, step) {
  if ((step == null) || (typeof step == 'undefined')) step = 1;
  var array = [];
    if (step > 0) {
        for (var i = start; i <= end; i+= step)
            array.push(i);
    } else {
        for (var i = start; i >= end; i+= step) {
            array.push(i);
          }
        }
    return array;
};

function sumOfArray(array) {
    var sumTotal = 0;
    for (var i = 0; i < array.length; i++)
        sumTotal += array[i];
    return sumTotal;
}

console.log(range(1, 10));
console.log(range(1, 10, 2));
console.log(sumOfArray(range(1, 10)));

/* Chapter-4/Problem-2
 Arrays have a method reverse, which changes the array by inverting the order in which its elements appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace.

 The first, reverseArray, takes an array as an argument and produces a new array that has the same elements in the inverse order.

 The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument in order to reverse its elements. Neither may use the standard reverse method.
*/

function reverseArray(array) {
    var output = [];
    for (i = array.length - 1; i >= 0; i--) {
        output.push(array[i]);
    }

    return output
}

function reverseArrayInPlace(array) {
    var output = [];
    var loopTimer = array.length; // If I directly put array.length in the below for loop, the program goes out of memory during runtime.

    for (var i = 0; i < loopTimer; i++) {
        output[i] = array.pop();
    }
    for (var j = 0; j < loopTimer; j++) {
        array.push(output[j]);
    }
    return array;
};

console.log(reverseArray([1 ,2 ,3, 4]));
console.log(reverseArrayInPlace([5 ,6 ,7, 8]));