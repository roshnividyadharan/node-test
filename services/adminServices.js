const Promise = require('promise');
const pgConnection = require('../dao/pgdao');
const logfileImport = require('../log/logFile');

/**
 * class for all admin services
 */
class AdminService extends pgConnection {
    /**
     * function for listing the users
     * @param {*} listObj 
     */
    adminList() {
        let listQuery;
        let resultlist;
        return new Promise((resolve, reject) => {
            listQuery = 'SELECT * FROM u_details';
            resultlist = this.dbQueryexecution(listQuery);
            try {
                resultlist.then((res) => {
                    if (res) {
                        let objlist = {
                            'count': res.rows.length,
                            'res': res.rows,
                            'stat': true
                        };
                        resolve(objlist);
                        let message = 'working list fetch query';
                        logfileImport.emit('info', message);
                    }
                    else {
                        let listStatus = false;
                        reject(listStatus);
                        let message = 'not working list fetch query';
                        logfileImport.emit('info', message);
                    }
                });
            } catch (error) {
                let message = 'exception list users fetch query';
                logfileImport.emit('info', message);
            }
        });
    }
    /**
     * function for deleting the users
     * @param {*} delObj 
     */
    adminDelete(delObj) {
        try {
            let check = delObj.body.check;
            let val = delObj.body.value;
            let i;
            let promises = [];
            let self = this;
            for (i = 0; i < check; i++) {
                let params = val[i];
                let delQuery = 'DELETE FROM u_details WHERE id=$1';
                let delResult = self.dbQueryexecution(delQuery, [params]);
                promises.push(delResult);
            }
            return Promise.all(promises);
        } catch (error) {
            let message = 'exception in delete';
            logfileImport.emit('info', message);
        }

    }
    /**
     * function for giving admin privilege
     * @param {*} changeObj 
     */
    adminChange(changeObj) {
        let changeQuery;
        let changeResult;
        let uType = 'admin';
        let changeStatus = true;
        let params = [uType, changeObj.body.id];
        return new Promise((resolve, reject) => {
            changeQuery = 'UPDATE u_details SET user_type=$1 WHERE id=$2';
            changeResult = this.dbQueryexecution(changeQuery, params);
            try {
                changeResult.then((res) => {
                    if (res) {
                        resolve(res);
                        let message = 'working admin change query';
                        logfileImport.emit('info', message);
                    }
                    else {
                        changeStatus = false;
                        reject(changeStatus);
                        let message = 'not working admin change query';
                        logfileImport.emit('info', message);
                    }
                });
            } catch (error) {
                let message = 'exception in admin change query';
                logfileImport.emit('info', message);
            }
        });
    }
}
module.exports = AdminService;