const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');
const staffController = require('../controllers/staffController');
const systemController = require('../controllers/systemController');
const reportController = require('../controllers/reportController');

const adminMiddleware = require('../middlewares/adminMiddleware');
const staffMiddleware = require('../middlewares/staffMiddleware');

// Route để get system
router.get('/', systemController.getProductSystem);

// Route để post system
router.post('/', systemController.postAddProduct);

// Route để get payment
router.get('/payment', staffMiddleware.sessionStaff, systemController.getPaymentSystem);

// Route để get payment
router.post('/payment', systemController.postPaymentSystem);

// Route để clear product
router.get('/clear', systemController.postClearProduct);

module.exports = router;