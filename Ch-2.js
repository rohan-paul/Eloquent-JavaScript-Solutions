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