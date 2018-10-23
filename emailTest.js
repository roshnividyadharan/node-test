const Promise = require('promise');
const pgConnection = require('./dao/pgdao');
const logfileImport=require('./log/logFile');
class Mailtest extends pgConnection {
    getEmails() {
        return new Promise((resolve, reject) => {
            let getEmailQuery = 'SELECT u_email FROM u_details';
            this.dbQueryexecution(getEmailQuery).then((res) => {
                if (res.rows.length <= 0) {
                    reject(false);
                    return;
                }
                resolve(res);
            }).catch((err) => {
                if (err) {
                    let message = ' error in mailservices file on getmail function';
                    let timeStamp = new Date();
                    logfileImport.emit('error', message, timeStamp, err);
                }
                reject(false);
            });
        });
    }
}
module.exports = Mailtest;


