const EventEmitter = require('events');//it's a class
var url = "http://google.com";


class Logger extends EventEmitter{
    log(message){
        console.log(message);
    
        //Raise an event
        this.emit('messageLogged', {id:1, url: 'http://'});//used to raise an event
    
}

}
//module.exports.log = log;
module.exports = Logger;