/*Write a function min that takes two arguments and returns their minimum.*/

function min(a, b) {
    if (a < b) {
        return a;
    } else return b;
}

console.log(min(2,3));
console.log("***End of this solution***");

/* Recursion
 Define a recursive function to determine whether a number is even or odd.
 */

function isEven(number) {
    if (number === 0) {
        return true;
    } else if (number === 1) {
        return false;
    } else return isEven(number-2);
}

console.log(isEven(75));
console.log("***End of this solution***");

/* write a function called countChar that takes a first argument as a string and a second argument that indicates the character that is to be counted for the number of times it appears in the first string argument */

function countChar(str, character) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == character) {
            count += 1;
        }
    } return count;
}

console.log(countChar("AAbbccc", "c" ));
console.log("***End of this solution***");