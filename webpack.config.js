const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    //multiple entry points
    bundle: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // filename: '[name][contenthash].js',
    // clean: true,
    // assetModuleFilename: '[name][ext]',
  },
  // devtool: 'source-map',
  devtool: 'eval-source-map',
  target: 'web',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/',
    },
    port: 8000,
    host: 'localhost',
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/cpu-utilization': {
        target: 'http://localhost:8000/',
        router: () => 'http://localhost:3000',
        secure: false,
      },
      '/network-in-out': {
        target: 'http://localhost:8000/',
        router: () => 'http://localhost:3000',
        secure: false,
      },
      '/cpu-credits': {
        target: 'http://localhost:8000/',
        router: () => 'http://localhost:3000',
        secure: false,
      },
      '/getLambdaNames': {
        target: 'http://localhost:8000/',
        router: () => 'http://localhost:3000',
        secure: false,
      },
      '/getLambdaMetrics': {
        target: 'http://localhost:8000/',
        router: () => 'http://localhost:3000',
        secure: false,
      },
      '/signup': {
        target: 'http://localhost:8000/',
        router: () => 'http://localhost:3000',
        secure: false,
      },
      '/signin': {
        target: 'http://localhost:8000/',
        router: () => 'http://localhost:3000',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', `@babel/preset-react`],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cloudband OSP',
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
};
