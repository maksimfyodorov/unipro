const { merge } = require('webpack-merge')
const base = require('./webpack.base.config.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../dist/*')]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ],
              },
            },
          },
          'resolve-url-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
  }
})
