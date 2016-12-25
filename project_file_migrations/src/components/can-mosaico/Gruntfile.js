"use strict";
var path = require('path');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('tasks');

  grunt.initConfig({

    makeThumbs: {
      main: {
        templates: '../../../templates/*/*.html',
        template: '../../../templates/%/*.html',
        outputFolder: 'edres',
        renderWidth: 680,
        outputWidth: 340
      }
    },

    combineKOTemplates: {
      main: {
        src: "./tmpl/*.tmpl.html",
        dest: "build/templates.js"
      }
    },

/*

          "./build/mosaico.css": "src/components/mosaico/css/app_standalone.less",
          "./build/mosaico-material.css": "src/components/mosaico/css/app_standalone_material.less"
        src: './build/mosaico.css',
        dest: './dist/mosaico.min.css'
        src: './build/mosaico-material.css',
        dest: 'dist/mosaico-material.min.css'
          'build/mosaico.js': ['./src/components/mosaico/js/app.js', './build/templates.js']

*/
    watch: {
      tmpl: {
        files: ['./tmpl/*.tmpl.html'],
        tasks: ['combineKOTemplates']
      },
      exorcise: {
        files: ['build/mosaico.debug.js'],
        tasks: ['exorcise']
      }
    },

    jasmine_node: {
      main: {
        options: {
          coverage: {
            reportDir: 'build/coverage',
          },
          forceExit: false,
          match: '.',
          matchAll: false,
          specFolders: ['spec'],
          extensions: 'js',
          specNameMatcher: 'spec',
          captureExceptions: true,
          junitreport: {
            report: false,
            savePath: './build/jasmine/',
            useDotNotation: true,
            consolidate: true
          }
        },
        src: ['src/**/*.js']
      }
    },

  });

  grunt.registerTask('js', ['combineKOTemplates']);
  grunt.registerTask('build', ['js']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('test', ['jasmine_node']);
};
