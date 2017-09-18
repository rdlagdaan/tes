const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {
  /* ===============================================================
    INSERT COLLEGE
  =============================================================== */
    router.post('/createCollege', function(req,res,next){
  
    try{
        var reqObj = req.body;        
        console.log(reqObj);
        req.getConnection(function(err, conn){
        if(err) {
            console.error('SQL Connection error: ', err);
            return next(err);
        } else {
                //Check if CollegeCode was provided
                if(!req.body.CollegeCode) {
                    res.json( {success: false, message: 'You must provide a College Code!'}); //Return an error
                } else {
                    //Check if DeptCode was provided
                    if (!req.body.DeptCode) {
                        res.json({ success: false, message: 'You must provide a Department Code' }); // Return error
                    } else {
                        //Check if CollegeName was provided
                        if(!req.body.CollegeName) {
                            res.json({ success: false, message: 'You must provide College Name!'});
                        } else {
                            //Check if GroupID was provided
                            if(!req.body.GroupID) {
                                res.json({ success: false, message: 'You must provide user Group ID!'});
                            } else {
                                //Check if CollegeDescription was provided
                                if(!req.body.CollegeDescription) {
                                    res.json({ success: false, message: 'You must provide College Description!'});
                                } else {
                                    //Check if CommonDescription was provided
                                if(!req.body.CommonDescription) {
                                    res.json({ success: false, message: 'You must provide Common Description!'});
                                } else {
                                     //Check if TimeStamp was provided
                                  //  if(!req.body.TimeStamp) {
                                 //       res.json({ success: false, message: 'You must provide Time Stamp!'});
                                  //  } else {
                                        //Check if UserID was provided
                                    if(!req.body.UserID) {
                                        res.json({ success: false, message: 'You must provide User ID!'});
                                    } else {

                                    //Check if UserID already exist
                                    var UserID = reqObj.UserID;
                                    console.log("User ID:" + UserID);
                                    conn.query('select * from triune_college u where u.UserID = ?', [UserID], function(err, rows, fields) {
                                        if (err) {
                                            console.error('SQL error: ', err);
                                            return next(err);
                                        }
                                        console.log("UserID Exist: " + rows);

                                    
                                    if(rows != '') {
                                        res.json({ success: false, message: 'UserID already exist!!!'});
                                    } else {
                                        var insertSql = "INSERT INTO triune_college SET ?";
                                        // Apply encryption
                                       //Password = reqObj.Password;
                                        //console.log("Password: " + Password);
                                        //bcrypt.hash(Password, null, null, (err, hash) => {
                                           // if (err) return next(err); // Ensure no errors
                                           // Password = hash; // Apply encryption to password
                                           // console.log("HASH : " + hash);
                                           // console.log("HASH PASSWORD: " + Password);

                                        var insertValues = {
                                        "CollegeCode" : reqObj.CollegeCode,
                                        "DeptCode" : reqObj.DeptCode,
                                        "CollegeName" : reqObj.CollegeName, 
                                        "GroupID" : reqObj.GroupID,
                                        "CollegeDescription" : reqObj.CollegeDescription,
                                        "CommonDescription" : reqObj.CommonDescription,
                                        "TimeStamp" : reqObj.TimeStamp,
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
           //}
        
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
    GET COLLEGE
  =============================================================== */
    router.post('/getCollege', function(req, res, next) {
        try {
            
                var UserID = req.body.UserID;
                console.log("User ID: " + UserID);
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_college u where u.UserID = ?', [UserID], function(err, rows, fields) {
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
    router.get('/getColleges', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_college', function(err, rows, fields) {
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
     DELETE COLLEGE
  =============================================================== */
  router.delete('/deleteCollege/:ID', (req, res, next) => {
    try {
            var ID = req.params.ID;
            console.log(ID);
            req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('delete from triune_college  where ID = ?', [ID], function(err, rows, fields) {
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
    UPDATE COLLEGE
  =============================================================== */
    router.post('/updateCollege', function(req, res, next) {
        try {
            
                var CollegeDescription = req.body.CollegeDescription;
                var ID = req.body.ID;

                console.log("CollegeDescription: " + CollegeDescription);
                console.log("ID: " + ID);

                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_college set CollegeDescription = ? WHERE ID = ?', [CollegeDescription, ID], function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({ success: true, message: 'College Description updated'});
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