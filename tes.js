const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const router = express.Router(); // Creates a new router object.

const config = require('./config/config'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths

const userCrud = require('./routes/user_crud')(router); // Import User Crud Routes
const collegeCourseCrud = require('./routes/college_course_crud')(router); // Import College Course Crud Routes
const citizenshipCrud = require('./routes/citizenship_crud')(router); // Import Citizenship Crud Routes
const religionCrud = require('./routes/religion_crud')(router); // Import Religion Crud Routes
const documentsSubmittedCrud = require('./routes/documents_submitted_crud')(router); // Import Documents Submitted Crud Routes
const collegeCrud = require('./routes/college_crud')(router); // Import College Crud Routes
const classListCrud = require('./routes/class_list_crud')(router); // Import College Crud Routes
const schoolnameCrud = require('./routes/school_name_crud')(router); // Import School Name Crud Routes
const originSchoolCrud = require('./routes/origin_school_crud')(router); // Import Origin School Crud Routes
const originSchoolDetailsCrud = require('./routes/origin_school_details_crud')(router); // Import Origin School Details Crud Routes
const buildingCrud = require('./routes/building_crud')(router); // Import Building Crud Routes
const roomCrud = require('./routes/room_crud')(router); // Import Room Crud Routes

const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

const mysql = require('mysql');
const connection = require('express-myconnection');

const port = process.env.PORT || 8080;

app.use(connection(mysql, {
  host: config.dbhost,
  user: config.dbuser,
  password: '',
  database: config.db
}, 'request'));


// Middleware
// Middleware
app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use('/userCrud', userCrud); // Use User Crud routes in application
app.use('/collegeCourseCrud', collegeCourseCrud); // Use College Course Crud routes in application
app.use('/citizenshipCrud', citizenshipCrud); // Use User Crud routes in application
app.use('/religionCrud', religionCrud); // Use Religion Crud routes in application
app.use('/documentsSubmittedCrud', documentsSubmittedCrud); // Use Documents Submitted Crud routes in application
app.use('/originSchoolCrud', originSchoolCrud); // Use Origin School Crud routes in application
app.use('/originSchoolDetailsCrud', originSchoolDetailsCrud); // Use Origin School Details Crud routes in application
app.use('/collegeCrud', collegeCrud); // Use College Crud routes in application
app.use('/classListCrud', classListCrud); // Use College Crud routes in application
app.use('/schoolnameCrud', schoolnameCrud); // Use School Name Crud routes in application
app.use('/buildingCrud', buildingCrud); // Use Building Crud routes in application
app.use('/roomCrud', roomCrud); // Use Room Crud routes in application

// Connect server to Angular 2 Index.html
//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname + '/client/index.html'));
//});

// Start Server: Listen on port 8080
app.listen(port, () => {
  console.log('Listening on port ' + port);
});

//End of file - End of file