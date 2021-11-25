const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'public', 'images'));
	},
	filename: (req, file, cb) => {
		let extArray = file.mimetype.split("/");
		let extension = extArray[extArray.length - 1];
		cb(null, `${Date.now()}.${extension}`);
	}
});

const upload = multer({
	storage,
	dest: path.join(__dirname, '..', 'public', 'images'),
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("Wrong file type"));
		}
	}
});

router.get('/images/:image', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'images', req.params.image));
});

router.post('/images', upload.single('image'), (req, res) => {
	console.log('si jalo');
	res.json(req.file);
});

module.exports = router;