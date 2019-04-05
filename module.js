//path module
const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj);

//os module
const os = require('os');
var memt = os.totalmem();
var memf = os.freemem();
console.log(`total: ${memt}`);
console.log(`free: ${memf}`);

//fs module
const fs = require('fs');
// const files = fs.readdirSync('./');
// console.log(files);

const files_aysnc = fs.readdir('./', function(err, files){
    if(err) console.log('Error', err);
    else console.log('Result',files);
});

//event module
const EventEmitter = require('events');//it's a class
const emitter = new EventEmitter();// it's an object

// Register a listener
 
// emitter.on('messageLogged', function(arg){
//     console.log('listener called',arg);
// });

//es6 has =>
emitter.on('messageLogged', (arg)=>{
    console.log('listener called',arg);
});

//Raise an event
emitter.emit('messageLogged', {id:1, url: 'http://'});//used to raise an event

//http module
const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url == '/'){
        res.write('Hello World');
        res.end();
    }
    if(req.url == '/api/courses'){
        res.write(JSON.stringify([1,3,4]));
        res.end();
        
    }
});

// server.on('connection',(socket) => {
//     console.log('New connection');
// });
server.listen(3000);

console.log('Listening on port 3000');



