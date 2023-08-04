const mongoose = require("mongoose")

const Schema = mongoose.Schema

const workoutSchema = new Schema(
	{
		exercises: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Exercise",
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Workout", workoutSchema)
