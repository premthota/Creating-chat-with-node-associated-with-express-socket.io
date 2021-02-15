const { static } = require("express")
var express=require("express")
var bodyparser=require("body-parser")
const { Socket } = require("dgram")
var app=express()
var http=require("http").Server(app)
var io=require("socket.io")(http)
app.use(express.static(__dirname))

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({"extended":false}))

var messages=[ 
    {name: 'Sri Rama', message: 'Om mahadevaa'},
    {name: 'Hanuman', message: 'Om mahadevaa Jai Sri Ram'},
    {name: 'Prem', message: 'Om mahadevaa Jai Sri Sai Ram Jai Hanuman'}
]

app.get('/messages', (req,res) => {
    res.send(messages)
})

app.post('/messages', (req,res) => {
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (Socket) => {
    console.log("Listening")
})

var server=http.listen(3000, () => {
    console.log("Server is listenning on port",server.address().port);
})