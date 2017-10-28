const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {


    /* ===============================================================
      GET USER SPECIFIC PRIVILEGES
    =============================================================== */
    router.get('/getUserSpecificPrivileges/:UserID/:OrgCode/:GroupSystemID',  (req, res, next) => {
        try {

            var UserID = req.params.UserID;
            var OrgCode = req.params.OrgCode;
            var GroupSystemID = req.params.GroupSystemID;

            console.log(UserID);

            var queryString = "SELECT DISTINCT concat( triune_code_description.Description, ' > ',  REVERSE(SUBSTR(REVERSE(triune_user_privilege.DataElementID), 1+LOCATE('-', REVERSE(triune_user_privilege.DataElementID)))) ) FROM ";
            queryString += queryString = "triune_user_privilege ";
            queryString += queryString = "LEFT JOIN triune_code_description ON triune_user_privilege.SourceSystemID = triune_code_description.`Code` ";
            queryString += queryString = "WHERE triune_user_privilege.UserID = ? AND ";
            queryString += queryString = "triune_user_privilege.OrgCode = ? AND  triune_user_privilege.GroupSystemID = ?"

            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query(queryString, [UserID, OrgCode, GroupSystemID], function (err, rows, fields) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        var resUserPrivilege = [];
                        for (var userPrivilegeIndex in rows) {
                            var userPrivilegeObj = rows[userPrivilegeIndex];
                            resUserPrivilege.push(userPrivilegeObj);
                        }
                        res.json(resUserPrivilege);
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