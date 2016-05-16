
var grunt = require('grunt');
var args = process.argv.slice(2);

if (args.indexOf('dev') > -1)
    grunt.tasks(['watch']);
else
    grunt.tasks(['compile']);
