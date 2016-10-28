var fs = require('fs');
var solc = require('solc');
var async = require('async');
var exec = require('child_process').exec;

module.exports = function(grunt) {

    try{
        var config = require('./config.json');
    } catch(e){
        var config = {};
    }
    //console.log('Config: ',config);

    var outputFile = __dirname+'/contracts.json';
    if (grunt.option("output"))
        outputFile = __dirname+grunt.option("output");
    else if (config.output)
        outputFile = config.output;

    var contractsDir = __dirname+'/contracts';
    if (grunt.option("contractsDir"))
        contractsDir = __dirname+grunt.option("contractsDir");
    else if (config.contractsDir)
        contractsDir = config.contractsDir;

    var readDir = function(dir) {
        var results = []
        var list = fs.readdirSync(dir)
        list.forEach(function(file) {
            file = dir + '/' + file
            var stat = fs.statSync(file)
            if (stat && stat.isDirectory()) results = results.concat(readDir(file))
            else results.push(file)
        })
        return results
    }

    var contracts = readDir(contractsDir);
    //console.log('Contracts: ', contracts);

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('compile', 'Compile contracts.', function() {
        if (process.platform == 'linux')
            exec("notify-send 'Compiling contracts..'");
        var done = this.async();
        var input = {};
        async.forEachOf(contracts, function(file, index, callback){
            fs.readFile(file, 'utf8', function read(err, data) {
                if (err)
                    throw err;
                //if (file.indexOf('/') >= 0)
                    //file = file.split('/')[file.split('/').length-1];
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
                    exec("notify-send --expire-time=500 -u low '"+output.errors.length+" Compilation error'");
                done(output.errors[0]);
            } else {
                fs.writeFile(outputFile, JSON.stringify(output.contracts, null, '    '), function (err,data) {
                    if (err) {
                        console.error(err);
                    } else {
                        if (process.platform == 'linux')
                            exec("notify-send --expire-time=500 -u low 'Compilation successfull'");
                        console.log('Contracts file created.');
                        done(err);
                    }
                });

            }
        }
    });

    grunt.registerTask('default', ['compile']);
    grunt.registerTask('dev', ['watch:contracts']);

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
