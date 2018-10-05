const winston = require('winston');
const eventEmitter=require('events');//eslint-disable-line
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log/logRecord.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: './log/exceptionRecord.log' })
    ]
});
class logEmiiter extends eventEmitter{}
const loggerEmitter=new logEmiiter();
loggerEmitter.on('info',(message,timestamp)=>{
    logger.log({
        level:'info',
        message:message,
        timestamp:timestamp
    });
});
loggerEmitter.on('error',(message,timestamp)=>{
    logger.log({
        level:'error',
        message:message,
        timestamp:timestamp
    });
});
loggerEmitter.on('warn',(message,timestamp)=>{
    logger.log({
        level:'warn',
        message:message,
        timestamp:timestamp
    });
});
loggerEmitter.on('debug',(message,timestamp)=>{
    logger.log({
        level:'debug',
        message:message,
        timestamp:timestamp
    });
});
loggerEmitter.on('silly',(message,timestamp)=>{
    logger.log({
        level:'silly',
        message:message,
        timestamp:timestamp
    });
});
module.exports=loggerEmitter;
