const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default
const AssetsPlugin = require('assets-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const { cdn } = require('../environment.js')


module.exports = () => {
  return {
    entry: {
      client: resolve('src/index.jsx')
    },
    externals: [ nodeExternals() ],
    output: {
      path: resolve('dist'),
      libraryTarget: 'amd',
      filename: '[chunkhash].client.js',
      publicPath: cdn
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: '<!-- inline_css_plugin -->',
        inject: false
      }),
      new MiniCssExtractPlugin(),
      new HTMLInlineCSSWebpackPlugin({
        replace: {
          removeTarget: true,
          target: '<!-- inline_css_plugin -->'
        }
      }),
      new AssetsPlugin({
        useCompilerPath: true
      })
    ],
    module: {
      rules: [
        {
          test: /\.js?x$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                locals: true,
                modules: true,
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
        }
      ]
    }
  }
}
