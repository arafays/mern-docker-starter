import env from "./env"
import { server } from "./server"

const init = server()

init.listen(env.PORT, () => {
	console.log(`Server listening on port ${env.PORT}`)
})
