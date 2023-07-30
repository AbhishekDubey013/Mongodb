const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema1 = new Schema({
    data:{
        type:mongoose.Schema.Types.Mixed,
        required: false
    },

  });

  module.exports = mongoose.model('Qa',UserSchema1)