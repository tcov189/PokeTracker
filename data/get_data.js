var Pokedex = require('pokedex-promise-v2');
var prompt = require('prompt');
var fs = require("fs");
var colors = require("colors/safe");
var http = require("http");

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

var write = function (result, response){
    fs.writeFile(result.name +'.json', response,  function(err) {
       if (err) {
          return console.error(err);
       }

       console.log("Data written successfully!");           
    });
}

var writeErr = function (error) {
    if (error.statusCode == 404) {
        console.log('404: ' + error.options.url + ' was not found.');
    } else {
        console.log('There was an error: ' + error);
    }
}
prompt.start();

prompt.get(schema, function(err, result){
    
    if (result.resource == 'name'){
        P.getPokemonByName(result.name) // with Promise
        .then(function(response) {
            response = JSON.stringify(response);
            console.log("Got response, writing file...");
            write(result, response);
        })
        .catch(function(error) {
           writeErr(error);
        });
    } else if(result.resource == 'games') {
        P.getVersionGroupByName(result.name)
        .then(function(response) {
            response = JSON.stringify(response);
            console.log("Got response, writing file...");
            write(result, response);
        })
        .catch(function(error) {
            writeErr(error);
        });
    } else if(result.resource == 'region') {
        if (result.name == 'johto') {
            P.getRegionByName(result.name)
            .then(function(response){
                /*response = JSON.stringify(response);*/
                console.log("Got response, writing file...");
                
                for (var i = 0; i < response.locations.length; i++){
                    var url = response.locations[i].url;
                    
                    http.get(url, function(res){
                        var body = '';

                        res.on('data', function(chunk){
                            body += chunk;
                        });

                        res.on('end', function(){
                            var response = JSON.parse(body);
                            console.log("Got a response: ", response.areas);
                        });
                    }).on('error', function(e){
                          console.log("Got an error: ", e);
                    });
                }
                /*write(result, response);*/
            })
            .catch(function(error) {
                writeErr(error);
            });
        } 
    } else {
        console.log(colors.red('Resource function not found!'));
    }
    
});