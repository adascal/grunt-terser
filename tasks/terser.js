/*
 * grunt-terser
 * https://github.com/adascal/grunt-terser
 *
 * Copyright (c) 2018 Alexandr Dascal
 * Licensed under the MIT license.
 */

'use strict';

var Terser = require('terser');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask(
    'terser',
    'Grunt plugin for A JavaScript parser, mangler/compressor and beautifier toolkit for ES6+.',
    function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options();

      // Iterate over all specified file groups.
      this.files.forEach(function(f) {
        // Concat specified files.
        var src = f.src
          .filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }
          })
          .map(function(filepath) {
            // Read file source.
            return grunt.file.read(filepath);
          })
          .join(';');

        // Minify file code.
        var result = Terser.minify(src, options);

        if (result.error) {
          grunt.logs.error(result.error);
          return false;
        }

        if (result.warnings) {
          grunt.log.warn(result.warnings.join('\n'));
        }

        // Write the destination file.
        grunt.file.write(f.dest, result.code);

        if (options.sourceMap && options.sourceMap.filename) {
          // Write the source map file.
          grunt.file.write(options.sourceMap.filename, result.map);
        }

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" created.');
      });
    }
  );
};
