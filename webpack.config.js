const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
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
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: {
          host: "0.0.0.0",
          protocol: "http:",
          port: 80,
        },
      },
    },
  },
};
