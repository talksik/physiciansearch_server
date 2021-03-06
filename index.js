const http = require('http');
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var pool = mysql.createPool({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    database : 'heroku_0eb7f5cb78edbb4',
    user     : 'b65a2ecbca8dd3',
    password : '84489aa7',
});


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});

pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    console.log('Connected to DB as id ' + connection.threadId + '!');
    connection.release();
});

app.get('/', function (req, res) {
  console.log('default route');
  return res.status(200).send("at default route");
});

// Retreives the address, city, state, zip_code given the first, middle, and last name
// of the physician
app.get('/physicianloc', function (req, res) {
    var name_parts = req.query.name.trim().toLowerCase().split(" ");
    console.log(name_parts);
    let first = name_parts[0];
    let last = name_parts[name_parts.length - 1];
    let middle = '';
    if (name_parts.length === 3) {
      middle = name_parts[1];
    }
    console.log(first + middle + last);

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        console.log('Connected to DB as id ' + connection.threadId + '!');

        var query = 'SELECT * FROM physicians WHERE LOWER(first_name)=?' +
                      'AND LOWER(middle_name)=? AND LOWER(last_name)=?';
        connection.query(query, [first, middle, last], function (error, results, fields) {
            if (error) console.log(error);
            if (results.length === 0) {
              return res.status(400).send({
                 message: 'Physician Not Found!'
              });
            }
            var result = res.status(200).send(results[0]);

            connection.release();
            return result;
        });

    });
});
