const Complaint = require('../models/Complaint');

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.params.userId });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComplaint = async (req, res) => {
  const { userId, date, complaint } = req.body;
  try {
    const newComplaint = new Complaint({ userId, date, complaint });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
