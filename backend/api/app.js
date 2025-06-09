const app = require('../index.js');
const serverless = require('http');

module.exports = (req, res) => {
  const server = serverless.createServer(app);
  server.emit('request', req, res);
};
