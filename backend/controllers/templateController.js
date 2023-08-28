const Exercise = require("../models/exerciseModel")
const Workout = require("../models/workoutModel")
const Template = require("../models/templateModel")

const createTemplate = async (req, res) => {
	console.log("HIT CREATE ENPOINT")
	console.log(req.body.template.templateExercises)

	const userId = req.user.id
	const newTemplate = await Template.create({
		userId: userId,
		exercises: req.body.template.templateExercises,
	})

	console.log("newTemplate: ", newTemplate)

	res.status(200).json({ templateName: "Tester" })
}

const updateTemplate = async (req, res) => {
	console.log("HIT update ENPOINT")
	res.status(200).json({ msg: "success" })
}

const deleteTemplate = async (req, res) => {
	console.log("HIT delete ENPOINT")
	res.status(200).json({ msg: "success" })
}

const getTemplateById = async (req, res) => {
	console.log("HIT get ENPOINT")
	res.status(200).json({ msg: "success" })
}

module.exports = {
	createTemplate,
	updateTemplate,
	getTemplateById,
	deleteTemplate,
}
