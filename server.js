let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mongoose = require('mongoose');
let Message = mongoose.model('Message',{
    name:String,
    message:String
})
let port = process.env.PORT||5000

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let dbUrl = 'mongodb+srv://admin:1234@cluster0.s8txo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// let messages = [
   
// ];

app.get('/messages', (req,res)=>{
    Message.find({},(err,messages)=>{
        res.send(messages);
    })
    
})

app.post('/messages', (req,res)=>{
    let message = new Message(req.body)
    message.save((err)=>{
        if(err)
        sendStatus(500);
        io.emit('message', req.body);
    console.log(message);
    res.sendStatus(200);
    })
    
    
})
io.on('connection',(socket)=>{
    console.log('user connected');
})

mongoose.connect(dbUrl, (err)=>{
    console.error(err);
    console.log('mongoose connected!');
});

let server = http.listen(port,()=>{
    console.log("I'm listening on the port %d", port);
})