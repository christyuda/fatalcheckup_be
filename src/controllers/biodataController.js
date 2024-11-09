const Biodata = require('../models/Biodata');
const User = require('../models/User'); // Ensure you have this import

exports.getBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.find();
    res.status(200).json(biodata);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getBiodataByUserId = async (req, res) => {
  const { userId } = req.params; 

  try {
    // Find the biodata entry associated with the specified userId
    const biodata = await Biodata.findOne({ userId: userId });

    if (!biodata) {
      return res.status(404).json({ message: 'Biodata not found' });
    }

    // Find the user to get the email
    const user = await User.findById(biodata.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Include email in the response
    res.status(200).json({
      _id: biodata._id,
      userId: biodata.userId,
      nama: biodata.nama,
      ttl: biodata.ttl,
      umur: biodata.umur,
      kehamilanKe: biodata.kehamilanKe,
      harapan: biodata.harapan,
      persalinanSecara: biodata.persalinanSecara,
      tempatDanPenolong: biodata.tempatDanPenolong,
      biayaDanKendaraan: biodata.biayaDanKendaraan,
      email: user.email, // Add email from the User model
      __v: biodata.__v
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateBiodata = async (req, res) => {
  const { userId } = req.params;
  const { nama, ttl, umur, kehamilanKe, harapan, persalinanSecara, tempatDanPenolong, biayaDanKendaraan } = req.body;

  try {
    const updatedBiodata = await Biodata.findOneAndUpdate(
      { userId: userId }, // Filter by userId
      { 
        nama, 
        ttl, 
        umur, 
        kehamilanKe, 
        harapan, 
        persalinanSecara, 
        tempatDanPenolong, 
        biayaDanKendaraan 
      },
      { new: true, runValidators: true } 
    );

    if (!updatedBiodata) {
      return res.status(404).json({ message: 'Biodata not found' });
    }

    res.status(200).json({ message: 'Biodata updated successfully', updatedBiodata });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createBiodata = async (req, res) => {
  const { nama, ttl, umur, kehamilanKe, harapan, persalinanSecara, tempatDanPenolong, biayaDanKendaraan } = req.body;
  try {
    const newBiodata = new Biodata({ nama, ttl, umur, kehamilanKe, harapan, persalinanSecara, tempatDanPenolong, biayaDanKendaraan });
    await newBiodata.save();
    res.status(201).json(newBiodata);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addPregnancyData = async (req, res) => {
    const { userId, tanggalHPHT, tanggalHPL } = req.body;
    try {
      const user = await Biodata.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.tanggalHPHT = tanggalHPHT;
      user.tanggalHPL = tanggalHPL;
      await user.save();
      res.status(200).json({ message: 'Pregnancy data added successfully', user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
