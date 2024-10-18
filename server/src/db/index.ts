import debug from "debug"
import { connect } from "mongoose"

import env from "../env"

debug.enable("app:db")
const log = debug("app:db")

const connectDB = async () => {
	try {
		log("Connecting to MongoDB..." + env.MONGO_URI)
		await connect(env.MONGO_URI)
		log("MongoDB connected")
		console.log("MongoDB connected")
	} catch (err: any) {
		log("MongoDB connection error:", err.message)
		process.exit(1)
	}
}

export default connectDB
