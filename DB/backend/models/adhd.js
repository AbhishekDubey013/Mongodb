const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    Question:{
        type:String,
        required:true
    },
    response:{
        type:String,
        required:true,
        //unique:true
    },

  });

  module.exports = mongoose.model('qa',UserSchema)