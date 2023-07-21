const mongoose = require("mongoose")

const Schema = mongoose.Schema

const exerciseSchema = new Schema(
	{
		workoutId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		muscleGroup: {
			type: String,
			required: true,
		},
		sets: {
			type: [],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Exercise", exerciseSchema)
