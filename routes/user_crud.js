const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {
  /* ===============================================================
    INSERT USER
  =============================================================== */
    router.post('/createUser', function(req,res,next){
    var Password = null;
    var UserID = null;
    try{
        var reqObj = req.body;        
        console.log(reqObj);
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
                                    var UserID = reqObj.UserID;
                                    console.log("User ID:" + UserID);
                                    conn.query('select * from triune_user u where u.UserID = ?', [UserID], function(err, rows, fields) {
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
                                        Password = reqObj.Password;
                                        //console.log("Password: " + Password);
                                        bcrypt.hash(Password, null, null, (err, hash) => {
                                            if (err) return next(err); // Ensure no errors
                                            Password = hash; // Apply encryption to password
                                            console.log("HASH : " + hash);
                                            console.log("HASH PASSWORD: " + Password);

                                        var insertValues = {
                                        "UserID" : UserID,
                                        "Password" : Password,
                                        "EmailAddress" : reqObj.EmailAddress,
                                        "FirstNameUser" : reqObj.FirstNameUser, 
                                        "LastNameUser" : reqObj.LastNameUser,
                                        "UserNumber" : reqObj.UserNumber  };
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
                                        });
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
    router.post('/getUser', function(req, res, next) {
        try {
            
                var UserID = req.body.UserID;
                console.log("User ID: " + UserID);
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_user u where u.UserID = ?', [UserID], function(err, rows, fields) {
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
            var ID = req.params.ID;
            console.log(ID);
            req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('delete from triune_user  where ID = ?', [ID], function(err, rows, fields) {
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
    router.post('/updateUser', function(req, res, next) {
        try {
            
                var FirstNameUser = req.body.FirstNameUser;
                var ID = req.body.ID;

                console.log("FirstNameUser: " + FirstNameUser);
                console.log("ID: " + ID);

                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_user set FirstNameUser = ? WHERE ID = ?', [FirstNameUser, ID], function(err, rows, fields) {
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