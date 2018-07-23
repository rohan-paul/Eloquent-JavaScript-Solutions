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

/* Chapter-4/Problem-3

 Write a function arrayToList that builds up a data structure like the previous one when given [1, 2, 3] as an argument, and write a listToArray function that produces an array from a list. Also write the helper functions prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns the element at the given position in the list, or undefined when there is no such element. If you haven’t already, also write a recursive version of nth.
*/

function arrayToList(array) {
  var list = null;
  for (var i = array.length - 1; i >= 0; i--) {
      list = {value: array[i], rest: list};
  }
   return list;
};

function listToArray(list) {
    var array = [];
    while (list.rest !== null) {
        array.push(list.value);
        list = list.rest;
    }
    array.push(list.value);
    return array;

};

console.log(arrayToList([10, 20, 30]));
console.log(listToArray(arrayToList([10, 20, 30])));

function prepend(value, list) {
    return {value: value, rest: list };
}

function nth(list, number){
    if (list.rest == (null || 'undefined') || number < 0 ) {
        return;
    } else if (number === 0) {
        return list.value;
    } else {
        number--;
        return nth(list.rest, number);
    }
}

console.log((arrayToList(["R", "P", "H"])));

console.log(nth(arrayToList(["R", "P", "H"]), 0));
console.log(nth(arrayToList(["R", "P", "H"]), 1));
console.log(nth(arrayToList(["R", "P", "H"]), 2));
console.log(nth(arrayToList(["R", "P", "H"]), -1));

/* My learning Note on the recursive nth function -
 A) < list.rest > will fetch the next node of the list (i.e. the next value-rest pair) and < list.value > will fetch the value part of the current node (i.e. an element of the original array in this case)
 B) Assuming for an example, I have given to “number” parameter the number 1 > So “number” will start from the value 1 and decremented at each node / each loop > So it will reach “0” in the second node / loop
 C) And the as soon as its decremented value reaches "0" > the else if condition of the nth function will be triggered and will < return list.value > for that particular node.
 In the above example - the list.value for the second node is 'P' and that's what is being returned
 D) Overall the function works as - After looping through the if conditions, when recursion "termination condition" is reached i.e. that the list.rest element is null OR that number === 0 it returns the list.value from that particular node (i.e. in the node where the "termination condition" was reached. Otherwise, it recurses into nth and moves to the next node of the list.
 */

/* Chapter-4/Problem-4
 The == operator compares objects by identity. But sometimes, you would prefer to compare the values of their actual properties. Write a function, deepEqual, that takes two values and returns true only if they are the same value or are objects with the same properties whose values are also equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the === operator for that) or by looking at their properties, you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison. But you have to take one silly exception into account: by a historical accident, typeof null also produces "object".
 */

console.log("**Below output from deepEqual**");

function deepEqual(a, b) {
    if((typeof a == "object" && a != null) && (typeof b == "object" && b != null)) {
        if (Object.keys(a).length != Object.keys(b).length) {
            return false;
        } else if (a === b) {
            return true;
        } else if (typeof a !== 'object' || typeof b !== 'object') {
            return false;
        } else {
            for (var prop in a) {
                if (b.hasOwnProperty(prop)) {
                    if (! deepEqual(a[prop], b[prop]))
                        return false;  // recursively checking if deepEqual is satisfied between a and b.
                }
                else
                    return false;  // i.e. if b.hasOwnProperty(prop) itself is false.
            }

            return true; // if both b.hasOwnProperty(prop) and recursive deepEqual is true.
        }

        }


        else if (a !== b) {
            return false;
        } else
            return true;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));  // → true
console.log(deepEqual(obj, {here: 1, object: 2}));  // → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));  // → true
