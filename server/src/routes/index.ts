import { readFile } from "node:fs"
import path from "node:path"
import { Router, static as static_ } from "express"
import debug from "debug"
import { connection } from "mongoose"

import env from "../env"

debug.enable("express-router")
const log = debug("express-router")

const router = Router()

if (env.NODE_ENV === "production") {
	// Serve static files from the Vite build directory
	const viteBuildPath = path.join(__dirname, "../../../client/dist")
	router.use(static_(viteBuildPath))

	// Serve the React app for all other routes to support client-side routing
	router.get("*", (req, res, next) => {
		log("Serving React app")

		if (req.path.startsWith("/api")) {
			return next()
		}
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
} else {
	// redirect to 5173 port
	router.get("*", (req, res, next) => {
		if (req.path.startsWith("/api")) {
			return next()
		}

		res.redirect(env.PUBLIC_URL + req.path)
	})
}

router.get("/api", async (req, res) => {
	log("GET /api")
	log(`query: ${JSON.stringify(req.query)}`)
	log(`params: ${JSON.stringify(req.params)}`)

	const db = connection.db
	if (!db) {
		log("No database connection")
		res.status(500).send("Internal Server Error")
		return
	}
	const collection = db.collection("test")
	try {
		const result = await collection.find().toArray()
		log("GET /api success")

		if (result.length === 0) {
			log("Inserting document")

			await collection.insertOne({ message: "Hello, world!" })
		} else {
			// delete all documents
			log("Deleting all documents")
			await collection.deleteMany({})
		}

		res.json(result)
	} catch (err: any) {
		log("GET /api error:", err.message)
		res.status(500).send("Internal Server Error")
	}
})

export default router
