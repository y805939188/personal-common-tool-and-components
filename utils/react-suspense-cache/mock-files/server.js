// const path = require('path');
// const HttpServer = require('http-server');
const express = require('express');
const app = express();
const cors = require('cors');

// const allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   // res.header('Access-Control-Allow-Headers', 'Content-Type');
//   // res.header('Access-Control-Allow-Credentials','true');
//   next();
// };

// app.use(allowCrossDomain);

app.use(cors());

app.get('/test/api', (req, res) => {
  setTimeout(() => {
    res.json({
      data: 'test'
    });
  }, 2000);
});

app.listen(13191, () => {
  console.log("正在监听13191的mock数据")
});

// const server = HttpServer.createServer({ root: path.join(__dirname, 'lib') });
// server.listen(20522, () => {
//   console.log('正在监听20522端口的mock文件');
// });




