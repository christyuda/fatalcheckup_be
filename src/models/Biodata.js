const mongoose = require('mongoose');

const BiodataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  nama: {
    type: String,
    required: true
  },
  ttl: {
    type: String,
    required: true
  },
  umur: {
    type: Number,
    required: true
  },
  kehamilanKe: {
    type: Number,
    required: true
  },
  harapan: {
    type: String
  },
  persalinanSecara: {
    type: String
  },
  tempatDanPenolong: {
    type: String
  },
  biayaDanKendaraan: {
    type: String
  },
  tanggalHPHT: {
    type: Date,
  },
  tanggalHPL: {
    type: Date,
  }
});

module.exports = mongoose.model('Biodata', BiodataSchema);
