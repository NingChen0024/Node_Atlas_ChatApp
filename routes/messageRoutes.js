const express = require('express')
const messageModel = require('../models/message')
const app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.delete('/messages/:id', async (req, res) => {
  try {
    const message = await messageModel.findByIdAndDelete(req.params.id)

    if (!message) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

app.delete('/messages', async (req, res) => {
  try {
    const message = await messageModel.deleteMany({}, function(err) {})

    if (!message) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

app.patch('/messages/:id', async (req, res) => {
  try {
    await messageModel.findByIdAndUpdate(req.params.id, req.body)
    await messageModel.save()
    res.send(message)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/messages', async (req, res) => {
  messages = await messageModel.find({})

  try {
    res.send(messages)
  } catch (error) {
    res.status(500).send(err)
  }
})

// app.post('/messages', async (req, res) => {

//   try {

//     var message = new messageModel(req.body)

//     await message.save()

//     console.log('saved')
    
//     var censored = await messageModel.findOne({message: 'badword'})

//     if (censored) {
//       console.log('censored word found', censored)
//       await messageModel.deleteMany({message: 'badword'})
//     } else {
//       io.emit('message', req.body)
//       console.log('no censored words found')
//     }
//     res.send(message)
//     res.sendStatus(200)
//   } catch (err) {
//       res.status(500).send(err)
//   } finally {
//     console.log('final clause')
//   }
// })


module.exports = app