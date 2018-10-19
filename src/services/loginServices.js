const bcrypt = require('bcrypt');//to encrypt passwords
const Promise = require('promise');
const pgConnection = require('../../dao/pgdao');
const logfileImport = require('../../log/logFile');

/**
 * class for all login services
 */
class LoginService extends pgConnection {
    /**
     * function for user login
     * @param {*} logObj 
     */
    login(logObj) {
        let useRpassword = logObj.body.password;

        let params = [logObj.body.username, logObj.body.password];
        let self = this;
       
        return new Promise((resolve, reject) => {
            let loginQuery = 'SELECT * FROM u_details WHERE u_name=$1';
            try {
                self.dbQueryexecution(loginQuery, [params[0]]).then((res) => {
                    if (res) {
                        bcrypt.compare(useRpassword, res.rows[0].u_pswd, (err, response) => {
                            console.log(useRpassword);
                            console.log(res.rows[0].u_pswd);
                            if (response) {
                                
                                var ob = {
                                    'id': res.rows[0].id,
                                    'usertype': res.rows[0].user_type,
                                    'stat': true
                                };
                                resolve(ob);
                                let message = 'working login query';
                                logfileImport.emit('info', message);
                            }
                            else {
                                
                                var statusCheck = false;
                                reject(statusCheck);
                                let message = 'error in login query';
                                logfileImport.emit('info', message);
                            }
                        });
                    }
                });
            } catch (error) {
                let message = 'exception in login query';
                logfileImport.emit('info', message);
            }

        });
    }
}
module.exports = LoginService;