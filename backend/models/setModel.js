const mongoose = require("mongoose")

const Schema = mongoose.Schema

const setSchema = new Schema(
	{
		reps: {
			type: Number,
			required: true,
		},
		weight: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Set", setSchema)
