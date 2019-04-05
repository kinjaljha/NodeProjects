const EventEmitter = require('events');//it's a class


const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg)=>{
    console.log('listener called',arg);
});


logger.log('Hello World');
