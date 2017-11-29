const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');
const config = require('../config/config'); // Import database configuration

module.exports = (router) => {
   
    /* ===============================================================
        INSERT USER
    =============================================================== */
    router.post('/createPersonalProfile', function(req,res,next){
        var Password = null;
        var UserID = null;

        var timestamp = require('node-datetime');
        var ts = timestamp.create();
        var tsFormatted = ts.format('Y-m-d H:M:S');
        var TimeStamp = tsFormatted;

        var dcFormatted = ts.format('Y-m-d');
        var DateCreated = dcFormatted;
        

        try{
            req.getConnection(function(err, conn){
                if(err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    //Check if EmailAddress was provided
                    if(!req.body.EmailAddress) {
                        res.json({ success: false, message: 'You must provide an email address!' }); // Return error
                    } else {
                        //Check if UserID was provided
                        if(!req.body.UserID) {
                            res.json( {success: false, message: 'You must provide a user id!'}); //Return an error
                        } else {
                            //Check if Password was provided
                            if (!req.body.Password) {
                                res.json({ success: false, message: 'You must provide a password' }); // Return error
                            } else {
                                //Check if LastNameUser was provided
                                if(!req.body.LastNameUser) {
                                    res.json({ success: false, message: 'You must provide user last name!'});
                                } else {
                                    //Check if FirstNameUser was provided
                                    if(!req.body.FirstNameUser) {
                                        res.json({ success: false, message: 'You must provide user first name!'});
                                    } else {
                                        //Check if UserNumber was provided
                                        if(!req.body.UserNumber) {
                                            res.json({ success: false, message: 'You must provide user number!'});
                                        } else {

                                            //Check if UserID already exist
                                            var UserID = req.body.UserID;
                                            //console.log("User ID:" + UserID);
                                            conn.query('select * from triune_user u where u.UserID = ?', [req.body.UserID], function(err, rows, fields) {
                                                if (err) {
                                                    console.error('SQL error: ', err);
                                                    return next(err);
                                                }
                                                //console.log("UserID Exist: " + rows);

                                                
                                                if(rows != '') {
                                                    res.json({ success: false, message: 'UserID already exist!!!'});
                                                } else {
                                                    var insertSql = "INSERT INTO triune_user SET ?";
                                                    // Apply encryption
                                                    Password = req.body.Password;
                                                    //console.log("Password: " + Password);
                                                    bcrypt.hash(Password, null, null, (err, hash) => {
                                                        if (err) return next(err); // Ensure no errors
                                                        Password = hash; // Apply encryption to password
                                                        //console.log("HASH : " + hash);
                                                        //console.log("HASH PASSWORD: " + Password);

                                                            var insertValues = {
                                                            "UserID" : req.body.UserID,
                                                            "Password" : Password,
                                                            "EmailAddress" : req.body.EmailAddress,
                                                            "FirstNameUser" : req.body.FirstNameUser, 
                                                            "LastNameUser" : req.body.LastNameUser,
                                                            "UserNumber" : req.body.UserNumber,  
                                                            "DateCreated" : DateCreated,  
                                                            "TimeStamp" : TimeStamp,  
                                                            };
                                                            var query = conn.query(insertSql, insertValues, function (err, result){
                                                            if(err){
                                                                //console.error('SQL error: ', err);
                                                                return next(err);
                                                            }
                                                            //console.log("result: " + result);
                                                            //console.log("insertvalues: " + insertValues);
                                                            //console.log("hello");
                                                            //var ID = result.ID;
                                                            res.json({success: true, message: 'User Information Added to the database!!!'});
                                                        });
                                                    // next(); // Exit middleware
                                                    });
                                                } //if(rows != '')
                                            }); //conn.query('select * from triune_user u where u.UserID = ?', [UserID], function(err, rows, fields)

                                        
                                        } //if(!req.body.UserNumber) 
                                    } //if(!req.body.FirstNameUser)
                                } //if(!req.body.LastNameUser)
                            } //if (!req.body.Password)
                        } //if(!req.body.UserID)
                    } //if(!req.body.EmailAddress)
                } //if(err)
            }); //req.getConnection(function(err, conn)
        } //try
            catch(ex){
                console.error("Internal error:"+ex);
                return next(ex);
        }
    });







    /* ===============================================================
    GET PERSONAL PROFILE POST
    =============================================================== */
    router.post('/getPersonalProfile', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                    if (err) {
                        console.error('SQL Connection error: ', err);
                        return next(err);
                    } else {
                        conn.query('select * from triune_personal_profile u where u.StudentNumber = ?', [req.body.StudentNumber], function(err, rows, fields) {
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
                    } //if (err)
                }); //req.getConnection(function(err, conn) 
        } catch (ex) {
                console.error("Internal error:" + ex);
                return next(ex);
        } //try
    });



    /* ===============================================================
    GET ALL PERSONAL PROFILES
    =============================================================== */
    router.get('/getPersonalProfiles/:start/:limit', function(req, res, next) {
        try {

            var start = parseInt(req.params.start);
            var limit = parseInt(req.params.limit);

            var queryString = "select * from triune_personal_information ";
            queryString += queryString = "order by triune_personal_information.LNameStudent asc, triune_personal_information.FNameStudent asc ";
            queryString += queryString = "limit ?, ? ";


                req.getConnection(function(err, conn) {
                    if (err) {
                        console.error('SQL Connection error: ', err);
                        return next(err);
                    } else {
                        conn.query(queryString, [start, limit], function(err, rows, fields) {
                            if (err) {
                                console.error('SQL error: ', err);
                                return next(err);
                            }
                            var rec = [];
                            for (var index in rows) {
                                var obj = rows[index];
                                rec.push(obj);
                            }
                            res.json(rec);
                        });
                    }
                });
        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    });



      /* ===============================================================
    GET USER GET
    =============================================================== */
    router.get('/getUser/:ID', function(req, res, next) {
        try {  //console.log(req.params.ID);
                req.getConnection(function(err, conn) {
                    if (err) {
                        console.error('SQL Connection error: ', err);
                        return next(err);
                    } else {
                        conn.query('select * from triune_user u where u.ID = ?', [req.params.ID], function(err, rows, fields) {
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
                    } //if (err)
                }); //req.getConnection(function(err, conn) 
        } catch (ex) {
                console.error("Internal error:" + ex);
                return next(ex);
        } //try
    });
  



    /* ===============================================================
    DELETE USER
    =============================================================== */
    router.delete('/deleteUser/:ID', (req, res, next) => {
        console.log(req.params.ID);
        try {
                //console.log(req.params.ID);
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('delete from triune_user where ID = ?', [req.params.ID], function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({"ID":req.params.ID,  success: true});
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
    router.post('/updateUser', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                    if (err) {
                        console.error('SQL Connection error: ', err);
                        return next(err);
                    } else {
                        conn.query('UPDATE triune_user set FirstNameUser = ? WHERE ID = ?', [req.body.FirstNameUser, req.body.ID], function(err, rows, fields) {
                            if (err) {
                                console.error('SQL error: ', err);
                                return next(err);
                            }
                            res.json({ success: true, message: 'First Name updated'});
                        });
                    }
                });
        } catch (ex) {
                console.error("Internal error:" + ex);
                return next(ex);
        }
    });



  /* ============================================================
     Route to check if user's email is available for registration
  ============================================================ */
  router.get('/checkEmailAddress/:EmailAddress', (req, res) => {
    // Check if email was provided in paramaters
    //console.log(req.params.EmailAddress);
    
    if (!req.params.EmailAddress) {
      res.json({ success: false, message: 'EmailAddress was not provided' }); // Return error
    } else {
      // Search for user's EmailAddress in database;
        //console.log(req.params.EmailAddress);

      req.getConnection(function(err, conn) {
        if (err) {
            console.error('SQL Connection error: ', err);
            return next(err);
        } else {
            conn.query('select * from triune_user u where u.EmailAddress = ?', [req.params.EmailAddress], function(err, rows, fields) {
                if (err) {
                    console.error('SQL error: ', err);
                    return next(err);
                }
                if((rows.length) > 0) {
                    //console.log("EmailAddress is already taken");
                    res.json({ success: false, message: 'EmailAddress is already taken' }); // Return error
                } else {
                    //console.log("EmailAddress is available");
                    res.json({ success: true, message: 'EmailAddress is available' }); // Return as available EmailAddress
                }            
            });
        } //if (err)
    }); //req.getConnection(function(err, conn)      
      

    }
  });
    

  return router; // Return router object to main index.js
}