const mongoose = require('mongoose');
const moment = require('moment-timezone');


const UserSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: false
  },
  dataArray: {
    type: Array, // You can change the type of the array elements as needed
    required: false
  },
  createdAt: {
    type: Date,
    default: moment.tz(Date.now(), 'Asia/Kolkata') // Convert current time to IST
  }
});

const DataModel = mongoose.model('PD', UserSchema);

module.exports = DataModel;


//   Learning:

//   1. Here Op is the collection in DB.
//   2. For inserting collection use type array.
  