const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pages = [];

fs
  .readdirSync(path.resolve(__dirname, '..', 'src', 'pages'))
  .filter((file) => {
    return file.indexOf('base') !== 0;
  })
  .forEach((file) => {
    pages.push(file.split('/', 2));
  });

const htmlPlugins = pages.map(fileName => new HtmlWebpackPlugin({
  getData: () => {
    try {
      return JSON.parse(fs.readFileSync(`./src/pages/${fileName}/data.json`, 'utf8'));
    } catch (e) {
      console.warn(`data.json was not provided for page ${fileName}`);
      return {};
    }
  },
  filename: `./pages/${fileName}.html`,
  template: `./src/pages/${fileName}/${fileName}.pug`
}));

module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
  ].concat(htmlPlugins),
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
            pretty: true
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset',
        generator: {
          filename: '[path][name][ext]'
        }
      },
      {
        test: /\.(png|jpg|svg|gif|webmanifest|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]'
        }
      },
    ]
  }
}
