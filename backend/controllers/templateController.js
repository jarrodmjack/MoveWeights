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
		res.status(400).json({ msg: "Failed to fetch template" })
	}
}

const getUserTemplates = async (req, res) => {
	try {
		const userId = req.user.id
		const templates = await Template.find({ userId: userId }).lean()
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
	res.status(200).json({ msg: "success" })
}

const deleteTemplate = async (req, res) => {
	try {
		const { templateId } = req.body
		await Template.findByIdAndDelete(templateId)
		res.status(200).json({ msg: "Successfully deleted template" })
	} catch (e) {
		res.status(400).json({
			err: "There was an issue deleting the template",
		})
	}
}

module.exports = {
	getTemplateById,
	getUserTemplates,
	createTemplate,
	updateTemplate,
	deleteTemplate,
}
