const express = require('express');
const router = express.Router();
const { getBiodata, createBiodata ,getBiodataByUserId, updateBiodata} = require('../controllers/biodataController');
const { protect } = require('../middleware/authMiddleware'); // Asumsi middleware sudah dibuat

router.get('/', protect,getBiodata);
router.get('/:userId', protect,getBiodataByUserId);
router.post('/:userId', protect,updateBiodata);

router.post('/',protect, createBiodata);

module.exports = router;
