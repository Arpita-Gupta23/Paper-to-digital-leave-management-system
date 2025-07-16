
const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Leave", leaveSchema);


