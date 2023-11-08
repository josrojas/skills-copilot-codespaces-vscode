// Create web server
// Run: node comments.js
// Test: curl -d "comment=Hello" http://localhost:3000/comments
// Test: curl http://localhost:3000/comments
// Test: curl -X DELETE http://localhost:3000/comments/0
// Test: curl -X DELETE http://localhost:3000/comments/1
// Test: curl -X DELETE http://localhost:3000/comments/2
// Test: curl -X DELETE http://localhost:3000/comments/3
// Test: curl -X DELETE http://localhost:3000/comments/4

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var comments = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(comments);
});

app.post('/comments', function(req, res) {
  comments.push(req.body.comment);
  res.setHeader('Content-Type', 'text/plain');
  res.end('Added comment');
});

app.delete('/comments/:id', function(req, res) {
  if (comments[req.params.id]) {
    comments.splice(req.params.id, 1);
    res.setHeader('Content-Type', 'text/plain');
    res.end('Deleted comment');
  } else {
    res.statusCode = 404;
    res.send('Error: Comment not found');
  }
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');