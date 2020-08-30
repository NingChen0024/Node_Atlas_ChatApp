const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (value < 0) throw new Error("messages are not real")
    }
  }
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message