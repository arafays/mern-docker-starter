import debug from "debug"
import { Server } from "socket.io"

const log = debug("express:socket")

export const setupSocket = (server: any) => {
	const io = new Server(server)
	let users: any[] = []

	const addUser = (userData: any, socketId: string) => {
		!users.some((user) => user.sub === userData.sub) &&
			users.push({ ...userData, socketId })
	}

	const removeUser = (socketId: string) => {
		users = users.filter((user) => user.socketId !== socketId)
	}

	const getUser = (userId: string) => {
		return users.find((user) => user.sub === userId)
	}

	io.on("connection", (socket) => {
		log("a user connected")

		socket.on("addUser", (userData) => {
			addUser(userData, socket.id)
			io.emit("users", users)
		})

		socket.on("sendMessage", (message) => {
			const user = getUser(message.to)
			io.to(user.socketId).emit("message", message)
		})

		socket.on("disconnect", () => {
			log("user disconnected")
			removeUser(socket.id)
			io.emit("getUsers", users)
		})
	})

	return io
}
