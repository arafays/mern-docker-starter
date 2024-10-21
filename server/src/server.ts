import { createServer } from "node:http"
import express, { json, urlencoded } from "express"
import cors from "cors"
import debug from "debug"
import helmet from "helmet"
import morgan from "morgan"

import connectDB from "./db"
import routes from "./routes"
import { setupSocket } from "./socket"

export const server = () => {
	debug.enable("express")
	const log = debug("express")
	const app = express()
	const server = createServer(app)

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

	setupSocket(server)

	return server
}
