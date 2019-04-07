var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer((req, res) => {
  var filepath = path.join('.', req.url);
  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { 'content-Type': 'text/plain' });
      res.end(err.message);
    } else {
      res.writeHead(200, { 'content-Type': 'text/plain' });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('Listening to port 3000');
});
