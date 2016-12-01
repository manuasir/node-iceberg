'use strict';

module.exports = function(grunt) {

  // Configuracin del proyecto
  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  docco: {
      debug: {
      src: ['*.js','private/**/*.js'],
      options: {
          output: 'docs/'
      }
      }
  }
  });

  // Carga el plugin de grunt para hacer esto
  grunt.loadNpmTasks('grunt-docco');

  // Tarea por omisin: generar la documentacin
  grunt.registerTask('default', ['docco']);
};
