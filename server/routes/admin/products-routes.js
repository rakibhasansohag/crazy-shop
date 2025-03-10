const express = require('express');

const {
	handleImageUpload,
	addProduct,
	editProduct,
	fetchAllProducts,
	deleteProduct,
} = require('../../controllers/admin/products-controller');

const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

router.post('/upload-image', upload.single('crazy_shop'), handleImageUpload);
router.get('/get', fetchAllProducts);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
