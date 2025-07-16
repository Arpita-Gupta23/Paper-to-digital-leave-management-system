const express = require('express');
const router = express.Router();
const Leave = require('./models/LeaveManagementDB');

// POST request: Apply for leave
router.post('/submit', async (req, res) => {
  try {
    const leaveData = new Leave({
      name: req.body.name,
      from: req.body.from,
      to: req.body.to,
      reason: req.body.reason,
      status: req.body.status
    });

    await leaveData.save();
    res.json({ message: 'Leave applied successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting leave', error });
  }
});

// GET request: Get all leaves
router.get('/all', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaves', error });
  }
});

module.exports = router;
