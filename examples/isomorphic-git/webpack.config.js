const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

const externalAssets = [
  'rdflib/dist/rdflib.min.js',
];

const CircularDependencyPlugin = require('circular-dependency-plugin');


module.exports = {
  mode: 'development',
  entry: './index.ts',
  devtool: "#inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      domain: srcPath('minimal-solid-fs/domain'),
    }
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'SolidWiki'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(externalAssets.map(a => require.resolve(a))),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        ...externalAssets.map(f => f.replace(/.*\//, ''))
      ].filter(f => /\.(js|css|scss)$/.test(f)),
      append: false
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // include specific files based on a RegExp
      include: /src/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ],

  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    hot: true
  },
  externals: {
    'rdflib': {
      commonjs: 'rdflib',
      commonjs2: 'rdflib',
      amd: 'rdflib',
      root: '$rdf'
    },
  },
};

