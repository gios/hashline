module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'resolve-url?fail', 'sass?sourceMap'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=img/[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  devServer: {
    publicPath: '/assets',
    filename: 'bundle.js',
    historyApiFallback: true,
    port: 9090,
    host: '0.0.0.0',
    proxy: {
      '/api/*': 'http://localhost:5000',
      '/authenticate': 'http://localhost:5000',
      '/registration': 'http://localhost:5000',
      '/img/*': 'http://localhost:5000'
    }
  },
  devtool: 'source-map'
}
