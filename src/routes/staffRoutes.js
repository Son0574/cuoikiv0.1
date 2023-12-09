const express = require('express');

const router = express.Router();

const staffController = require('../controllers/staffController');
const staffMiddleware = require('../middlewares/staffMiddleware');

// Route để lấy thông tin hoá đơn của một khách hàng dựa trên ID khách hàng
router.get('/list-bill-customer/:id', staffController.getListBillCustomer);

// Route để lấy thông tin tất cả khách hàng
router.get('/list-customer', staffController.getListCustomer);

// Route để lấy thông tin chi tiết hoá đơn của một hóa đơn dựa trên ID hóa đơn
router.get('/list-detail-bill-customer/:id', staffController.getListDetailBillCustomer);

// Route để lấy thông tin tất cả sản phẩm
router.get('/list-product-staff', staffController.getListProductStaff);

// Route để lấy thông tin tất cả sản phẩm
router.get('/locked-status-staff', staffController.getLockedStatusStaff);

// Route để get đăng nhập
router.get('/login-staff', staffController.getLoginStaff);

// Route để post đăng nhập
router.post('/login-staff', staffController.postLoginStaff);

// Route để hiển thị Navbar
router.get('/navbar-staff', staffController.getNavbarStaff);

// Route để hiển thị form điền mật khẩu mới
router.get('/new-password-staff', staffController.getNewPasswordStaff);

// Route để post form điền mật khẩu mới
router.post('/new-password-staff', staffController.postNewPasswordStaff);

// Route để lấy thông tin Staff hiện tại
router.get('/profile-staff', staffMiddleware.sessionStaff, staffController.getProfileStaff);

// Route để đổi mật khẩu Staff hiện tại
router.post('/change-password-staff', staffMiddleware.sessionStaff, staffController.postChangePasswordStaff);

// Route để upload ảnh
router.post('/upload-avatar-staff', staffMiddleware.sessionStaff, staffMiddleware.upload.single('avatar_staff'), staffController.postUploadAvatarStaff);

// Route để xác nhận token qua email
router.get('/verify-email-token-staff/:token', staffController.getVerifyEmailTokenStaff);

module.exports = router;