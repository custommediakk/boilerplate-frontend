'use strict';

const babel = require('@rollup/plugin-babel').babel;
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const terser = require("rollup-plugin-terser").terser;

const { src, dest } = require('gulp');
const { paths } = require('./conf');

const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

const scripts = () => {
  const production = process.env.NODE_ENV === 'production';

  const babelOptions = {
    presets: [['@babel/env']],
    exclude: 'node_modules/**',
    babelHelpers: "bundled"
  };

  const rollupPlugins = [
    babel(babelOptions),
    nodeResolve(),
    commonjs()
  ];

  production && rollupPlugins.push(terser());

  const injectFiles = src(paths.js.import, { read: false });

  const injectOptions = {
    transform: path => {
      const filePath = path.substring(path.indexOf('/'), path.lastIndexOf('.'));
      const fileName = path.substring(
        path.lastIndexOf('/') + 1,
        path.lastIndexOf('.')
      );
      return `import ${fileName} from '../..${filePath}';`;
    },
    starttag: '// inject:imports',
    endtag: '// endinject',
    quiet: true
  };

  return src(paths.js.entry)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(production ? $.rename('scripts.min.js') : $.noop())
    .pipe(dest(paths.dist.include))
    .pipe(!production ? $.sourcemaps.init() : $.noop())
    .pipe($.bestRollup2({ plugins: rollupPlugins }, { format: 'iife' }))
    .pipe(!production ? $.sourcemaps.write('.') : $.noop())
    .pipe(dest(paths.dist.include))
    .pipe($.touchCmd());
};

module.exports = scripts;
