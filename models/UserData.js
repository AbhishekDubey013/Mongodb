// models/UserData.js
const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  age: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  employmentStatus: { type: String, required: true },
  sleep: { type: String, required: true },
  healthCondition: { type: String, required: true }
});

const UserData = mongoose.model('UserData', UserDataSchema);

module.exports = UserData;
