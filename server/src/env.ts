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
	PORT: z.string(),
	NODE_ENV: z.string(),
	MONGO_URI: z.string(),
	JWT_SECRET: z.string(),
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
