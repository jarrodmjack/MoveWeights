const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userExerciseSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			maxLength: 50,
		},
		muscleGroup: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("UserExercise", userExerciseSchema)
