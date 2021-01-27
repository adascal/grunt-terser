/*
 * grunt-terser
 * https://github.com/adascal/grunt-terser
 *
 * Copyright (c) 2021 Alexandr Dascal
 * Licensed under the MIT license.
 */

const { minify } = require('terser');

module.exports = (
  /**
   * @type import("grunt")
   */
  grunt,
) => {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask(
    'terser',
    'Grunt plugin for A JavaScript parser, mangler/compressor and beautifier toolkit for ES6+.',
    async function terserTask() {
      const done = this.async();

      // Merge task-specific and/or target-specific options with these defaults.
      /**
       * @type import("terser").MinifyOptions
       */
      const options = this.options();

      let createdFiles = 0;

      // Iterate over all specified file groups.
      await Promise.all(
        this.files.map(async (file) => {
          // Concat specified files.
          const src = file.src
            .filter((filepath) => {
              // Warn on and remove invalid source files (if nonull was set).
              if (!grunt.file.exists(filepath)) {
                grunt.log.warn(`Source file "${filepath}" not found.`);
                return false;
              }
              return true;
            })
            .reduce(
              (sources, filepath) => ({
                ...sources,
                [filepath]: grunt.file.read(filepath),
              }),
              {},
            );

          // Minify file code.
          const result = await minify(src, options);

          if (result.error) {
            grunt.log.error(result.error);
            return false;
          }

          if (result.warnings) {
            grunt.log.warn(result.warnings.join('\n'));
          }

          // Write the destination file.
          grunt.file.write(file.dest, result.code);

          if (options.sourceMap) {
            const mapFileName = options.sourceMap.filename
              ? options.sourceMap.filename
              : `${file.dest}.map`;
            // Write the source map file.
            grunt.file.write(mapFileName, result.map);
          }

          // Print a success message for individual files only if grunt is run with --verbose flag
          grunt.log.verbose.writeln(`File "${file.dest}" created.`);

          // Increment created files counter
          createdFiles += 1;
        }),
      );

      if (createdFiles > 0) {
        grunt.log.ok(
          `${createdFiles} ${grunt.util.pluralize(
            createdFiles,
            'file/files',
          )} created.`,
        );
      }

      done();
    },
  );
};
