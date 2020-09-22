const merge = require('webpack-merge');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config');
const distDir = path.join(process.cwd(), 'dist');
const originPath = process.cwd();
const demoPath = `${originPath}/demo`;

const devConfig = {
  mode: 'development',
  entry: `${demoPath}/src/index.tsx`,
  output: {
    path: distDir,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [`${demoPath}`, `${originPath}/src`],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                "modules": false,
                "targets": {
                  "browsers": [ "ie >= 11", "last 2 versions" ]
                }
              }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', { corejs: 3 }],
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-class-properties',
            ],
          }
        },
      },
    ]
  },
  resolve: {
    alias: {
      "@root": path.resolve(originPath),
      "@demo": path.resolve(demoPath),
      "@component": path.resolve(`${originPath}/src`),
      "@widget": path.resolve(`${originPath}/src`),
    },
  },
  devServer: {
    open: true,
    port: 13190,
    contentBase: `${demoPath}`,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(demoPath, 'index.html'),
    }),
  ],
};

module.exports = merge([ baseConfig, devConfig ]);
