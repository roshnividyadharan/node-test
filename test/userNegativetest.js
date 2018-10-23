const userService=require('../src/services/userServices');
const userServiceobj=new userService();
const assert = require('chai').assert;
const sinon = require('sinon');
/**
 * unit test for adminList function in adminServices
 */
describe('negative checking the userhomeService function in userServices', function () {
    let stub;
    let dbresponseResult = {};
    let results={};
    beforeEach(() => {
        results = {
            body: [
                { id: 1 },              
            ]
        };
        dbresponseResult = {
            rows: [
                { u_name: 'bilgo' },
                {u_pswd: '$2b$12$qwUV4atu2XweMPVBtRPlkepSOCiqvDnBpu9CHf6bx8exy/eIDQ4zS'},
                {user_type:'user'}
            ]
        };
        stub = sinon.stub(userServiceobj, 'dbQueryexecution');
        stub.rejects(dbresponseResult);
    });
    it('should call dbQueryexecution', () => {
        return userServiceobj.userhomeService(results).then((res) => {
            console.log(res);
            assert.equal(res.rows[0].u_name, 'bilgo');
        }).catch((err) => {
            assert.equal(err, false);
        });
    });
    afterEach(() => {
        stub.restore();
    });
});
/**
 * unit test for userEdit function from userServices
 */
describe('negative checking the userEdit function in userServices', function () {
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
        stub = sinon.stub(userServiceobj, 'dbQueryexecution');
        stub.rejects(dbResults);
    });
    it('should call dbQueryexecution', () => {
        return userServiceobj.userEdit(results).then((res) => {
            assert.equal(res.rowCount, true);
        }).catch((err) => {
            assert.equal(err, false);
        });
    });
    afterEach(() => {
        stub.restore();
    });
});
/**
 * unit test for userEditall function in userServices
 */
describe('negative checking the userEdit function in userServices', function () {
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
        stub = sinon.stub(userServiceobj, 'dbQueryexecution');
        stub.rejects(dbResults);
    });
    it('should call dbQueryexecution', () => {
        return userServiceobj.userEditall(results).then((res) => {
            assert.equal(res.rowCount, true);
        }).catch((err) => {
            assert.equal(err, false);
        });
    });
    afterEach(() => {
        stub.restore();
    });
});