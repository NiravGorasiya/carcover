async await
=>async function is a function declared with async keyword
=>await keyword permitted it
=>async and await keywords enable asynchronous
=>examle 
function resloveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("resolved")
        }, 2000)
    })
}
async function asyncCall() {
    console.log('calling');
    const result = await resloveAfter2Seconds();
    console.log(result);
    console.log("hello");
    const res = await resloveAfter2Seconds();
    console.log(res);
    console.log("ok");
}
asyncCall()
=>async functions can contain zero or more await expressions
=>await expressions make promise returning 
=>the purpose of aysnc /await is to necessary to consume promise-based api
=>async function always return promise
=>async function without an await expression will run synchronously

=>eventEmitter
=>node js events modules to create and handle custom events
=>the EventEmitter class can be used create and handle custom event
=>EventEmitter.on(event,listener) and EventEmitter.addListener(event,listener) similar
=>EventEmitter.removeListener() takes two argument event and listener remove from the listener array
=>EventEmitter.removeAllListeners() remove all listener from array
=>syntax
eventEmitter.removeListener(event, listener)
eventEmitter.removeAllListeners([event]) 
const EventEmitter = require("events")
var eventEmitter = new EventEmitter();
eventEmitter.on("myEvent", (msg) => {
    console.log(msg);
})
eventEmitter.emit('myEvent', 'First Event')
var geek1 = (msg) => {
    console.log("message from greek1 " + msg);
}

var geek2 = (msg) => {
    console.log("message from greek2", msg);
}
eventEmitter.on('myEvent', geek1)
eventEmitter.on('myEvent', geek1)
eventEmitter.on('myEvent', geek2)

eventEmitter.removeListener('myEvent', geek1)

eventEmitter.emit('myEvent', 'Event occurred')

eventEmitter.removeAllListeners('myEvent')

=>aggregation
aggregation operations
aggregation operations are expressions you can used to produce and reduced and summarized result
aggregation pipline part of query api
create a pipline that consists of one or more stage 
each perform specific operation on your data

find
selected which document return
selected which fields return
sort result

aggregation operations
permorm all query operations
rename field
calculate field
summarized data
group values
 const p = path.join(__dirname, '../public/uploads/' + req.file.filename)
        const v = await sharp(p).resize(700, 700).toFile(req.file.originalname)
