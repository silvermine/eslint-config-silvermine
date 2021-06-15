'use strict';

module.exports = function(grunt) {

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      eslint: {
         target: {
            src: [ '**/*.js', '!node_modules/**/*' ],
         },
         fix: {
            src: [ '**/*.js', '!node_modules/**/*' ],
            options: {
               fix: true,
            },
         },
      },

   });

   grunt.loadNpmTasks('grunt-eslint');

   grunt.registerTask('standards', [ 'eslint' ]);
   grunt.registerTask('default', [ 'standards' ]);

};
