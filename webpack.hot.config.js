const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // точки входа
  entry: {
    main: '../hot/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    // интернет-путь
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [path.resolve(__dirname, 'source/')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.pug$/i,
        use: ['pug-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name(file) {
            return '[path][name].[contenthash].[ext]?';
          },
        },
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, 'source/')],
        use: ['html-loader'],
      },
    ],
  },
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['main'],
      template: '../hot/template.html',
    }),
  ],
};