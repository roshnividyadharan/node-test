const bcrypt = require('bcrypt');//to encrypt passwords
const saltRounds = 12;
const Promise = require('promise');
const pgConnection = require('../../dao/pgdao');
const logfileImport = require('../../log/logFile');

/**
 * class for all register services
 */
class RegService extends pgConnection {
    /**
     * function for user registration
     * @param {*} regObj 
     */
    register(regObj) {

        let uPassword = regObj.body.password;
        let uType = 'user';
        let regQuery2;
        let regResult2;
        let status = true;
        let self = this;
        let params = [regObj.body.name, regObj.body.email, regObj.body.username, regObj.body.password, regObj.body.address, regObj.body.phone, uType];
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(uPassword, salt, (err, hash) => {
                    params[3] = hash;
                    regQuery2 = 'insert into u_details (name,u_email,u_name,u_pswd,u_addr,u_phone,user_type) values ($1,$2,$3,$4,$5,$6,$7)';
                    regResult2 = self.dbQueryexecution(regQuery2, params);
                    try {
                        regResult2.then((res) => {
                            if (res) {
                                resolve(status);
                                let message = 'working register query';
                                logfileImport.emit('info', message);

                            }
                           
                        }).catch(()=>{
                            status = false;
                            reject(status);
                            let message = 'error in register query';
                            logfileImport.emit('info', message); 
                        });
                    } catch (error) {
                        let message = 'exception in register query';
                        logfileImport.emit('info', message);
                    }
                });
            });
        });
    }
    checkUsername(checkObj) {
        let checkQuery;
        let checkResult;
        let statusuCheck = false;
        let params = [checkObj.body.username];
        let self = this;
        return new Promise((resolve, reject) => {
            checkQuery = 'SELECT count(*) FROM u_details WHERE u_name=$1';
            checkResult = self.dbQueryexecution(checkQuery, params);
            try {
                checkResult.then((res) => {
                    if (res.rows[0].count > 0) {
                        resolve(statusuCheck);
                        let message = 'username check working';
                        logfileImport.emit('info', message);


                    }
                }).catch(()=>{
                    statusuCheck = true;
                    reject(statusuCheck);
                    let message = 'username check not working';
                    logfileImport.emit('info', message);
                });
            } catch (error) {
                let message = 'exception in username check ';
                logfileImport.emit('info', message);            }
        });
    }
}
module.exports = RegService;
