const nodemailer = require('nodemailer');
const mailTest=require('./emailTest');
const mail = new mailTest();
let toMailAddress = [];
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
        user: 'roshni.v1196@gmail.com',
        pass: 'Admin@123'
    }
});
setInterval(() => {
    mail.getEmails().then((res) => {
        for(let i=0; i< res.rows.length; i++){
            toMailAddress[i] = res.rows[i].u_email;
            console.log(res.rows[i].u_email);
        }  
    }).catch((status) => {
        console.log(status);
    });
    console.log(toMailAddress);
    let mailOptions = {
        from: 'roshni.v1196@gmail.com', 
        to: toMailAddress,
        subject: 'Hello ✔',
        text: 'Hello world?', 
        html: '<b>Hello world?</b>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    }); 
}, 6000);