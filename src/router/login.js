const express = require('express');//loading express module
const routerLogin = express.Router();
const loginService = require('../services/loginServices');
const loginServiceobj = new loginService();


/**
 * code for login
 */

routerLogin.post('/', (req, response) => {
    var ret = loginServiceobj.login(req);
    ret.then((res) => {
        if (res.stat) {
            response.send(res);
        }
        else {
            response.send(false);
        }
    });
    ret.catch(() => {
        response.send(false);
    });

});
module.exports = routerLogin;