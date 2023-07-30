const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema1 = new Schema({
    whatsappNumber: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: false,
      },
  });

  module.exports = mongoose.model('Qa',UserSchema1)