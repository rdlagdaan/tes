const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {
  /* ===============================================================
    INSERT CLASS
  =============================================================== */
    router.post('/createClassList', function(req,res,next){
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
                res.json({ success: false, message: 'You must provide an student number!' }); // Return error
            } else {
                //Check if SY was provided
                if(!req.body.SY) {
                    res.json( {success: false, message: 'You must provide a school year!'}); //Return an error
                } else {
                    //Check if Sem was provided
                    if (!req.body.Sem) {
                        res.json({ success: false, message: 'You must provide a Sem' }); // Return error
                    } else {
                        //Check if ParentSection was provided
                        if(!req.body.ParentSection) {
                            res.json({ success: false, message: 'You must provide ParentSection!'});
                        } else {
                            //Check if SecttionCode was provided
                            if(!req.body.SecttionCode) {
                                res.json({ success: false, message: 'You must provide SecttionCode!'});
                            } else {
                                //Check if ESubjectCode was provided
                                if(!req.body.ESubjectCode) {
                                    res.json({ success: false, message: 'You must provide ESubjectCode!'});
                                } else {
                                        //Check if SubjectCode was provided
                                    if(!req.body.SubjectCode) {
                                        res.json({ success: false, message: 'You must provide SubjectCode!'});
                                    } else {
                                                //Check if GradeStatus was provided
                                        if(!req.body.GradeStatus) {
                                            res.json({ success: false, message: 'You must provide GradeStatus!'});
                                        } else {
                                                //Check if FinalGrade was provided
                                            if(!req.body.FinalGrade) {
                                                res.json({ success: false, message: 'You must provide FinalGrade!'});
                                            } else {
                                                        //Check if ComputedFinalGrade was provided
                                                if(!req.body.ComputedFinalGrade) {
                                                    res.json({ success: false, message: 'You must provide ComputedFinalGrade!'});
                                                } else {
                                                        //Check if IsPosted was provided
                                                    if(!req.body.IsPosted) {
                                                        res.json({ success: false, message: 'You must provide IsPosted!'});
                                                    } else {
                                                                //Check if UserID was provided
                                                        if(!req.body.UserID) {
                                                            res.json({ success: false, message: 'You must provide UserID!'});
                                                        } else {
                                                                    //Check if ReExam was provided
                                                            if(!req.body.ReExam) {
                                                                res.json({ success: false, message: 'You must provide ReExam!'});
                                                            } else {
                                                                        //Check if RemarksID was provided
                                                                if(!req.body.RemarksID) {
                                                                    res.json({ success: false, message: 'You must provide RemarksID!'});
                                                                } else {
                                                                            //Check if IsTransFeree was provided
                                                                    if(!req.body.IsTransFeree) {
                                                                        res.json({ success: false, message: 'You must provide IsTransFeree!'});
                                                                    } else {
                                                                                    //Check if TransfereeID was provided
                                                                        if(!req.body.TransfereeID) {
                                                                            res.json({ success: false, message: 'You must provide TransfereeID!'});
                                                                        } else {
                                                                                //Check if SORTING was provided
                                                                            if(!req.body.SORTING) {
                                                                                res.json({ success: false, message: 'You must provide SORTING!'});
                                                                            } else {
                                                                                    //Check if isNotDeleted was provided
                                                                                if(!req.body.isNotDeleted) {
                                                                                    res.json({ success: false, message: 'You must provide isNotDeleted!'});
                                                                                } else {
                                                                                        //Check if SchoolID was provided
                                                                                    if(!req.body.SchoolID) {
                                                                                        res.json({ success: false, message: 'You must provide SchoolID!'});
                                                                                    } else {

                                    //Check if StudentNumber already exist
                                    var StudentNumber = reqObj.StudentNumber;
                                    console.log("Student Number:" + StudentNumber);
                                    conn.query('select * from triune_class_list u where u.StudentNumber = ?', [StudentNumber], function(err, rows, fields) {
                                        if (err) {
                                            console.error('SQL error: ', err);
                                            return next(err);
                                        }
                                        console.log("StudentNumber Exist: " + rows);

                                    
                                    if(rows != '') {
                                        res.json({ success: false, message: 'StudentNumber already exist!!!'});
                                    } else {
                                        var insertSql = "INSERT INTO triune_class_list SET ?";
                                        // Apply encryption
                                        //Password = reqObj.Password;
                                        //console.log("Password: " + Password);
                                        //bcrypt.hash(Password, null, null, (err, hash) => {
                                            //if (err) return next(err); // Ensure no errors
                                            //Password = hash; // Apply encryption to password
                                            //console.log("HASH : " + hash);
                                            //console.log("HASH PASSWORD: " + Password);

                                        var insertValues = {
                                        "StudentNumber" : reqObj.StudentNumber,
                                        "SY" : reqObj.SY,
                                        "Sem" : reqObj.Sem,
                                        "ParentSection" : reqObj.ParentSection, 
                                        "SecttionCode" : reqObj.SecttionCode,
                                        "ESubjectCode" : reqObj.ESubjectCode,
                                        "SubjectCode" : reqObj.SubjectCode,
                                        "GradeStatus" : reqObj.GradeStatus,
                                        "FinalGrade" : reqObj.FinalGrade,
                                        "ComputedFinalGrade" : reqObj.ComputedFinalGrade,
                                        "IsPosted" : reqObj.IsPosted,
                                        "UserID" : reqObj.UserID,
                                        "ReExam" : reqObj.ReExam,
                                        "RemarksID" : reqObj.RemarksID,
                                        "IsTransFeree" : reqObj.IsTransFeree,
                                        "TransfereeID" : reqObj.TransfereeID,
                                        "SORTING" : reqObj.SORTING,
                                        "isNotDeleted" : reqObj.isNotDeleted,
                                        "SchoolID" : reqObj.SchoolID };
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
                            }
                        } 
                    }
                }
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
    GET CLASS LIST
  =============================================================== */
    router.post('/getClassList', function(req, res, next) {
        try {
            
                var UserID = req.body.UserID;
                console.log("User ID: " + UserID);
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_class_list u where u.UserID = ?', [UserID], function(err, rows, fields) {
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
    GET ALL CLASS
  =============================================================== */
    router.get('/getClassLists', function(req, res, next) {
        try {
                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_class_list', function(err, rows, fields) {
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
     DELETE CLASS
  =============================================================== */
  router.delete('/deleteClassList/:ID', (req, res, next) => {
    try {
            var ID = req.params.ID;
            console.log(ID);
            req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('delete from triune_class_list  where ID = ?', [ID], function(err, rows, fields) {
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
    router.post('/updateClassList', function(req, res, next) {
        try {
            
                var FinalGrade = req.body.FinalGrade;
                var ID = req.body.ID;

                console.log("Final Grade: " + FinalGrade);
                console.log("ID: " + ID);

                req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_class_list set FinalGrade = ? WHERE ID = ?', [FinalGrade, ID], function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({ success: true, message: 'Final Grade updated'});
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