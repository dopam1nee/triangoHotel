const mongoose = require('mongoose')
const validator = require('validator')

const roomSchema = new mongoose.Schema(
	{
		number: {
			type: Number,
			required: true,
			unique: true,
		},
		info: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
			validate: {
				// валидация
				validator: validator.isURL,
				message: 'Incorrect image URL',
			},
		},
		status: {
			type: Boolean,
			default: true,
		},
		bookings: [
			{
				type: mongoose.Schema.Types.ObjectId,
				default: '',
				ref: 'Booking',
			},
		],
	},
	{ timestamps: true },
)

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
