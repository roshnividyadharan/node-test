const loginService = require('../src/services/loginServices');
const loginServiceobj = new loginService();
const assert = require('chai').assert;
const sinon = require('sinon');
/**
 * unit test for login function in login service
 */
describe('checking the login function in loginServices', function () {
    let results = {};
    let stub;
    let dbresponseResult = {};
    beforeEach(() => {
        results = {
            body:
            {
                username: 'bilbo',
                password: 'Bilbo@123'
            }

        };
        dbresponseResult = {
            rows: [
                {
                    u_name: 'bilbo',
                    u_pswd: '$2b$12$qwUV4atu2XweMPVBtRPlkepSOCiqvDnBpu9CHf6bx8exy/eIDQ4zS',
                    user_type: 'user'
                }
            ]
        };
        stub = sinon.stub(loginServiceobj, 'dbQueryexecution');
        stub.rejects(dbresponseResult);
    });
    it('should call dbQueryexecution', () => {
        return loginServiceobj.login(results).then((res) => {
            assert.equal(res.stat, true);
        }).catch((err) => {
            assert.equal(err, false);
        });
    });
    afterEach(() => {
        stub.restore();
    });
});