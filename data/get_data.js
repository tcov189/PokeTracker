var Pokedex = require('pokedex-promise-v2');
var prompt = require('prompt');
var fs = require("fs");
var colors = require("colors/safe");

var P = new Pokedex();

var schema = {
    properties: {
        resource: {
            description: colors.cyan('What type of resource are you looking for')
        }, 
        name: {
            description: colors.cyan('What is the name of the resource')
        }
    }
}

prompt.start();

prompt.get(schema, function(err, result){

P.getPokemonByName(result.name) // with Promise
    .then(function(response) {
        response = JSON.stringify(response);
        console.log("Got response, writing file...");
        fs.writeFile(result.name +'.json', response,  function(err) {
           if (err) {
              return console.error(err);
           }

           console.log("Data written successfully!");           
        });
    })
    .catch(function(error) {
        if (error.statusCode == 404) {
            console.log('404: ' + error.options.url + ' was not found.');
        } else {
            console.log('There was an error: ' + error);
        }
    });
});
