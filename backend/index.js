const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const homeRoutes = require("./routes/homeRoutes")
const exerciseRoutes = require("./routes/exerciseRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")
const historyRoutes = require("./routes/historyRoutes")

const templateRoutes = require("./routes/templateRoutes")
require("dotenv").config()

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("connected")
		})
	})
	.catch((error) => {
		console.error(error)
	})

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use(express.json())
app.use((req, res, next) => {
	next()
})
app.use(cors())
app.use(bodyParser.json())
// Routes
app.use("/api/home", homeRoutes)
app.use("/api/exercise", exerciseRoutes)
app.use("/api/user", userRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/history", historyRoutes)

app.use("/api/templates", templateRoutes)
