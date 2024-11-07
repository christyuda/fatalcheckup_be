const Biodata = require('../models/Biodata');

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
