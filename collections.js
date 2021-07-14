/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
 var Promise = require('bluebird');

//import pluck first line from old code from promiseConstructors.js
//import writeToJSONFileAsync promiseConstructors.js
var promiseConstructor = require('../bare_minimum/promiseConstructor.js');
var pluckFirstLineFromFileAsync = promiseConstructor.pluckFirstLineFromFileAsync;
var writeToJSONFileAsync = promiseConstructor.writeToJSONFileAsync;

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
 // TODO
 //need an array using .map of all the filepaths that returns a promises, any array full of promises
 //turn the array of filePaths into an array of Promises
 let arrayOfPromises = filePaths.map(function (file) {
  //this is a function is a promise
  console.log(file);
  return pluckFirstLineFromFileAsync(file);
 })

 // var promise1 = pluckFirstLineFromFileAsync(file1) this will be a bunch of promises
  return Promise.all(arrayOfPromises).then(function (firstLines) {
    //do stuff with first lines into an accumulator
    let accumulator = '';
    textToWrite = firstLines.reduce(function (accumulator, x) {
      let newLine = x + "\n";
      return accumulator + newLine}, accumulator)
    //for each first line in the array add a \n if there a next line
    return writeToJSONFileAsync(writePath, textToWrite.substring(0, textToWrite.length-1))
  })

  //Promise.all(arrayOfPromises).then(function(result) {//Format text for ouput -> writeToJSONFileAsynMod-write path})

 //Promise.all(pass in the array of promises), this will then be the array of first line
// var promise2 =writeToJSONFileAsyncMod
 //.then write the file in order using the array of first lines
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};