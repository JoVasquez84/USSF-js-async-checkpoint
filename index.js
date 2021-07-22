//input is a .txt file
//command line tool
//get poke type based on pokemon name
const { doesNotMatch } = require('assert');
const fs = require('fs');
const fetch = require('node-fetch');
//const prompt = require('prompt-async')
// node "index.js" pokemon.txt

 const filePath = process.argv[2]
 const fileOutput= process.argv[3]

  try {
    var data = fs.readFileSync(`./${filePath}`,'utf-8');
    var pokemonArr=data.split('\n')
} catch(e) {
    console.log('Error:', e.stack);
}

  

console.log(pokemonArr)

//feeding in pokemon array to fiter fetch
let requests = pokemonArr.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`));
console.log(requests)

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
        fs.appendFile(`./${fileOutput}`,newString + '\n',(err) => {
          if (err) throw err;
          console.log('file has been saved')
      })} else {
        acc.type.push(pokemons[i].types[j].type.name)
      }
    }
  }
})
.catch(error => console.error(error))



//Promise Road Map

// let tempFunction = function (cmdinput){
//   return new Promise(resolve, reject){
//   }
// }


