const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {
    /* ===============================================================
      INSERT BUILDING
    =============================================================== */
    router.post('/createBuilding', function (req, res, next) {
        var Password = null;
        var UserID = null;
        try {
            var reqObj = req.body;
            console.log(reqObj);
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    //Check if BuildingCode was provided
                    if (!req.body.BuildingCode) {
                        res.json({ success: false, message: 'You must provide building code!' }); // Return error
                    } else {
                        //Check if BuildingName was provided
                        if (!req.body.BuildingName) {
                            res.json({ success: false, message: 'You must provide a building name!' }); //Return an error
                        } else {
                            //Check if LocationCode was provided
                            if (!req.body.LocationCode) {
                                res.json({ success: false, message: 'You must provide a location code' }); // Return error
                            } else {
                                //Check if BuildingCode already exist
                                var BuildingCode = reqObj.BuildingCode;
                                console.log("Building Code:" + BuildingCode);
                                conn.query('select * from triune_building u where u.BuildingCode = ?', [BuildingCode], function (err, rows, fields) {
                                    if (err) {
                                        console.error('SQL error: ', err);
                                        return next(err);
                                    }
                                    console.log("Building Code Exist: " + rows);


                                    if (rows != '') {
                                        res.json({ success: false, message: 'Building Code already exist!!!' });
                                    } else {
                                        var insertSql = "INSERT INTO triune_building SET ?";
                                        // Apply encryption
                                        Password = reqObj.Password;
                                        //console.log("Password: " + Password);
                                        bcrypt.hash(Password, null, null, (err, hash) => {
                                            if (err) return next(err); // Ensure no errors
                                            Password = hash; // Apply encryption to password
                                            console.log("HASH : " + hash);
                                            console.log("HASH PASSWORD: " + Password);

                                            var insertValues = {
                                                "BuildingCode": reqObj.BuildingCode,
                                                "BuildingName": reqObj.BuildingName,
                                                "LocationCode": reqObj.LocationCode,
                                                "UserID": reqObj.UserID
                                            };
                                            var query = conn.query(insertSql, insertValues, function (err, result) {
                                                if (err) {
                                                    console.error('SQL error: ', err);
                                                    return next(err);
                                                }
                                                console.log("result: " + result);
                                                console.log("insertvalues: " + insertValues);
                                                //var ID = result.ID;
                                                res.json({ success: true });
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
            });
        } //try
        catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    });




    /* ===============================================================
      GET BUILDING
    =============================================================== */
    router.post('/getBuilding', function (req, res, next) {
        try {

            var ID = req.body.ID;
            console.log("ID: " + ID);
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_building u where u.ID = ?', [ID], function (err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        var resEmp = [];
                        for (var empIndex in rows) {
                            var empObj = rows[empIndex];
                            resEmp.push(empObj);
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
      GET ALL BUILDINGS
    =============================================================== */
    router.get('/getBuildings', function (req, res, next) {
        try {
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_building', function (err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        var resEmp = [];
                        for (var empIndex in rows) {
                            var empObj = rows[empIndex];
                            resEmp.push(empObj);
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
       DELETE BUILDING
    =============================================================== */
    router.delete('/deleteBuilding/:ID', (req, res, next) => {
        try {
            var ID = req.params.ID;
            console.log(ID);
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('delete from triune_building  where ID = ?', [ID], function (err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({ "ID": ID, success: true });
                    });
                }
            });
        } catch (ex) {
            console.error("Internal error:" + ex);
            return next(ex);
        }
    });



    /* ===============================================================
      UPDATE BUILDING
    =============================================================== */
    router.post('/updateBuilding', function (req, res, next) {
        try {

            var BuildingCode = req.body.BuildingCode;
            var ID = req.body.ID;

            console.log("BuildingCode: " + BuildingCode);
            console.log("ID: " + ID);

            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_building set BuildingCode = ? WHERE ID = ?', [BuildingCode, ID], function (err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({ success: true, message: 'Building code updated' });
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