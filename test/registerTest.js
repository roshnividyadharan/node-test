const registerService = require('../src/services/registerServices');
const regServiceobj = new registerService();
const assert = require('chai').assert;
const sinon = require('sinon');
/**
 * unit test for register services
 */

describe('checking the register function in registerServices', function () {
    let results = {};
    let dbResults = {
        rowCount: 1
    };
    let stub;
    beforeEach(() => {
        results = {
            body: [
                { id: 1 },
                { name: 'name' },
                { email: 'name@gmail.com' },
                { username: 'name' },
                { password: 'Name@123' },
                { address: 'addr' },
                { phone: '99999999999' }
                
            ]
        };
        stub = sinon.stub(regServiceobj, 'dbQueryexecution');
        stub.resolves(dbResults);
    });
    it('should call dbQueryexecution', () => {
        return regServiceobj.register(results).then((res) => {
            assert.equal(res, true);
        }).catch((err) => {
            assert.equal(err, false);
        });
    });
    afterEach(() => {
        stub.restore();
    });
});

/**
 * unit testing for check usrname function
 */
describe('checking checkUsername in registerServices', () => {
    let results = {};
    let stub;
    let dbResults={};
    beforeEach(() => {
        dbResults= {
            rows: [
                { count: 1 }
            ]
        };
        results = {
            body: [

                { u_name: 'name' },
            ]
        };
        stub = sinon.stub(regServiceobj, 'dbQueryexecution');
        stub.resolves(dbResults);
    });
    it('should call dbQueryexecution', () => {
        return regServiceobj.checkUsername(results).then(() => {
            assert(stub.calledOnce);
        }).catch(() => {
            assert(stub.calledOnce);
        });
    });
    it('should return status object', () => {
        return regServiceobj.checkUsername(results).then((res) => {
            assert.equal(res, false);
        }).catch((err) => {
            assert.equal(err, true);
        });
    });
    afterEach(() => {
        stub.restore();
    });
});