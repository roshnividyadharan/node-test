

const pg = require('pg');
const Promise = require('promise');
// const logfileImport = require('../log/logFile');

class pgConnection {
    constructor() {
        this.dbConnection = new pg.Pool({
            user: 'postgres',
            database: 'user',
            password: 'sa',
            host: 'localhost',
            port: '8080'
        });
    }
    dbQueryexecution(query, queryParams) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.dbConnection.query(query, queryParams, (err, res) => {
                if (res.rowCount) {
                    resolve(res);
                }
                else {
                    reject(err);
                }
            });

        });
    }

}
module.exports = pgConnection;