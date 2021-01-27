/*
 * grunt-terser
 * https://github.com/adascal/grunt-terser
 *
 * Copyright (c) 2021 Alexandr Dascal
 * Licensed under the MIT license.
 */

module.exports = (grunt) => {
  // Project configuration.
  grunt.initConfig({
    eslint: {
      all: ['Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>'],
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    terser: {
      default_options: {
        files: {
          'tmp/default_options': ['test/fixtures/*.js'],
        },
      },
      custom_options: {
        options: {
          module: true,
          sourceMap: true,
        },
        files: {
          'tmp/custom_options': ['test/fixtures/*.js'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'terser', 'nodeunit']);

  grunt.registerTask('lint', ['eslint']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['lint', 'test']);
};
