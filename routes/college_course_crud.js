const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');
const datetime = require('node-datetime');

module.exports = (router) => {

/* ===============================================================
INSERT COLLEGE COURSE
=============================================================== */
router.post('/createCollegeCourse', function(req,res,next){
    var CourseCode = null;
    var ActiveFlag = 1;
    
    var timestamp = require('node-datetime');
    var ts = timestamp.create();
    var tsFormatted = ts.format('Y-m-d H:M:S');
    var TimeStamp = tsFormatted;

    try{
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

                                                //Check if CourseCode already exist
                                                CourseCode = req.body.CourseCode;
                                                console.log("CourseCode:" + CourseCode);
                                                conn.query('select CourseCode from triune_college_course u where u.CourseCode = ?', [CourseCode], function(err, rows, fields) {
                                                    if (err) {
                                                        console.error('SQL error: ', err);
                                                        return next(err);
                                                    }
                                                    console.log("CourseCode Exist: " + rows);

                                                
                                                    if(rows != '') {
                                                        res.json({ success: false, message: 'CourseCode already exist!!!'});
                                                    } else {
                                                        var insertSql = "INSERT INTO triune_college_course SET ?";
                                                        var insertValues = {
                                                            "CourseGroup" : req.body.CourseGroup,
                                                            "CourseCode" : req.body.CourseCode,
                                                            "Department" : req.body.Department, 
                                                            "GroupID" : req.body.GroupID,
                                                            "CourseDescription" : req.body.CourseDescription,
                                                            "CourseAbbreviation" : req.body.CourseAbbreviation,
                                                            "ActiveFlag" : ActiveFlag,
                                                            "TimeStamp" : TimeStamp,
                                                            "UserID" : req.body.UserID };
  
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

                                                    } // if(rows != '')
                                                });

                                            } //if(!req.body.UserID)
                                    } //if(!req.body.CourseAbbreviation)
                                } //if(!req.body.CourseDescription)
                            } //if(!req.body.GroupID)
                        } // if(!req.body.Department)
                    } //if (!req.body.CourseCode) 
                } //if(!req.body.CourseGroup)
            } //if(err)
        }); //req.getConnection(function(err, conn)
    } //try
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
}});




/* ===============================================================
GET COLLEGE COURSE
  =============================================================== */
router.post('/getCollegeCourse', function(req, res, next) {
    try {
            var CourseCode = req.body.CourseCode;
            console.log("CourseCode: " + CourseCode);
            req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_college_course u where u.CourseCode = ?', [CourseCode], function(err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        var resRows = [];
                        for (var rowsIndex in rows) {
                            var rowsObj = rows[rowsIndex ];
                            resRows .push(rowsObj);
                        }
                        res.json(resRows);
                    });
                } // if (err)
            });
        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        } //try
});




/* ===============================================================
GET ALL COLLEGE COURSES
=============================================================== */
router.get('/getCollegeCourses', function(req, res, next) {
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
                    var resRows = [];
                    for (var rowsIndex in rows) {
                        var rowsObj = rows[rowsIndex ];
                        resRows .push(rowsObj);
                    }
                    res.json(resRows);
                    });
                }
            });
        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        } //try
    });



/* ===============================================================
DELETE COLLEGE COURSE
=============================================================== */
router.delete('/deleteCollegeCourse/:ID', (req, res, next) => {
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
UPDATE COLLEGE COURSE
=============================================================== */
router.post('/updateCollegeCourse', function(req, res, next) {
    try {

            req.getConnection(function(err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_college_course set CourseDescription = ? WHERE ID = ?', [req.body.CourseDescription, req.body.ID], function(err, rows, fields) {
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
    } //try
});

  return router; // Return router object to main index.js
}