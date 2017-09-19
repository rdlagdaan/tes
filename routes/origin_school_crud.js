const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {
  /* ===============================================================
    INSERT USER
  =============================================================== */
    router.post('/createOriginSchool', function(req,res,next){
    try{
        var reqObj = req.body;        
        console.log(reqObj);
        req.getConnection(function(err, conn){
        if(err) {
            console.error('SQL Connection error: ', err);
            return next(err);
        } else {
            //Check if StudentNumber was provided
            if(!req.body.StudentNumber) {
                res.json({ success: false, message: 'You must provide an Student number!' }); // Return error
            } else {
                //Check if SchoolLevel was provided
                if(!req.body.SchoolLevel) {
                    res.json( {success: false, message: 'You must provide a School Level!'}); //Return an error
                } else {
                    //Check if SchoolID was provided
                    if (!req.body.SchoolID) {
                        res.json({ success: false, message: 'You must provide a School id' }); // Return error
                    } else {
                        //Check if BeginSY was provided
                        if(!req.body.BeginSY) {
                            res.json({ success: false, message: 'You must provide Begin SY!'});
                        } else {
                            //Check if EndSY was provided
                            if(!req.body.EndSY) {
                                res.json({ success: false, message: 'You must provide End sy!'});
                            } else {
                                //Check if UserID was provided
                                if(!req.body.UserID) {
                                    res.json({ success: false, message: 'You must provide User id!'});
                                } else {

                                    //Check if StudentNumber already exist
                                    var StudentNumber = reqObj.StudentNumber;
                                    console.log("Student Number:" + StudentNumber);
                                    conn.query('select * from triune_origin_school u where u.StudentNumber = ?', [StudentNumber], function(err, rows, fields) {
                                        if (err) {
                                            console.error('SQL error: ', err);
                                            return next(err);
                                        }
                                        console.log("StudentNumber Exist: " + rows);

                                    
                                    if(rows != '') {
                                        res.json({ success: false, message: 'StudentNumber already exist!!!'});
                                    } else {
                                        var insertSql = "INSERT INTO triune_origin_school SET ?";
                                        var insertValues = {
                                        "StudentNumber" : reqObj.StudentNumber,
                                        "SchoolLevel" : reqObj.SchoolLevel,
                                        "SchoolID" : reqObj.SchoolID,
                                        "BeginSY" : reqObj.BeginSY, 
                                        "EndSY" : reqObj.EndSY,
                                        "UserID" : reqObj.UserID};
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
    router.post('/getOriginSchool', function(req, res, next) {
        try {
            
                var UserID = req.body.UserID;
                console.log("User ID: " + UserID);
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_origin_school u where u.UserID = ?', [UserID], function(err, rows, fields) {
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
    router.get('/getOriginSchools', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_origin_school', function(err, rows, fields) {
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
  router.delete('/deleteOriginSchool/:ID', (req, res, next) => {
    try {
            var ID = req.params.ID;
            console.log(ID);
            req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('delete from triune_origin_school  where ID = ?', [ID], function(err, rows, fields) {
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
    /* router.post('/updateOriginSchool', function(req, res, next) {
        try {
            
                var SchoolLevel = req.body.SchoolLevel;
                var ID = req.body.ID;

                console.log("SchoolLevel: " + SchoolLevel);
                console.log("ID: " + ID);

                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_user set StudentNumber = ? WHERE ID = ?', [StudentNumber, ID], function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({ success: true, message: 'Student Number updated'});
                    });
                }
            });
        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    });*/




  return router; // Return router object to main index.js 
} 