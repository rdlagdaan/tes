const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const url = require('url');

module.exports = (router) => {


    /* ===============================================================
      GET USER MODULE PRIVILEGES
    =============================================================== */
    router.get('/getUserModulePrivileges/:UserID/:OrgCode/:GroupSystemID',  (req, res, next) => {
        try {

            var UserID = req.params.UserID;
            var OrgCode = req.params.OrgCode;
            var GroupSystemID = req.params.GroupSystemID;

            console.log(UserID);

            var queryString = "SELECT DISTINCT concat( triune_code_description.Code, '>',  REVERSE(SUBSTR(REVERSE(triune_user_privilege.DataElementID), 1+LOCATE('-', REVERSE(triune_user_privilege.DataElementID)))) ) as Modules FROM ";
            queryString += queryString = "triune_user_privilege ";
            queryString += queryString = "LEFT JOIN triune_code_description ON triune_user_privilege.SourceSystemID = triune_code_description.`Code` ";
            queryString += queryString = "WHERE triune_user_privilege.UserID = ? AND ";
            queryString += queryString = "triune_user_privilege.OrgCode = ? AND  triune_user_privilege.GroupSystemID = ? ";
            queryString += queryString = "ORDER BY Modules ASC "
            
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




    /* ===============================================================
      GET USER GROUP PRIVILEGES
    =============================================================== */
    router.get('/getUserGroupPrivileges/:UserID/:OrgCode',  (req, res, next) => {
        try {

            var UserID = req.params.UserID;
            var OrgCode = req.params.OrgCode;

            console.log(UserID);

            var queryString = "SELECT DISTINCT triune_code_description.`Code`, triune_code_description.Description FROM ";
            queryString += queryString = "triune_code_description ";
            queryString += queryString = "INNER JOIN triune_user_privilege ON triune_user_privilege.GroupSystemID = triune_code_description.`Code` ";
            queryString += queryString = "WHERE triune_user_privilege.OrgCode = ? AND triune_user_privilege.UserID = ? ";
            queryString += queryString = "ORDER BY triune_code_description.Description ASC "
            
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query(queryString, [OrgCode, UserID], function (err, rows, fields) {
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


    
    /* ===============================================================
      GET USER MENU PRIVILEGES
    =============================================================== */
    router.get('/getUserMenuPrivileges/:UserID/:OrgCode/:groupSystemID/:sourceSystemID/:dataElementID',  (req, res, next) => {
        try {

            var UserID = req.params.UserID;
            var OrgCode = req.params.OrgCode;
            var groupSystemID = req.params.groupSystemID;
            var sourceSystemID = req.params.sourceSystemID;
            var dataElementID = req.params.dataElementID;
            
            console.log(UserID);
            console.log(OrgCode);
            console.log(groupSystemID);
            console.log(sourceSystemID);
            console.log(dataElementID);
            

            var queryString = "SELECT DISTINCT triune_user_privilege.ElementValueID, triune_user_privilege.OrgCode, triune_user_privilege.GroupSystemID, triune_user_privilege.SourceSystemID, triune_user_privilege.DataElementID FROM triune_user_privilege WHERE ";
            queryString += queryString = "triune_user_privilege.OrgCode = ? AND ";
            queryString += queryString = "triune_user_privilege.GroupSystemID = ? AND ";
            queryString += queryString = "triune_user_privilege.SourceSystemID = ? AND ";
            queryString += queryString = "triune_user_privilege.DataElementID = ? AND ";
            queryString += queryString = "triune_user_privilege.UserID = ? ";
            queryString += queryString = "ORDER BY triune_user_privilege.ElementValueID ASC ";
            
            
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query(queryString, [OrgCode, groupSystemID, sourceSystemID, dataElementID, UserID], function (err, rows, fields) {
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