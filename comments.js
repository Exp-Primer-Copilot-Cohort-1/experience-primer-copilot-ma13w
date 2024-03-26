// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', 'utf8', function (err, data) {
            if (err) {
                res.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf8'
                });
                res.end('404, not found.');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html;charset=utf8');
                res.end(data);
            }
        });
    } else if (pathname === '/addComment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else if (pathname === '/getComments') {
        var str = urlObj.query;
        var index = str.indexOf('=');
        var callback = str.slice(index + 1);
        res.end(callback + '(' + JSON.stringify(comments) + ')');
    } else {
        fs.readFile(path.join(__dirname, pathname), 'utf8', function (err, data) {
            if (err) {
                res.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf8'
                });
                res.end('404, not found.');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html;charset=utf8');
                res.end(data);
            }
        });
    }
});
server.listen(8080, function () {
    console.log('server is listening on port 8080');
});