const { isValidObjectId } = require('mongoose');

module.exports = {
	validateObjectIds:
		(...ids) =>
		(req, res, next) => {
			try {
				ids.forEach((id) => {
					if (!isValidObjectId(req.params[id])) {
						throw new Error(`Invalid ${id} format`);
					}
				});
				next();
			} catch (error) {
				res.status(400).json({ success: false, message: error.message });
			}
		},
};
