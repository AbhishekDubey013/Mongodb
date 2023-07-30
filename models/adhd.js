const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema1 = new Schema({
    whatsappNumber: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
  });

  module.exports = mongoose.model('Qa',UserSchema1)