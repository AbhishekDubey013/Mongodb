const mongoose = require('mongoose')
const moment = require('moment-timezone');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        //unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: moment.tz(Date.now(), 'Asia/Kolkata') // Convert current time to IST
      }

  });

  module.exports = mongoose.model('user',UserSchema)