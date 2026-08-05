var path = require("path");
var TerserPlugin = require("terser-webpack-plugin");

var PATHS = {
  entryPoint: path.resolve(__dirname, 'src/index.ts'),
  bundles: path.resolve(__dirname, '_bundles'),
}

var config = {
  entry: {
    'blockchyp': './index.ts',
    'blockchyp.min': './index.ts'
  },
  output: {
    path: PATHS.bundles,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'BlockChyp',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
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
