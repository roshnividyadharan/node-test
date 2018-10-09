const express = require('express'); //importing express module
const app = express();
const bodyParser = require('body-parser');//importing body parser
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const { fork } = require('child_process');
fork('./email.js');
const logfileImport=require('./log/logFile');
var home = require('./home');
var register=require('./src/router/register');
var login=require('./src/router/login');
var user=require('./src/router/user');
var admin=require('./src/router/admin');
app.use('/register/register',register);
app.use('/register/checkuname',register);
app.use('/login/login',login);
app.use('/user/userhome',user);
app.use('/user/edit',user);
app.use('/user/edit_all',user);
app.use('/user/imgUpload',user);
app.use('/user/checkuname',user);
app.use('/admin/listuser',admin);
app.use('/admin/deluser',admin);
app.use('/admin/adminchange',admin);
app.use('/home', home);


app.listen(3000, function () {
    let message='listening on *:3000';
    logfileImport.emit('info',message);
    // console.log('listening on *:3000');
});