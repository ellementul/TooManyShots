const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    "choose-host": path.resolve(__dirname, "./choose-host.js"),
    host: path.resolve(__dirname, "./host.js"),
    client: path.resolve(__dirname, "./client.js"),
  },
  output: {
    path: path.resolve(__dirname, "data"),
    filename: "[name].js",
    library: "App",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  mode: "development",
  resolve: {
    fallback: { "path": false }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, "index.js")
      ],
    }),
  ]
}