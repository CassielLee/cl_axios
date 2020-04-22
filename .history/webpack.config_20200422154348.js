"use strict";
const path = require("path");
const dev = true;
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: dev ? "axios.js" : "axios.min.js",
    sourceMapFilename: dev ? "axios.map" : "axios.min.map",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      // 配置ES6转ES5语法
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
  devServer: {
    port: 8000,
    open: true,
  },
  resolve: {},
  devtool: "source-map",
  plugins: [],
};
