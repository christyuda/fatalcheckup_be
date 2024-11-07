const express = require('express');
const router = express.Router();
const { getBiodata, createBiodata ,getBiodataByUserId} = require('../controllers/biodataController');
const { protect } = require('../middleware/authMiddleware'); // Asumsi middleware sudah dibuat

router.get('/', protect,getBiodata);
router.get('/:userId', protect,getBiodataByUserId);

router.post('/',protect, createBiodata);

module.exports = router;
