const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

import '../client/src/utils/index.js';
import '../client/src/utils/install.js';

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: '../client/src/utils/index.js',
      install: '../client/src/utils/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', 
        title: 'TaskMaster',
      }),
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        name: 'TaskMaster',
        short_name: 'TaskMaster',
        description: 'Time manager',
        background_color: '#000',
        crossorigin: '', 
        fingerprints: false,
        inject: true,
        start_url: "./",
        publicPath: "./",
        // icons: [
        //   {
        //     src: path.resolve('../client/src/images/logo.png'),
        //     sizes: [96, 128, 192, 256, 384, 512],
        //     destination: path.join('assets', 'icons'),
        //   },
        // ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
