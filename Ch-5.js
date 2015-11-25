/* Problem Statement
Use the reduce method in combination with the concat method to “flatten”
an array of arrays into a single array that has all the elements of the input
arrays*/

function flatten(array) {
    return array.reduce(function(a, b) {
       return a.concat(b);
    });
}


var arr = [
    [1,2],
    [3,4],
    [5,6],
    [7,8],
    [9,10]
];

console.log(flatten(arr));