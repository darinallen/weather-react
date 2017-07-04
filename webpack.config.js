const path = require('path');

module.exports = {
  entry: './client/index.jsx', // the frontdoor to the project
  devtool: 'cheap-eval-source-map', // inline all source maps into the bundled code, won't be included in production
  output: {
    path: path.join(__dirname, 'public'), // ensures the correct public directory regardless of where webpack is called from the project
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true, // 404s will fallback to index.html
    port: 8080,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  stats: {
    colors: true,
    reasons: true // Gives more useful errors
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: '/node_modules'
      },
      {
        test: /\.jsx?$/, // run anything that ends in .js or .jsx
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
      }
    ]
  }
};
