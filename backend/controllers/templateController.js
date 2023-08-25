

const createTemplate = async (req, res) => {
    console.log("HIT CREATE ENPOINT")
    res.status(200).json({templateName: "Tester"})
}

const updateTemplate = async (req, res) => {
    console.log("HIT update ENPOINT")
    res.status(200).json({msg: "success"})
}

const deleteTemplate = async (req, res) => {
    console.log("HIT delete ENPOINT")
    res.status(200).json({msg: "success"})
}

const getTemplateById = async (req, res) => {
    console.log("HIT get ENPOINT")
    res.status(200).json({msg: "success"})
}

module.exports = { createTemplate, updateTemplate, getTemplateById, deleteTemplate }