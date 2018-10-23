const express = require('express');//loading express module
const routerAdmin = express.Router();
const AdminService = require('../services/adminServices');
const adminServiceobj = new AdminService();

/**
 * code to list users in admin page
 */
routerAdmin.post('/listuser', (req, respond) => {
    var returnList = adminServiceobj.adminList(req);
    returnList.then((res) => {
        if (res.stat) {
            respond.send(res);
        }
        else {
            respond.send(false);
        }
    }).catch((listStatus) => {
        if (!listStatus) {
            respond.send(false);
        }
    });
});
/**
 * code to delete multiple and single users
 */
routerAdmin.post('/deluser', (req, responses) => {

    var returnDelete = adminServiceobj.adminDelete(req);
    returnDelete.then((res) => {
        console.log('admninnnnnnnnnnnnnnnnnnnnnnnnnnn');
        console.log(res);
        if (res) {
            responses.send(res);
        }
        else {
            responses.send(false);
        }
    }).catch(() => {
        responses.send(false);
        
    });
});
/**
 * code to give admin privilege
 */
routerAdmin.post('/adminchange', (req, resp) => {
    var returnChange = adminServiceobj.adminChange(req);
    returnChange.then((res) => {
        if (res) {
            resp.send(res);
        }
        else {
            resp.send(false);
        }
    }).catch(() => {
        resp.send(false);
        
    });
});
module.exports = routerAdmin;