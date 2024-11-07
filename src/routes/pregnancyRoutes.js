const express = require('express');
const router = express.Router();
const {addPregnancyData} = require('../controllers/pregnancyController');

router.post('/addPregnancyData', addPregnancyData);
module.exports = router;
