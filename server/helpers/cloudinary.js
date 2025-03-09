require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const stream = require('stream');

// Cloudinary Config (Make sure environment variables are loaded)
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage in Memory
const storage = new multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(file) {
	if (!file || !file.buffer) {
		throw new Error('No file buffer found!');
	}

	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder: 'crazy_shop_images',
				resource_type: 'auto',
			},
			(error, result) => {
				if (error) return reject(error);
				resolve(result);
			},
		);

		const bufferStream = new stream.PassThrough();
		bufferStream.end(file.buffer);
		bufferStream.pipe(uploadStream);
	});
}

module.exports = { upload, imageUploadUtil };
