var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var messageRouter = require('./routes/messageRoutes')

// setting up socket
var http = require('http').Server(app)
var io = require('socket.io')(http)

// mongo url
var dbUrl = 'mongodb+srv://testUser:testUser@cluster0.fl82y.mongodb.net/Cluster0?retryWrites=true&w=majority'

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: false}))

// connect to socket
io.on('connection', (socket) => {
  console.log('new user connected')
})

// var server = app.listen(3000, () => {
//   console.log('server is listening', server.address().port)
// })

// connect to mongo altas
mongoose.connect(dbUrl, {
  useNewUrlParser: true
})

app.use(messageRouter)

var server = http.listen(3000, () => {
  console.log('server is listening', server.address().port)
})

