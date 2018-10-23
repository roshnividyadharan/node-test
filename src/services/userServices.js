const bcrypt = require('bcrypt');//to encrypt passwords
const saltRounds = 12;
const Promise = require('promise');
const pgConnection = require('../../dao/pgdao');
const logfileImport = require('../../log/logFile');

/**
 * class for all user services
 */
class UserService extends pgConnection {
    /**
     * function for displaying the details in user home pag
     * @param {*} userObj 
     */
    userhomeService(userObj) {
        let params = [userObj.body.id];
        let self = this;
        return new Promise(function (resolve, reject) {
            let userhomeQuery = 'SELECT * FROM u_details WHERE id=$1';
            try {
                self.dbQueryexecution(userhomeQuery, params).then((res) => {
                    if (res) {
                        resolve(res);
                        let message = 'working user details fetch query';
                        logfileImport.emit('info', message);
                    }
                    
                }).catch(()=>{
                    let status = false;
                    reject(status);
                    let message = 'error in user details fetch query';
                    logfileImport.emit('info', message);
                });
            } catch (error) {
                let message = 'exception in user details fetch query';
                logfileImport.emit('info', message);
            }

        });
    }
    /**
     * function for updating all fields
     * @param {*} uEditobj 
     */
    userEdit(uEditobj) {
        let useRPassword = uEditobj.body.password;
        let params = [uEditobj.body.name, uEditobj.body.username, uEditobj.body.password, uEditobj.body.email, uEditobj.body.address, uEditobj.body.phone, uEditobj.body.id];
        let self = this;
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(useRPassword, salt, (err, hash) => {
                    params[2] = hash;
                    let usereditQuery = 'UPDATE u_details SET name=$1,u_name=$2,u_pswd=$3,u_email=$4,u_addr=$5,u_phone=$6 WHERE id=$7';
                    try {
                        self.dbQueryexecution(usereditQuery, params).then((res) => {
                            if (res) {
                                resolve(res);
                                let message = 'working user details edit query';
                                logfileImport.emit('info', message);
                            }
                        }).catch(()=>{
                            let statusEdit = false;
                            reject(statusEdit);
                            let message = 'error in user details edit query';
                            logfileImport.emit('info', message);
                        });
                    } catch (error) {
                        let message = 'exception in user details fetch query';
                        logfileImport.emit('info', message);
                    }

                });
            });
        });
    }
    /**
     * function for editing everything except password
     * @param {*} uEditallobj 
     */
    userEditall(uEditallobj) {
        let self = this;
        let params = [uEditallobj.body.name, uEditallobj.body.username, uEditallobj.body.email, uEditallobj.body.address, uEditallobj.body.phone, uEditallobj.body.id];
        return new Promise((resolve, reject) => {
            let usereditallQuery = 'UPDATE u_details SET name=$1,u_name=$2,u_email=$3,u_addr=$4,u_phone=$5 WHERE id=$6';
            try {
                self.dbQueryexecution(usereditallQuery, params).then((res) => {
                    if (res) {
                        resolve(res);
                        let message = 'working user details edit excluding password ';
                        logfileImport.emit('info', message);
                    }
                }).catch(()=>{
                    let statusEditall = false;
                    reject(statusEditall);
                    let message = 'error in user details edit excluding password';
                    logfileImport.emit('info', message);
                });
            } catch (error) {
                let message = 'exception in user details edit excluding password';
                logfileImport.emit('info', message);
            }
        });
    }
    /**
     * function for checking whether the username exists or not
     * @param {*} checkObj 
     */
    checkUsername(checkObj) {
        let statusuCheck = false;
        let params = [checkObj.body.username];
        let self = this;
        return new Promise((resolve, reject) => {
            let checkQuery = 'SELECT count(*) FROM u_details WHERE u_name=$1';
            try {
                self.dbQueryexecution(checkQuery, params).then((res) => {
                    if (res.rows[0].count > 0) {
                        resolve(statusuCheck);
                        let message = 'working check username ';
                        logfileImport.emit('info', message);
                    }
                }).catch(()=>{
                    statusuCheck = true;
                    reject(statusuCheck);
                    let message = 'not working check username ';
                    logfileImport.emit('info', message);
                });
            } catch (error) {
                let message = 'exxception in  check username ';
                logfileImport.emit('info', message);
            }

        });
    }
}
module.exports = UserService;