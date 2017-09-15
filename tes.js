const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const router = express.Router(); // Creates a new router object.

const path = require('path'); // NodeJS Package for file paths

const userCrud = require('./routes/user_crud')(router); // Import User Crud Routes

const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

const mysql = require('mysql');
const connection = require('express-myconnection');

const port = process.env.PORT || 8080;

app.use(connection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbtriune'
}, 'request'));


// Middleware
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use('/userCrud', userCrud); // Use User Crud routes in application


// Connect server to Angular 2 Index.html
//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname + '/client/index.html'));
//});

// Start Server: Listen on port 8080
app.listen(port, () => {
  console.log('Listening on port ' + port);
});