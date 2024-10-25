import { readFile } from "node:fs"
import path from "node:path"
import { Router, static as static_ } from "express"
import debug from "debug"

import env from "../env"
import apiRoutes from "./api"

debug.enable("express-router")
const log = debug("express-router")

const router = Router()

/**
 * Routes
 */
router.use("/api", apiRoutes)

/**
 * Serve the React app in production
 */
if (env.NODE_ENV === "production") {
	// Serve static files from the Vite build directory
	const viteBuildPath = path.join(__dirname, "../../../client/dist")
	router.use(static_(viteBuildPath))

	// Serve the React app for all other routes to support client-side routing
	router.get("*", (req, res, next) => {
		log("Serving React app")
		const indexPath = path.join(viteBuildPath, "index.html")
		readFile(indexPath, "utf8", (err, html) => {
			if (err) {
				log("Error reading index.html:", err)
				res.status(500).send("Internal Server Error")
				return
			}
			res.send(html)
		})
	})
}

export default router
