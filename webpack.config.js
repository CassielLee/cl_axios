"use strict";
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = function (env = {}) {
  const isDev = env.dev;
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isDev ? "axios.js" : "axios.min.js",
      sourceMapFilename: isDev ? "axios.map" : "axios.min.map",
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
    mode: isDev ? "development" : "production",
    resolve: {},
    devtool: "source-map",
    plugins: [
      new htmlWebpackPlugin({
        template: "index.html",
      }),
    ],
  };
};
