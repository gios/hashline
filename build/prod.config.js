'use strict';

let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'resolve-url?fail', 'sass?sourceMap']),
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?name=img/[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
