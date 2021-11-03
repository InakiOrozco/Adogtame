

const UsersController = require('../controllers/users.controller');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = function(req, file, cb) {
    console.log('File filter: ', file.mimetype);
    let isValid = false;
    if(file.mimetype === 'image/jpeg') {
        isValid = true;
    }
    cb(null, isValid);
}

const upload = multer({storage: storage, fileFilter: fileFilter});

router.get('/', UsersController.getAllUsers);
router.get('/profile', UsersController.profile)
router.post('/profile', upload.single('image'), UsersController.createProfile)


module.exports = router;
