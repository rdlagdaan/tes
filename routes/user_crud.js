const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');
const config = require('../config/config'); // Import database configuration

module.exports = (router) => {
   
    /* ===============================================================
        INSERT USER
    =============================================================== */
    router.post('/createUser', function(req,res,next){
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
                                                console.log("UserID Exist: " + rows);

                                                
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
                                                            console.log("result: " + result);
                                                            console.log("insertvalues: " + insertValues);
                                                            //var ID = result.ID;
                                                            res.json({success: true});
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



  /* ========
  LOGIN ROUTE
  ======== */
  router.post('/login', (req, res) => {
    // Check if UserID was provided
    if (!req.body.UserID) {
      res.json({ success: false, message: 'No UserID was provided' }); // Return error
    } else {
      // Check if Password was provided
      if (!req.body.Password) {
        res.json({ success: false, message: 'No password was provided.' }); // Return error
      } else {

        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('select * from triune_user u where u.UserID = ?', [req.body.UserID], function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    if((rows.length) > 0) {
                        console.log("result: " + rows[0].Password);
                        var validPassword = bcrypt.compareSync(req.body.Password, rows[0].Password); 
                        console.log(validPassword);
                        
                        if(!validPassword) {
                            console.log("Invalid Password");
                            res.json({ success: false, message: 'Password invalid' }); // Return error
                        } else {

                            const token = jwt.sign({ userId: rows[0].UserID }, config.secret, { expiresIn: '24h' }); // Create a token for client
                            res.json({
                              success: true,
                              message: 'Success!',
                              token: token,
                              user: {
                                UserID: rows[0].UserID
                              }
                            }); // Return success and token to frontend                           
                        }


                    } else {
                        console.log("UserID not found");
                        res.json({ success: false, message: 'UserID not found.' }); // Return error
                    }
                   // res.json(rows);
                });
            } //if (err)
        }); //req.getConnection(function(err, conn) 



        // Check if EmailAddress exists in database
       /* User.findOne({ EmailAddress: req.body.EmailAddress.toLowerCase() }, (err, user) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if EmailAddress was found
            if (!user) {
              res.json({ success: false, message: 'EmailAddress not found.' }); // Return error
            } else {
              const validPassword = user.comparePassword(req.body.Password); // Compare password provided to password in database
              // Check if Password is a match
              if (!validPassword) {
                res.json({ success: false, message: 'Password invalid' }); // Return error
              } else {
                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                res.json({
                  success: true,
                  message: 'Success!',
                  token: token,
                  user: {
                    EmailAddress: user.EmailAddress
                  }
                }); // Return success and token to frontend
              }
            }
          }
        });*/

        

     } //if (!req.body.Password)
    } //if (!req.body.UserID)
  });

  /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ */
  router.use((req, res, next) => {
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
      res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
      // Verify the token is valid
      jwt.verify(token, config.secret, (err, decoded) => {
        // Check if error is expired or invalid
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
        } else {
          req.decoded = decoded; // Create global variable to use in any request beyond
          next(); // Exit middleware
        }
      });
    }
  });




    /* ===============================================================
    GET USER
    =============================================================== */
    router.post('/getUser', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                    if (err) {
                        console.error('SQL Connection error: ', err);
                        return next(err);
                    } else {
                        conn.query('select * from triune_user u where u.UserID = ?', [req.body.UserID], function(err, rows, fields) {
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
    GET ALL USERS
    =============================================================== */
    router.get('/getUsers', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                    if (err) {
                        console.error('SQL Connection error: ', err);
                        return next(err);
                    } else {
                        conn.query('select * from triune_user', function(err, rows, fields) {
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
    router.delete('/deleteUser/:ID', (req, res, next) => {
        try {
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('delete from triune_user  where ID = ?', [req.params.ID], function(err, rows, fields) {
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
                            res.json({ success: true, message: 'Firt Name updated'});
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