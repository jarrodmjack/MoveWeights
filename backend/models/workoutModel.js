const mongoose = require("mongoose")

const Schema = mongoose.Schema

const workoutSchema = new Schema(
	{
		exercises: {
			type: [],
		},
		userId: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Workout", workoutSchema)
