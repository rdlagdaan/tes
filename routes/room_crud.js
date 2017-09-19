const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {
    /* ===============================================================
      INSERT ROOM
    =============================================================== */
    router.post('/createRoom', function (req, res, next) {
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
                    //Check if RoomNo was provided
                    if (!req.body.RoomNo) {
                        res.json({ success: false, message: 'You must provide Room No!' }); // Return error
                    } else {
                        //Check if Floor was provided
                        if (!req.body.Floor) {
                            res.json({ success: false, message: 'You must provide a floor!' }); //Return an error
                        } else {
                            //Check if Building was provided
                            if (!req.body.Building) {
                                res.json({ success: false, message: 'You must provide a building name' }); // Return error
                            } else {
                                //Check if RoomNo already exist
                                var RoomNo = reqObj.RoomNo;
                                console.log("Room No:" + RoomNo);
                                conn.query('select * from triune_room u where u.RoomNo = ?', [RoomNo], function (err, rows, fields) {
                                    if (err) {
                                        console.error('SQL error: ', err);
                                        return next(err);
                                    }
                                    console.log("Room No Exist: " + rows);


                                    if (rows != '') {
                                        res.json({ success: false, message: 'Room No already exist!!!' });
                                    } else {
                                        var insertSql = "INSERT INTO triune_room SET ?";
                                        // Apply encryption
                                        Password = reqObj.Password;
                                        //console.log("Password: " + Password);
                                        bcrypt.hash(Password, null, null, (err, hash) => {
                                            if (err) return next(err); // Ensure no errors
                                            Password = hash; // Apply encryption to password
                                            console.log("HASH : " + hash);
                                            console.log("HASH PASSWORD: " + Password);

                                            var insertValues = {
                                                "RoomNo": reqObj.RoomNo,
                                                "Floor": reqObj.Floor,
                                                "Building": reqObj.Building,
                                                "RoomType": reqObj.RoomType,
                                                "InCampus": reqObj.InCampus,
                                                "Remarks": reqObj.Remarks,
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
      GET ROOM
    =============================================================== */
    router.post('/getRoom', function (req, res, next) {
        try {

            var RoomNo = req.body.RoomNo;
            console.log("ID: " + ID);
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_room u where u.ID = ?', [ID], function (err, rows, fields) {
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
      GET ALL ROOMS
    =============================================================== */
    router.get('/getRooms', function (req, res, next) {
        try {
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from triune_room', function (err, rows, fields) {
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
       DELETE ROOM
    =============================================================== */
    router.delete('/deleteRoom/:ID', (req, res, next) => {
        try {
            var ID = req.params.ID;
            console.log(ID);
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('delete from triune_room  where ID = ?', [ID], function (err, rows, fields) {
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
      UPDATE ROOM
    =============================================================== */
    router.post('/updateRoom', function (req, res, next) {
        try {

            var RoomNo = req.body.RoomNo;
            var ID = req.body.ID;

            console.log("RoomNo: " + RoomNo);
            console.log("ID: " + ID);

            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('UPDATE triune_room set RoomNo = ? WHERE ID = ?', [RoomNo, ID], function (err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        res.json({ success: true, message: 'Room No updated' });
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