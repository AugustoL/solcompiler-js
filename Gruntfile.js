var fs = require('fs');
var solc = require('solc');
var async = require('async');
var exec = require('child_process').exec;

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('compile', 'Compile contracts.', function() {
        if (process.platform == 'linux')
            exec("notify-send 'Compiling contracts..'");
        var done = this.async();
        var files = fs.readdirSync(__dirname+'/contracts');
        var input = {};
        async.forEachOf(files, function(file, index, callback){
            fs.readFile(__dirname+"/contracts/"+file, 'utf8', function read(err, data) {
                if (err)
                    throw err;
                console.log("Compiling "+file+" ...");
                input[file] = data.toString();
                callback(err);
            });
        }, function(err){
            if (err)
                done(err);
            else
                compile(input, done);
        })

        function compile(sources, done){
            try{
                var output = solc.compile({sources: sources}, 1);
            } catch(e){
                console.error('ERROR ON COMPILE: ',e.toString());
            }
            if (output.errors){
                console.error("Errors:");
                for (var error in output.errors)
                	console.error(output.errors[0]);
                if (process.platform == 'linux')
                    exec("notify-send '"+output.errors.length+" Compilation error'");
                done(output.errors[0]);
            } else {
                fs.writeFile('contracts.json', JSON.stringify(output.contracts, null, '    '), function (err,data) {
                    if (err) {
                        console.error(err);
                    } else {
                        if (process.platform == 'linux')
                            exec("notify-send 'Compilation successfull'");
                        console.log('Contracts file created.');
                        done(err);
                    }
                });

            }
        }
    });

    grunt.registerTask('default', ['compile']);
    grunt.registerTask('dev', ['watch:contracts']);

    var contracts = fs.readdirSync(__dirname+'/contracts');

    for (var i = 0; i < contracts.length; i++)
        contracts[i] = __dirname+"/contracts/"+contracts[i];

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
          contracts: {
            files: contracts,
            tasks: ['compile']
          },
          options: {
            nospawn: true,
          }
        }

    });

};
