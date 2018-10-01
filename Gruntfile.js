/*
 * grunt-combine-inline
 * https://github.com/jmk/grunt-combine-inline
 *
 * Copyright (c) 2018 jungmk
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    combine_inline: {
      build: {
        options: {
          root: "."
        },
        files: [{
            expand: true,
            cwd: "./",
            src: "*.html",
            dest: "tmp"
        }]
      }
    },

    copy: {
      resource: {
  			expand: true,
  			cwd: "images",
  			src: "*",
  			dest: "tmp/images"
  		},
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'combine_inline']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
