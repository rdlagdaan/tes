const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {
  /* ===============================================================
    INSERT COLLEGE COURSE
  =============================================================== */
    router.post('/createCourse', function(req,res,next){
        var UserID = null;
    try{
        var reqObj = req.body;        
        console.log(reqObj);
        req.getConnection(function(err, conn){
        if(err) {
            console.error('SQL Connection error: ', err);
            return next(err);
        } else {
                //Check if CourseGroup was provided
                if(!req.body.CourseGroup) {
                    res.json( {success: false, message: 'You must provide a Course Group'}); //Return an error
                } else {
                    //Check if CourseCode was provided
                    if (!req.body.CourseCode) {
                        res.json({ success: false, message: 'You must provide a Course Code' }); // Return error
                    } else {
                        //Check if Department was provided
                        if(!req.body.Department) {
                            res.json({ success: false, message: 'You must provide Department!'});
                        } else {
                            //Check if GroupID was provided
                            if(!req.body.GroupID) {
                                res.json({ success: false, message: 'You must provide GroupID!'});
                            } else {
                                //Check if CourseDescription was provided
                                if(!req.body.CourseDescription) {
                                    res.json({ success: false, message: 'You must provide CourseDescription!'});
                                } else {
                                    //Check if CourseAbbreviation was provided
                                    if(!req.body.CourseAbbreviation) {
                                        res.json({ success: false, message: 'You must provide CourseAbbreviation!'});
                                    } else {
                                        //Check if UserID was provided
                                        if(!req.body.UserID) {
                                            res.json({ success: false, message: 'You must provide UserID!'});
                                        } else {

                                    //Check if UserID already exist
                                    var UserID = reqObj.UserID;
                                    console.log("User ID:" + UserID);
                                    conn.query('select * from triune_college_course u where u.UserID = ?', [UserID], function(err, rows, fields) {
                                        if (err) {
                                            console.error('SQL error: ', err);
                                            return next(err);
                                        }
                                        console.log("UserID Exist: " + rows);

                                    
                                    if(rows != '') {
                                        res.json({ success: false, message: 'UserID already exist!!!'});
                                    } else {
                                        var insertSql = "INSERT INTO triune_college_course SET ?";
                                        // Apply encryption
                                        //Password = reqObj.Password;
                                        //console.log("Password: " + Password);
                                        //bcrypt.hash(Password, null, null, (err, hash) => {
                                            //if (err) return next(err); // Ensure no errors
                                            //Password = hash; // Apply encryption to password
                                            //console.log("HASH : " + hash);
                                            //console.log("HASH PASSWORD: " + Password);

                                        var insertValues = {
                                        "CourseGroup" : reqObj.CourseGroup,
                                        "CourseCode" : reqObj.CourseCode,
                                        "Department" : reqObj.Department, 
                                        "GroupID" : reqObj.GroupID,
                                        "CourseDescription" : reqObj.CourseDescription,
                                        "CourseAbbreviation" : reqObj.CourseAbbreviation,
                                        "UserID" : reqObj.UserID };
                                        var query = conn.query(insertSql, insertValues, function (err, result){
                                        if(err){
                                            console.error('SQL error: ', err);
                                            return next(err);
                                        }
                                        console.log("result: " + result);
                                        console.log("insertvalues: " + insertValues);
                                        //var ID = result.ID;
                                        res.json({success: true});
                                        });



                                           // next(); // Exit middleware
                                        //});
                                        //console.log("Hashed Password: " + Password);

                                        /*var insertValues = {
                                        "UserID" : UserID,
                                        "Password" : Password,
                                        "EmailAddress" : reqObj.EmailAddress,
                                        "FirstNameUser" : reqObj.FirstNameUser, 
                                        "LastNameUser" : reqObj.LastNameUser,
                                        "UserNumber" : reqObj.UserNumber  };*/
                                       /* var query = conn.query(insertSql, insertValues, function (err, result){
                                        if(err){
                                            console.error('SQL error: ', err);
                                            return next(err);
                                        }
                                        console.log("result: " + result);
                                        console.log("insertvalues: " + insertValues);
                                        var id = result.insertId;
                                        res.json({"id":id,  success: true});
                                        });*/
                                        }
                                    });

                                }
                                }
                            }
                        } 
                    }
                }
            }
        }
        });
    } //try
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
    });




  /* ===============================================================
    GET USER
  =============================================================== */
    router.post('/getCourse', function(req, res, next) {
        try {
            
                var UserID = req.body.UserID;
                console.log("User ID: " + UserID);
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_college_course u where u.UserID = ?', [UserID], function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        var resEmp = [];
                        for (var empIndex in rows) {
                            var empObj = rows[empIndex ];
                            resEmp .push(empObj);
                        }
                        res.json(resEmp);
                    });
                }
            });
        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    });




  /* ===============================================================
    GET ALL USERS
  =============================================================== */
    router.get('/getCourses', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_college_course', function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        var resEmp = [];
                        for (var empIndex in rows) {
                            var empObj = rows[empIndex ];
                            resEmp .push(empObj);
                        }
                        //console.log(resEmp);
                        res.json(resEmp);
                    });
                }
            });
        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    });



  /* ===============================================================
     DELETE USER
  =============================================================== */
  router.delete('/deleteCourse/:ID', (req, res, next) => {
    try {
            var ID = req.params.ID;
            console.log(ID);
            req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('delete from triune_college_course  where ID = ?', [ID], function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    res.json({"ID":ID,  success: true});
                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
  });



  /* ===============================================================
    UPDATE USER
  =============================================================== */
    router.post('/updateCourse', function(req, res, next) {
        try {
            
                var CourseDescription = req.body.CourseDescription;
                var ID = req.body.ID;

                console.log("CourseDescription: " + CourseDescription);
                console.log("ID: " + ID);

                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_college_course set CourseDescription = ? WHERE ID = ?', [CourseDescription, ID], function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({ success: true, message: 'Course Description updated'});
                    });
                }
            });
        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    });




  return router; // Return router object to main index.js
}