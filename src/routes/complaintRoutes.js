const express = require('express');
const router = express.Router();
const { getComplaints, addComplaint } = require('../controllers/complaintController');

// Get all complaints for a user
router.get('/:userId', getComplaints);

// Add a complaint
router.post('/', addComplaint);

module.exports = router;
