const express = require("express")
const {
	createTemplate,
	deleteTemplate,
	updateTemplate,
	getTemplateById,
	getUserTemplates
} = require("../controllers/templateController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth) //use for auth

router.get("/template/:id", getTemplateById)
router.get("/all-user-templates", getUserTemplates)
router.post("/", createTemplate)
router.put("/template/:id", updateTemplate)
router.delete("/template/:id", deleteTemplate)

module.exports = router
