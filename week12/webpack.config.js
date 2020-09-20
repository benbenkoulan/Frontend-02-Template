const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './index.js',
  },

  plugins: [
    new HTMLWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: './template.html',
    }),
  ],

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]]
      }
    }]
  },
  
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  }
};
