const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');
const staffController = require('../controllers/staffController');
const systemController = require('../controllers/systemController');
const reportController = require('../controllers/reportController');

const adminMiddleware = require('../middlewares/adminMiddleware');
const staffMiddleware = require('../middlewares/staffMiddleware');

// Route để get danh sách
router.get('/', reportController.getAnalysisReport);

// Route để get danh sách
router.post('/', reportController.postAnalysisReport);

module.exports = router;