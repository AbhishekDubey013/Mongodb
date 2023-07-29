const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    customer_mail:{
        type:String,
        //required:true
    },
    product_id:{
        type:Number,
        //required:true,
    },
    email:{
        type:String,
        //required:true,
        //unique:true
    },
    password:{
        type:String,
        //required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

  });

  module.exports = mongoose.model('student',UserSchema)