# grunt-terser

> Grunt plugin for A JavaScript parser, mangler/compressor and beautifier toolkit for ES6+.

## Getting Started

This plugin requires Grunt `^1.x`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-terser --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-terser');
```

## The "terser" task

### Overview

In your project's Gruntfile, add a section named `terser` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  terser: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

Accepts Terser's [options](https://www.npmjs.com/package/terser#minify-options).

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 2021-02-27   v2.0.0   Support terser v5 and async code minify
