
const getHome = async (req, res) => {
	try {
		res.status(200).json({ message: "this is the home data at route /" })
	} catch (err) {
		res.json(err)
	}
}


module.exports = { getHome }
