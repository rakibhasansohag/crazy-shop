const { imageUploadUtil } = require('../../helpers/cloudinary');
const Product = require('../../models/Product');

const handleImageUpload = async (req, res) => {
	try {
		if (!req.file) {
			return res
				.status(400)
				.json({ success: false, message: 'No file uploaded' });
		}

		// const b64 = Buffer.from(req.file.buffer).toString('base64');
		// const url = 'data:' + req.file.mimetype + ';base64,' + b64;
		// const result = await imageUploadUtil(url);

		const result = await imageUploadUtil({
			buffer: req.file.buffer,
			mimetype: req.file.mimetype,
		});

		res.json({
			success: true,
			result,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: 'Error occurred during upload',
		});
	}
};

// Point: add a new product
const addProduct = async (req, res) => {
	try {
		const {
			image,
			title,
			description,
			category,
			brand,
			price,
			salePrice,
			totalStock,
			averageReview,
		} = req.body;

		console.log(averageReview, 'averageReview');

		const newlyCreatedProduct = new Product({
			image,
			title,
			description,
			category,
			brand,
			price,
			salePrice,
			totalStock,
			averageReview,
		});

		await newlyCreatedProduct.save();
		res.status(201).json({
			success: true,
			data: newlyCreatedProduct,
			message: 'Product created successfully!',
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: 'Error occurred During Creating Product!',
			error: e,
		});
	}
};

// Point: fetch all products
const fetchAllProducts = async (req, res) => {
	try {
		const listOfProducts = await Product.find({});
		res.status(200).json({
			success: true,
			data: listOfProducts,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: 'Error Getting Product List!',
		});
	}
};

// Point: edit a product
const editProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			image,
			title,
			description,
			category,
			brand,
			price,
			salePrice,
			totalStock,
			averageReview,
		} = req.body;

		let findProduct = await Product.findById(id);
		if (!findProduct)
			return res.status(404).json({
				success: false,
				message: 'Product not found!',
			});

		findProduct.title = title || findProduct.title;
		findProduct.description = description || findProduct.description;
		findProduct.category = category || findProduct.category;
		findProduct.brand = brand || findProduct.brand;
		findProduct.price = price === '' ? 0 : price || findProduct.price;
		findProduct.salePrice =
			salePrice === '' ? 0 : salePrice || findProduct.salePrice;
		findProduct.totalStock = totalStock || findProduct.totalStock;
		findProduct.image = image || findProduct.image;
		findProduct.averageReview = averageReview || findProduct.averageReview;

		await findProduct.save();
		res.status(200).json({
			success: true,
			data: findProduct,
			message: 'Product updated successfully',
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: 'Error occurred during Updating a Product',
		});
	}
};

// Point: delete a product
const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product)
			return res.status(404).json({
				success: false,
				message: 'Product not found',
			});

		res.status(200).json({
			success: true,
			message: 'Product delete successfully',
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: 'Error Occurred During Deleting Product',
		});
	}
};

module.exports = {
	handleImageUpload,
	addProduct,
	fetchAllProducts,
	editProduct,
	deleteProduct,
};
