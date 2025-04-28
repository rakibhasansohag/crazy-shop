const { isValidObjectId } = require('mongoose');

const Address = require('../../models/Address');

const errorResponse = (res, status, message) => {
	return res.status(status).json({
		success: false,
		message,
	});
};

const addAddress = async (req, res) => {
	try {
		const { userId, address, city, pincode, phone, notes = '' } = req.body;

		// Validate required fields
		const requiredFields = { userId, address, city, pincode, phone };
		const missingFields = Object.entries(requiredFields)
			.filter(([_, value]) => !value)
			.map(([key]) => key);

		if (missingFields.length > 0) {
			return errorResponse(
				res,
				400,
				`Missing required fields: ${missingFields.join(', ')}`,
			);
		}

		// Validate ObjectID format
		if (!isValidObjectId(userId)) {
			return errorResponse(res, 400, 'Invalid user ID format');
		}

		const newAddress = await Address.create({
			userId,
			address,
			city,
			pincode,
			phone,
			notes,
		});

		res.status(201).json({
			success: true,
			data: newAddress,
		});
	} catch (error) {
		console.error('Add address error:', error);
		errorResponse(res, 500, 'Failed to create address');
	}
};

const fetchAllAddress = async (req, res) => {
	try {
		const { userId } = req.params;

		if (!userId || !isValidObjectId(userId)) {
			return errorResponse(res, 400, 'Valid user ID is required');
		}

		const addresses = await Address.find({ userId })
			.sort({ createdAt: -1 })
			.lean();

		res.status(200).json({
			success: true,
			data: addresses,
		});
	} catch (error) {
		console.error('Fetch addresses error:', error);
		errorResponse(res, 500, 'Failed to fetch addresses');
	}
};

const editAddress = async (req, res) => {
	try {
		const { userId, addressId } = req.params;
		const updates = req.body;

		// Validate IDs
		if (!isValidObjectId(userId) || !isValidObjectId(addressId)) {
			return errorResponse(res, 400, 'Invalid ID format');
		}

		// Validate allowed updates
		const allowedUpdates = ['address', 'city', 'pincode', 'phone', 'notes'];
		const isValidUpdate = Object.keys(updates).every((key) =>
			allowedUpdates.includes(key),
		);

		if (!isValidUpdate) {
			return errorResponse(res, 400, 'Invalid updates!');
		}

		const updatedAddress = await Address.findOneAndUpdate(
			{ _id: addressId, userId },
			updates,
			{ new: true, runValidators: true },
		);

		if (!updatedAddress) {
			return errorResponse(res, 404, 'Address not found');
		}

		res.status(200).json({
			success: true,
			data: updatedAddress,
		});
	} catch (error) {
		console.error('Edit address error:', error);
		errorResponse(res, 500, 'Failed to update address');
	}
};

const deleteAddress = async (req, res) => {
	try {
		const { userId, addressId } = req.params;

		if (!isValidObjectId(userId) || !isValidObjectId(addressId)) {
			return errorResponse(res, 400, 'Invalid ID format');
		}

		const deletedAddress = await Address.findOneAndDelete({
			_id: addressId,
			userId,
		});

		if (!deletedAddress) {
			return errorResponse(res, 404, 'Address not found');
		}

		res.status(200).json({
			success: true,
			message: 'Address deleted successfully',
		});
	} catch (error) {
		console.error('Delete address error:', error);
		errorResponse(res, 500, 'Failed to delete address');
	}
};

module.exports = {
	addAddress,
	editAddress,
	fetchAllAddress,
	deleteAddress,
};
