const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {
  /* ===============================================================
    INSERT SCHOOL NAME
  =============================================================== */
    router.post('/createSchoolName', function(req,res,next){
        var UserID = null;
    try{
        var reqObj = req.body;        
        console.log(reqObj);
        req.getConnection(function(err, conn){
        if(err) {
            console.error('SQL Connection error: ', err);
            return next(err);
        } else {
                //Check if SchoolName was provided
                if(!req.body.SchoolName) {
                    res.json( {success: false, message: 'You must provide a SchoolName'}); //Return an error
                } else {
                    //Check if Location was provided
                    if (!req.body.Location) {
                        res.json({ success: false, message: 'You must provide a Location' }); // Return error
                    } else {
                        //Check if RegionID was provided
                        if(!req.body.RegionID) {
                            res.json({ success: false, message: 'You must provide RegionID!'});
                        } else {
                            //Check if ProvinceID was provided
                            if(!req.body.ProvinceID) {
                                res.json({ success: false, message: 'You must provide ProvinceID!'});
                            } else {
                                //Check if CityID was provided
                                if(!req.body.CityID) {
                                    res.json({ success: false, message: 'You must provide CityID!'});
                                } else {
                                    //Check if IsForeign was provided
                                    if(!req.body.IsForeign) {
                                        res.json({ success: false, message: 'You must provide IsForeign'});
                                    } else {
                                        //Check if IsPrivate was provided
                                        if(!req.body.IsPrivate) {
                                            res.json({ success: false, message: 'You must provide IsPrivate!'});
                                        } else {

                                    //Check if UserID already exist
                                    var SchoolName = reqObj.SchoolName;
                                    console.log("School Name:" + SchoolName);
                                    conn.query('select * from triune_school_name u where u.SchoolName = ?', [SchoolName], function(err, rows, fields) {
                                        if (err) {
                                            console.error('SQL error: ', err);
                                            return next(err);
                                        }
                                        console.log("SchoolName Exist: " + rows);

                                    
                                    if(rows != '') {
                                        res.json({ success: false, message: 'SchoolName already exist!!!'});
                                    } else {
                                        var insertSql = "INSERT INTO triune_school_name SET ?";
                                        // Apply encryption
                                        //Password = reqObj.Password;
                                        //console.log("Password: " + Password);
                                        //bcrypt.hash(Password, null, null, (err, hash) => {
                                            //if (err) return next(err); // Ensure no errors
                                            //Password = hash; // Apply encryption to password
                                            //console.log("HASH : " + hash);
                                            //console.log("HASH PASSWORD: " + Password);

                                        var insertValues = {
                                        "SchoolName" : reqObj.SchoolName,
                                        "Location" : reqObj.Location,
                                        "RegionID" : reqObj.RegionID, 
                                        "ProvinceID" : reqObj.ProvinceID,
                                        "CityID" : reqObj.CityID,
                                        "IsForeign" : reqObj.IsForeign,
                                        "IsPrivate" : reqObj.IsPrivate };
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
                                        console.log("Values: " + reqObj.CityID);



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
    router.post('/getSchoolName', function(req, res, next) {
        try {
            
                var SchoolName = req.body.SchoolName;
                console.log("School Name: " + SchoolName);
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_school_name u where u.SchoolName = ?', [SchoolName], function(err, rows, fields) {
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
    router.get('/getSchools', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_school_name', function(err, rows, fields) {
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
  router.delete('/deleteSchool/:ID', (req, res, next) => {
    try {
            var ID = req.params.ID;
            console.log(ID);
            req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('delete from triune_school_name  where ID = ?', [ID], function(err, rows, fields) {
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
    router.post('/updateSchool', function(req, res, next) {
        try {
            
                var SchoolName = req.body.SchoolName;
                var ID = req.body.ID;

                console.log("SchoolName: " + SchoolName);
                console.log("ID: " + ID);

                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_school_name set SchoolName = ? WHERE ID = ?', [SchoolName, ID], function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({ success: true, message: 'School Name updated'});
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