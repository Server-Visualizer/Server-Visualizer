const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: 'bundle.js'
  },
  module: { // Setting up the loaders
    rules: [
      { // Setting up JSX transpiling
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader', 
            options: {
              presets: ['@babel/preset-react'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ]
      },
      { // Setting up Sass transpiling
        test: /\.scss$/, 
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },
    ],
  },
  devServer: {
    publicPath: '/client/build/',
    port: 8080,
  }
}