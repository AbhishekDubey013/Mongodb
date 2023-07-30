const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema1 = new Schema({
    name:{
        type:Array,
        required: false
    },

  });

  module.exports = mongoose.model('Qa',UserSchema1)