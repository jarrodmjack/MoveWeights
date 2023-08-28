const mongoose = require("mongoose")

const Schema = mongoose.Schema

const templateSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		exercises: {
			type: [{exerciseName: String, muscleGroup: String}],
            required: true
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Template", templateSchema)
