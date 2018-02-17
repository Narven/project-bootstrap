const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
  entry:  [
    './src/index.ts'
  ],
  externals: [nodeExternals()],
  watch: false,
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.ts?$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // Only use this in DEVELOPMENT
    new StartServerPlugin({
      name: 'bundle.js',
      nodeArgs: ['--inspect'], // allow debugging
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('bundle')
      }
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devtool: 'sourcemap'
}
