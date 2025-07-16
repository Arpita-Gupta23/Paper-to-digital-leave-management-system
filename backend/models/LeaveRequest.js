const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
  name: String,
  passwoed: String,
  reason: String,
  startDate: String,
  endDate: String,
  status: {
    type: String,
    default: "Pending"
  },
  faculty: String
});

module.exports = mongoose.model('LeaveRequest', LeaveRequestSchema);
