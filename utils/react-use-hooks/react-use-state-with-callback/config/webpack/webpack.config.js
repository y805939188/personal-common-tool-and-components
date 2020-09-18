const path = require("path");
const originPath = process.cwd();
const demoPath = `${originPath}/demo`;

/** 如果没有使用less、sass、stylus的话这里会是个空函数 */
const getStyleConfig = () => {

}

module.exports = {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [path.join(originPath, 'src'), path.join(demoPath, 'src')],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options : { modules: false }
          },
        ],
      },
      { 
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader',},
          {
            loader: 'css-loader',
            options:{ importLoaders: 1 }
          }
        ]
      },
      
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: { limit: 10000 }
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  plugins: [],
};
