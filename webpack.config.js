const path = require("path");
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/public/index.html",
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
