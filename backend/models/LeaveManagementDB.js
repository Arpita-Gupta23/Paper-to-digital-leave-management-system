const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  name: String,
  from: String,
  to: String,
  reason: String,
  status: String
});

module.exports = mongoose.model('Leave', leaveSchema);
