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
		exerciseId: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Set", setSchema)
