const adminService=require('../src/services/adminServices');
const adminServiceobj=new adminService();
const assert = require('chai').assert;
const sinon = require('sinon');
/**
 * unit test for adminList function in adminServices
 */
describe('checking the adminList function in adminServices', function () {
    let stub;
    let dbresponseResult = {};
    beforeEach(() => {
        
        dbresponseResult = {
            rows: [
                { u_name: 'bilgo' },
                {u_pswd: '$2b$12$qwUV4atu2XweMPVBtRPlkepSOCiqvDnBpu9CHf6bx8exy/eIDQ4zS'},
                {user_type:'user'}
            ]
        };
        stub = sinon.stub(adminServiceobj, 'dbQueryexecution');
        stub.rejects(dbresponseResult);
    });
    it('should call dbQueryexecution', () => {
        return adminServiceobj.adminList().then((res) => {
            assert.equal(res.stat, true);
        }).catch((err) => {
            assert.equal(err, false);
        });
    });
    afterEach(() => {
        stub.restore();
    });
});
/**
 * unit testing for delete function in adminServices
 */
// describe('checking the adminDelete function in adminServices', function () {
//     let results = {};
//     let stub;
//     let dbresponseResult = {};
//     beforeEach(() => {
//         results = {
//             body: [

//                 { check: 'name' },
//                 { value: 'Name@123' }
//             ]
//         };
//         dbresponseResult = {
//             rows: [
//                 { u_name: 'bilgo' },
//                 {u_pswd: '$2b$12$qwUV4atu2XweMPVBtRPlkepSOCiqvDnBpu9CHf6bx8exy/eIDQ4zS'},
//                 {user_type:'user'}
//             ]
//         };
//         stub = sinon.stub(adminServiceobj, 'dbQueryexecution');
//         stub.resolves(dbresponseResult);
//     });
//     it('should call dbQueryexecution', () => {
//         return adminServiceobj.adminDelete(results).then((res) => {
//             //assert.equal(res.stat, true);
//             expect(res).to.be.an('array');
//         }).catch((err) => {
//             assert.equal(err, false);
//         });
//     });
//     afterEach(() => {
//         stub.restore();
//     });
// });
/**
 * unit testing for admin channge function in adminServices
 */
describe('checking the adminChange function in adminServices', function () {
    let results = {};
    let stub;
    let dbresponseResult = {};
    beforeEach(() => {
        results = {
            body: [

                { id: '1' }
               
            ]
        };
        dbresponseResult = {
            rows: [
                { u_name: 'bilgo' },
                {u_pswd: '$2b$12$qwUV4atu2XweMPVBtRPlkepSOCiqvDnBpu9CHf6bx8exy/eIDQ4zS'},
                {user_type:'user'}
            ]
        };
        stub = sinon.stub(adminServiceobj, 'dbQueryexecution');
        stub.rejects(dbresponseResult);
    });
    it('should call dbQueryexecution', () => {
        return adminServiceobj.adminChange(results).then((res) => {
            assert.equal(res.rows[0].u_name, 'bilgo');
        }).catch((err) => {
            assert.equal(err, false);
        });
    });
    afterEach(() => {
        stub.restore();
    });
});