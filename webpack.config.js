const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "./index.js"),
  output: {
    path: path.resolve(__dirname, "data"),
    filename: "index.js",
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
  }
}