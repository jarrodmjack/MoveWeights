const Exercise = require("../models/exerciseModel")
const Workout = require("../models/workoutModel")
const Template = require("../models/templateModel")

const getTemplateById = async (req, res) => {
	try {
		const templateId = req.params.id
		const template = await Template.findById(templateId)
		res.status(200).json(template)
		return
	} catch (e) {
		res.status(400).json({msg: "Failed to fetch template"})
	}
}

const getUserTemplates = async (req, res) => {
	try {
		const userId = req.user.id
		const templates = await Template.find({ userId: userId }).lean()
		console.log(templates)
		res.status(200).json(templates)
	} catch (e) {
		res.status(400).json(e)
	}
}

const createTemplate = async (req, res) => {
	try {
		const userId = req.user.id
		const newTemplate = await Template.create({
			userId: userId,
			exercises: req.body.template.templateExercises,
			name: req.body.template.templateName,
		})

		res.status(200).json({ templateName: newTemplate.name })
		return
	} catch (e) {
		res.status(400).json(e)
	}
}

const updateTemplate = async (req, res) => {
	console.log("HIT update ENPOINT")
	res.status(200).json({ msg: "success" })
}

const deleteTemplate = async (req, res) => {
	console.log("HIT delete ENPOINT")
	res.status(200).json({ msg: "success" })
}

module.exports = {
	getTemplateById,
	getUserTemplates,
	createTemplate,
	updateTemplate,
	deleteTemplate,
}
