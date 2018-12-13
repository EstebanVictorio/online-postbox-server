let path = require('path');
let webpack = require('webpack');
let config = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  entry: {
    server: path.resolve(__dirname,'Server') + '/index.js'
  },
  resolve: {
    extensions: ['.js'],
    alias:{
      Controller: path.resolve(__dirname,'Server/Controller'),
      AddOn: path.resolve(__dirname,'Server/AddOn'),
      Agent: path.resolve(__dirname,'Server/Agent')
    }
  },
  output: {
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: [require('babel-plugin-transform-runtime')]
          }
        }
      }
    ]
  }
};

module.exports = config;
