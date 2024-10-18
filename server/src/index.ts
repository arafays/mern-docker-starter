import env from "./env"
import { server } from "./server"

const init = server()

init.listen(env.PORT, () => {
	console.log("Server is running on http://localhost:3000")
})
