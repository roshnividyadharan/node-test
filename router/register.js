const express = require('express');//loading express module
const routerRegister = express.Router();
const registerService=require('../services/registerServices');
const registerServiceobj= new registerService();

/**
 * code for registration
 */
routerRegister.post('/', (req, response) => {
    var returnReg =registerServiceobj.register(req);
    returnReg.then((res)=>{
        if(res){
            response.send(res);
        }
        else{
            response.send(false);
        }
    }).catch(() => {
        response.send(false);
  
    });
});
routerRegister.post('/checkuname', (req, res) => {
    var returnCheck=registerServiceobj.checkUsername(req);
    returnCheck.then((statusuCheck)=>{
        if(!statusuCheck){
           
            res.send(false);
        }
        else{
            res.send(true);
        }
    });
    returnCheck.catch(()=>{
        res.send(true);
        
    });  
    
   
});
module.exports=routerRegister;