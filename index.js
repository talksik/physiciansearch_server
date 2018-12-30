const http = require('http');
const port = process.env.PORT || 3000;

var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     database : 'dbname',
//     user     : 'username',
//     password : 'password',
// });
//
// connection.connect(function(err) {
//     if (err) {
//         console.error('Error connecting: ' + err.stack);
//         return;
//     }
//
//     console.log('Connected as id ' + connection.threadId);
// });
//
// connection.query('SELECT * FROM employee', function (error, results, fields) {
//     if (error)
//         throw error;
//
//     results.forEach(result => {
//         console.log(result);
//     });
// });
//
// connection.end();

// content of index.js
const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
