const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


let config = {
    mode:'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),  // Serve content from the dist directory
        port: 8080,  // Specify a port
        open: true,   // Open the browser when the server starts
        publicPath: '/',
      },
      headers: {
        'Referrer-Policy': '',
      },
}
module.exports = {
  mode:'development',
  devtool: 'source-map',
  entry: './src/main.ts',  // Your main entry point
  output: {
    filename: 'bundle.js',  // Output filename
    path: path.resolve(__dirname, 'local')  // Output directory
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Match image file extensions
        use: [
          {
            loader: 'file-loader', // Use the file-loader for images
            options: {
              name: '[name].[ext]',
              outputPath: 'dist', // Specify the output directory for images
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
  
};