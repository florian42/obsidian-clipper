'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    optimization: {
      minimize: false,
    },
    entry: {
      contentScript: PATHS.src + '/contentScript.ts',
      background: PATHS.src + '/background.ts',
      options: PATHS.src + '/options.ts',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
