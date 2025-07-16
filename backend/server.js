const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // optional if needed
const LeaveRequest = require('./models/LeaveRequest');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// MongoDB connection
mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Error:", err));

// Test route
app.get('/', (req, res) => {
  res.send("Backend is running!");
});

// POST: Submit leave request
app.post('/api/leave', async (req, res) => {
  try {
    const leave = new LeaveRequest(req.body);
    await leave.save();
    res.status(200).json({ message: 'Leave request submitted!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: All leave requests (for admin/faculty)
app.get('/api/leave', async (req, res) => {
  try {
    const allLeaves = await LeaveRequest.find().sort({ date: -1 });
    res.json(allLeaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Leave requests for specific faculty
app.get('/faculty-leave-requests/:facultyName', async (req, res) => {
  try {
    const facultyName = req.params.facultyName;
    const leaves = await LeaveRequest.find({ faculty: facultyName });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update leave status (approve/reject)
app.put('/api/leave/:id', async (req, res) => {
  try {
    const updatedLeave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedLeave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
