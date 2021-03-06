// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RSS агрегатор',
      template: 'index.html',
    }),
  ],
};

// module.exports = {
//   mode: process.env.NODE_ENV || 'development',
//   entry: path.resolve(__dirname, 'src/index.js'),
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.(scss)$/,
//         use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'RSS aggregator',
//       template: 'index.html',
//     }),
//   ],
// };
