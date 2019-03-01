import { join, resolve } from 'path'
import webpack, { WatchIgnorePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackMd5Hash from 'webpack-md5-hash'
import CleanWebpackPlugin from 'clean-webpack-plugin'
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import WebpackShellPlugin from 'webpack-shell-plugin'

const dist = resolve(__dirname, 'dist')

module.exports = {
  resolve: {
    extensions: ['.js', '.svg'],
    alias: {
      components: resolve(__dirname, 'app/components/'),
      containers: resolve(__dirname, 'app/containers/'),
      core: resolve(__dirname, 'app/core/'),
      hoc: resolve(__dirname, 'app/hoc/'),
      assets: resolve(__dirname, 'assets/'),
      locales: resolve(__dirname, 'locales/'),
      config: resolve(__dirname, 'app/settings/config.js'),
      tests: resolve(__dirname, 'tests/'),
      i18n: resolve(__dirname, 'app/core/i18n/')
    }
  },

  entry: {

    main: [
      join(__dirname, 'app/index.js')
    ],

    vendor: [
      'babel-polyfill',
      'basil.js',
      'eventemitter3',
      'moment',
      'prop-types',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'urijs',
      'whatwg-fetch'
    ]
  },

  output: {
    path: dist,
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolve(__dirname, 'app')
        ],
        loader: 'babel-loader'
      }, {
        test: /\.po$/,
        loader: 'json-loader!po-loader?format=jed1.x'
      }, {
        test: /(.jpg|.png|.gif)$/,
        include: [
          resolve(__dirname, 'assets/images')
        ],
        loader: 'file-loader'
      }, {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader'
      }, {
        test: /\.(scss|css)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        }, {
          loader: 'sass-loader',
          options: {
            data: "@import '~core/styles/tapestry/helpers';"
          }
        }]
      },

      // TAPESTRY ICONS
      {
        test: /\.(svg)$/,
        include: /tapestry-css.+icons/,
        loader: 'svg-sprite-loader'
      },

      // OUR SVGS
      {
        test: /\.(svg)$/,
        exclude: [
          /tapestry-css.+icons/
        ],
        loader: 'file-loader'
      }

    ]
  },

  devtool: 'source-map',

  context: __dirname,

  target: 'web',

  stats: 'errors-only',

  devServer: {
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    overlay: {
      errors: true
    }
  },

  plugins: [
    new WebpackMd5Hash(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'app/index.html'),
      inject: true
    }),
    // do not reload on test files change
    new WatchIgnorePlugin([
      join(__dirname, 'app/**/*.test.js')
    ]),

    // generate all needed favicons from the original one
    // new FaviconsWebpackPlugin('assets/jam-favicon.png'),
    new webpack.optimize.CommonsChunkPlugin({
      filename: '[chunkhash].bundle.js', // override vendor naming with unique hash, changing when dependencies are changed
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.includes('node_modules')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // clean dist dir before each prod build
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
      dry: false
    }),
    // copy/move assets dir to dist to fix css relative links
    new CopyWebpackPlugin([
      { from: join(__dirname, 'assets/'), to: join(__dirname, 'dist/assets/') }
    ]),
    // only load fucking fr and en locales for moment
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en|fr)$/),

    new WebpackShellPlugin({
      onBuildStart: [
        'yarn i18n' // compile .po translations into .json ready file
      ],
      onBuildEnd: []
    })
  ]
}
