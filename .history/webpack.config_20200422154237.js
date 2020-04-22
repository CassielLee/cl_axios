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
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
  resolve: {},
  devtool: "source-map",
  plugins: [],
};
