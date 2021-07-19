//input is a .txt file
//command line tool
//get poke type based on pokemon name
const { doesNotMatch } = require('assert');
const fs = require('fs');
const fetch = require('node-fetch');
//const prompt = require('prompt-async')
// node "index.js" pokemon.txt

 const filePath = process.argv[2]
 var pokemonArr = [];

// from nick's file - TEMP -
//const pokemonArr = fs.readFileSync(__dirname + '/' + filePath,'utf-8').split('\n');

/*const pokemonArrReadFile = function(filePath,inputArray) { 
fs.readFile(__dirname + '/' + filePath, function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(let i = 0; i <array.length; i++) {
        inputArray.push(array[i])
    }
    done();
});
}
*/

function pokemonArrReadFile (callback) {
  fs.readFile(`./${filePath}`, 'utf-8',function (err, content) {
      if (err) return callback(err)
      callback(null, content)
  })
}

pokemonArrReadFile(function (err, content) {
  console.log(content)
  pokemonArr.push(content)
})


console.log(pokemonArr)
//feeding in pokemon array to fiter fetch
let requests = pokemonArr.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`));

//requests will be an array of promises to execute fetch requests for each name

Promise.all(requests)
.then(responses => Promise.all(responses.map(r => r.json())))
.then(pokemons  => {
  let acc = {};
  for (let i = 0; i < pokemons.length; i++){
    var newString =''
    let acc = {name: pokemons[i].name, type: []}
    for(let j = 0; j < pokemons[i].types.length; j++){
      if ( j === pokemons[i].types.length -1){
        acc.type.push(pokemons[i].types[j].type.name)
        newString += `${acc.name}: ${acc.type}`
      } else {
        acc.type.push(pokemons[i].types[j].type.name)
      }
    }
    return newString;
  }
})
.then(data => console.log(data))
.catch(error => console.error(error))



//Promise Road Map

// let tempFunction = function (cmdinput){
//   return new Promise(resolve, reject){
//   }
// }

// tempFunction(pokemonFileInput)


// let testfunc = function (pokemon){
//   return new promise(resolve => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//   .then(data => data.json())
//   .then(type => type.types.forEach((element) =>{console.log(element.type.name)}))
//   .catch(error => console.error(error))
//   })
//   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//   .then(data => data.json())
//   .then(type => type.types.forEach((element) =>{console.log(element.type.name)}))
//   .catch(error => console.error(error))
//   }
