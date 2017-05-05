const webpack = require("webpack"),
  path = require("path"),
  { env } = require("yargs").argv,
  PrettierPlugin = require("prettier-webpack-plugin");

const DEV = env !== "production";

module.exports = {
  entry: ["babel-polyfill", "./src/client/index.js"],
  output: {
    path: path.resolve(__dirname, "public/client"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [new PrettierPlugin({ singleQuote: true })],
  module: {
    loaders: [
      {
        test: /\.css/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
  }
};
