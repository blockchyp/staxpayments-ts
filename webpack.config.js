var path = require("path");
var TerserPlugin = require("terser-webpack-plugin");

var PATHS = {
  entryPoint: path.resolve(__dirname, 'src/index.ts'),
  bundles: path.resolve(__dirname, '_bundles'),
}

var config = {
  entry: {
    'staxpayments': './index.ts',
    'staxpayments.min': './index.ts'
  },
  output: {
    path: PATHS.bundles,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'StaxPayments',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "os": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": require.resolve('stream-browserify'),
      "vm": require.resolve("vm-browserify"),
      "crypto": false,
    }
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      }),
    ],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }]
  }
}

module.exports = config;
