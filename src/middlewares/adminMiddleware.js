const multer = require('multer');
const path = require('path');

const sessionAdmin = (req, res, next) => {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.redirect('/admin/login-admin');
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images');
  },
  filename: function (req, file, cb) {
    const adminId = req.session.admin._id;
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFilename = 'avatar_admin_' + adminId + '.' + fileExtension;

    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

module.exports = {
  sessionAdmin,
  upload,
}