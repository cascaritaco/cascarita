const path = require("path");
const { DefinePlugin } = require("webpack");
require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    fallback: {},
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "client"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        enforce: "pre",
        loader: require.resolve("@svgr/webpack"),
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/public/index.html",
      favicon: "./server/images/favicon.ico",
    }),
    new DefinePlugin({
      "process.env.REACT_APP_AUTH0_DOMAIN": JSON.stringify(
        process.env.REACT_APP_AUTH0_DOMAIN,
      ),
      "process.env.REACT_APP_AUTH0_CLIENT_ID": JSON.stringify(
        process.env.REACT_APP_AUTH0_CLIENT_ID,
      ),
      "process.env.REACT_APP_AUTH0_AUDIENCE": JSON.stringify(
        process.env.REACT_APP_AUTH0_AUDIENCE,
      ),
    }),
  ],
  devServer: {
    compress: true,
    port: process.env.CLIENT_PORT,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: {
          host: process.env.HOST,
          protocol: "http:",
          port: process.env.SERVER_PORT,
        },
      },
    },
  },
};
