module.exports = {
  entry: "./src/index.js",
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    publicPath: "/assets",
    filename: "bundle.js",
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      "/api/*": "http://localhost:5000"
    }
  },
  devtool: "source-map"
}
