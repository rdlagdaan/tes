const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {
  /* ===============================================================
    INSERT USER
  =============================================================== */
    router.post('/createOriginSchoolDetail', function(req,res,next){
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
                //Check if DetailID was provided
                if(!req.body.DetailID) {
                    res.json( {success: false, message: 'You must provide a Detail ID!'}); //Return an error
                } else {
                    //Check if Remark was provided
                    if (!req.body.Remark) {
                        res.json({ success: false, message: 'You must provide a Remark' }); // Return error
                    } else {
                                //Check if UserID was provided
                                if(!req.body.UserID) {
                                    res.json({ success: false, message: 'You must provide User id!'});
                                } else {

                                    //Check if StudentNumber already exist
                                    var StudentNumber = reqObj.StudentNumber;
                                    console.log("Student Number:" + StudentNumber);
                                    conn.query('select * from triune_origin_school_details u where u.StudentNumber = ?', [StudentNumber], function(err, rows, fields) {
                                        if (err) {
                                            console.error('SQL error: ', err);
                                            return next(err);
                                        }
                                        console.log("StudentNumber Exist: " + rows);

                                    
                                    if(rows != '') {
                                        res.json({ success: false, message: 'StudentNumber already exist!!!'});
                                    } else {
                                        var insertSql = "INSERT INTO triune_origin_school_details SET ?";
                                        var insertValues = {
                                        "StudentNumber" : reqObj.StudentNumber,
                                        "DetailID" : reqObj.DetailID,
                                        "Remark" : reqObj.Remark, 
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
    router.post('/getOriginSchoolDetail', function(req, res, next) {
        try {
            
                var UserID = req.body.UserID;
                console.log("User ID: " + UserID);
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_origin_school_details u where u.UserID = ?', [UserID], function(err, rows, fields) {
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
    router.get('/getOriginSchoolDetails', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_origin_school_details', function(err, rows, fields) {
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
  router.delete('/deleteOriginSchoolDetail/:ID', (req, res, next) => {
    try {
            var ID = req.params.ID;
            console.log(ID);
            req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('delete from triune_origin_school_details  where ID = ?', [ID], function(err, rows, fields) {
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
     router.post('/updateOriginSchoolDetail', function(req, res, next) {
        try {
            
                var Remark = req.body.Remark;
                var ID = req.body.ID;

                console.log("Remark: " + Remark);
                console.log("ID: " + ID);

                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_origin_school_details set Remark = ? WHERE ID = ?', [Remark, ID], function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({ success: true, message: 'Remark updated'});
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