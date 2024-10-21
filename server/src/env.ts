import debug from "debug"
import { config } from "dotenv"
import { TypeOf, z } from "zod"

if (process.env.NODE_ENV !== "production") {
	debug.enable("env")
}
const log = debug("env")

log(`Loading environment variables...`)
config()
log(`Environment variables loaded successfully`)

const zEnv = z.object({
	PORT: z.string().default("3000"),
	NODE_ENV: z.string().default("development"),
	MONGO_URI: z.string().default("mongodb://admin:password@localhost:27017"),
	MONGO_DATABASE: z.string().default("test"),
	JWT_SECRET: z.string().optional().default("secret"),
	PUBLIC_URL: z.string().optional().default("http://localhost:5173"),
})

let env: TypeOf<typeof zEnv>

try {
	log(`Checking environment variables...`)
	env = zEnv.parse(process.env)
	log(`Environment variables checked successfully`)
} catch (err) {
	if (err instanceof z.ZodError) {
		const { fieldErrors } = err.flatten()
		const errorMessage = Object.entries(fieldErrors)
			.map(([field, errors]) =>
				errors ? `${field}: ${errors.join(", ")}` : field
			)
			.join("\n  ")
		log(`Missing environment variables:\n  ${errorMessage}`)
		throw new Error(`Missing environment variables:\n  ${errorMessage}`)
	}
	process.exit(1)
}

export default env
