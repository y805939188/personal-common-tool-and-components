const fs = require('fs');
const merge = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const chalk = require('chalk');
const baseConfig = require('./webpack.config');
const args = process.argv;
const originPath = process.cwd();
const isProd = process.env.NODE_ENV === 'production';
const distDir = isProd ? path.join(originPath, 'lib') : path.join(originPath, 'dev-build');

const name = args[args.findIndex(item => item === '--name') + 1];
if (!name && isProd) {
  throw Error('编译widget需要有一个name  可以在npm run build 命令中通过 --name xxx 指定');
}
if (isProd) console.log(chalk.green('这里的name是', name));

const entry = fs.existsSync(`${originPath}/src/index.tsx`) ?
  `${originPath}/src/index.tsx` : fs.existsSync(`${originPath}/src/index.ts`) ?
  `${originPath}/src/index.ts` : null;
if (!entry) throw Error(`无法找到入口文件: ${originPath}/src/index.tsx 或 ${originPath}/src/index.ts`);

const buildConfig = {
  devtool: !isProd ? 'cheap-module-eval-source-map' : 'source-map',
  mode: process.env.NODE_ENV || 'production',
  entry: entry,
  output: {
    path: distDir,
    filename: "index.js",
    // 采用通用模块定义
    libraryTarget: "umd",
    library: name,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: `${originPath}/src`,
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
  externals: {
    'react': 'react',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [distDir]
    }),
  ],
};

module.exports = merge([ baseConfig, buildConfig ]);
