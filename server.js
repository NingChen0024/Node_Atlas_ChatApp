var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var messageRouter = require('./routes/messageRoutes')
const messageModel = require('./models/message')

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

app.post('/messages', async (req, res) => {

  try {
    var message = new messageModel(req.body)

    await message.save()
    
    console.log('saved')
    
    var censored = await messageModel.findOne({message: 'badword'})
    
    if (censored) {
      console.log('censored word found', censored)
      await messageModel.deleteMany({message: 'badword'})
    } else {
      io.emit('message', req.body)
      console.log('no censored words found')
    }
    res.send(message)
    res.sendStatus(200)
  } catch (err) {
      res.status(500).send(err)
  } finally {
    console.log('final clause')
  }
})

app.use(messageRouter)

var server = http.listen(3000, () => {
  console.log('server is listening', server.address().port)
})

