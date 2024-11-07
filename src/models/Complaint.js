const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Biodata',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  complaint: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
