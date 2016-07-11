'use strict';

module.exports = function(grunt) {

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      eslint: {
         target: [ 'lib/**/*.js', 'tests/**/*.js', '!**/*.valid.js', '!**/*.invalid.js' ],
      },

   });

   grunt.loadNpmTasks('grunt-eslint');

   grunt.registerTask('standards', [ 'eslint' ]);
   grunt.registerTask('default', [ 'standards' ]);

};
