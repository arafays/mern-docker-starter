import env from "./env"
import { createServer } from "./server"

const server = createServer()

server.listen(env.PORT, () => {
	console.log("Server is running on http://localhost:3000")
})
