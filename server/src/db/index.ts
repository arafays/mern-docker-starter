import debug from "debug"
import { connect, connection } from "mongoose"

import env from "../env"

debug.enable("app:db")
const log = debug("app:db")

const connectDB = async () => {
	try {
		log("Connecting to MongoDB..." + env.MONGO_URI)
		await connect(env.MONGO_URI, {
			dbName: env.MONGO_DATABASE,
		})
		log(
			`MongoDB connected to: ${env.MONGO_URI}/${(await connection.db?.databaseName) ?? "DB Name NOT FOUND"}`
		)
	} catch (err: any) {
		log("MongoDB connection error:", err.message)
		process.exit(1)
	}
}

export default connectDB
