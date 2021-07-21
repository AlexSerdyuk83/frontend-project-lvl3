const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [{
      //     loader: 'style-loader',
      //   }, {
      //     loader: 'css-loader',
      //   }, {
      //     loader: 'postcss-loader',
      //     options: {
      //       postcssOptions: {
      //         plugins: () => {
      //           return [
      //             require('autoprefixer'),
      //           ];
      //         },
      //       },
      //     },
      //   }, {
      //     loader: 'sass-loader',
      //   }],
      // },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RSS aggregator',
      template: 'index.html',
    }),
  ],
};
