import express, { json, urlencoded, type Express } from "express"
import cors from "cors"
import debug from "debug"
import helmet from "helmet"
import morgan from "morgan"

import connectDB from "./db"
import routes from "./routes"

export const createServer = (): Express => {
	debug.enable("express")
	const log = debug("express")
	const app = express()

	connectDB()

	log("Loading middleware...")
	app.use(express.json())
	app.use(helmet())
	app.use(cors())
	app.use(urlencoded({ extended: true }))
	app.use(json())
	app.use(morgan("dev"))
	log("Middleware loaded successfully")

	log("Loading routes...")
	app.use(routes)
	log("Routes loaded successfully")

	return app
}
