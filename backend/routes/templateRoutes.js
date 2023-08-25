const express = require("express")
const {
	createTemplate,
	deleteTemplate,
	updateTemplate,
	getTemplateById,
} = require("../controllers/templateController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth) //use for auth

router.post("/", createTemplate)
router.get("/template/:id", deleteTemplate)
router.put("/template/:id", updateTemplate)
router.delete("/template/:id", getTemplateById)

module.exports = router
