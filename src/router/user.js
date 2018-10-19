const express = require('express');//loading express module
const routerUser = express.Router();
const fs = require('fs');
const userService = require('../services/userServices');
const userServiceobj = new userService();



/**
 * code for fetching details to user home page
 */
routerUser.post('/userhome', (req, resp) => {
    // var userObj = {
    //     'id': req.body.id
    // };
    var returnuhome = userServiceobj.userhomeService(req);
    returnuhome.then((res) => {
        if (res) {
            resp.send(res);
        }
        else {
            resp.send(false);
        }
    });
    returnuhome.catch(() => {
        resp.send(false);
    });




});
/**
 * code to edit the details and update
 */
routerUser.post('/edit', (req, resp) => {
    var returnuedit = userServiceobj.userEdit(req);
    returnuedit.then((res) => {

        if (res) {
            resp.send(res);
        }
        else {
            resp.send(false);
        }
    });
    returnuedit.catch(() => {
        resp.send(false);
    });




});
/**
 * code to update everything except password
 */
routerUser.post('/edit_all', (req, resp) => {
    var returnuEditall = userServiceobj.userEditall(req);
    returnuEditall.then((res) => {
        if (res) {
            resp.send(res);
        }
        else {
            resp.send(false);
        }
    });
    returnuEditall.catch(() => {
        resp.send(false);
        
    });


});
/**
 * code to add image
 */
routerUser.post('/imgUpload', (req, response) => {
    var id = req.body.id;
    var img = req.body.iMage;
    var path = './public/images/' + id + '.jpg';
    var data = img.replace(/^data:image\/\w+;base64,/, '');
    var buf = new Buffer(data, 'base64');
    fs.writeFile(path, buf);
    response.send(true);
});
/**
 * code to check if username already exists or not
 */
routerUser.post('/checkuname', (req, res) => {
    var returnCheck = userServiceobj.checkUsername(req);
    returnCheck.then((statusuCheck) => {
        if (!statusuCheck) {

            res.send(false);
        }
        else {
            res.send(true);
        }
    });
    returnCheck.catch(() => {
        res.send(true);
    });


});
module.exports = routerUser;
