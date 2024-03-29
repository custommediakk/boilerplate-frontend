'use strict';

const paths = {
  modules: {
    jquery: 'node_modules/jquery/dist/jquery.min.js',
    photoswipe: [
      'node_modules/photoswipe/dist/default-skin/*',
      '!node_modules/photoswipe/dist/default-skin/*.css'
    ]
  },
  dist: {
    dir: 'dist',
    all: 'dist/**/*',
    assets: 'dist/assets',
    include: 'dist/includes',
    ignore: ['dist/includes/**', '!dist/includes', '!dist/includes/lib', '!dist/assets', '!dist/images', '!dist/files']
  },
  html: {
    entry: ['src/pages/*.html','src/pages/*.njk', 'src/pages/tmp/*.html'],
    import: ['src/', 'src/includes', 'src/blocks'],
    all: ['src/**/*.html', 'src/**/*.njk']
  },
  css: {
    entry: 'src/styles.scss',
    import: [
      'src/includes/**/*.scss',
      'src/blocks/**/*.scss',
      '!src/**/_*.scss',
      '!src/styles.scss'
    ],
    all: 'src/**/*.scss',
    static: ['dist/**/*.css', '!dist/**/_*.css']
  },
  js: {
    entry: 'src/scripts.js',
    import: [
      'src/includes/**/*.js',
      'src/blocks/**/*.js',
      '!src/**/_*.js',
      '!src/scripts.js'
    ],
    all: 'src/**/*.js',
    static: ['dist/**/*.js', '!dist/**/_*.js']
  },
  json: {
    data: {
      dir: 'src/data',
      files: 'src/data/*.json'
    },
    tmp: {
      dir: 'src/pages/tmp/',
      file: 'src/pages.json',
      templates: 'src/*.njk'
    },
    config: 'config.json'
  }
};

module.exports = { paths };
