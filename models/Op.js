const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true
  },
  dataArray: {
    type: Array, // You can change the type of the array elements as needed
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DataModel = mongoose.model('Op', UserSchema);

module.exports = DataModel;


//   Learning:

//   1. Here Op is the collection in DB.
//   2. For inserting collection use type array.
  