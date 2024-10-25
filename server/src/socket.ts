import debug from "debug"
import { Server } from "socket.io"

debug.enable("express:socket")

const log = debug("express:socket")

export const setupSocket = (server: any) => {
	log("setting up socket")
	const io = new Server(server, {
		cors: {
			origin: "*",
		},
	})

	let users: any[] = []

	const addUser = (userData: any, socketId: string) => {
		!users.some((user) => user.sub === userData.sub) &&
			users.push({ ...userData, socketId })
		log("user connected", socketId)
	}

	const removeUser = (socketId: string) => {
		users = users.filter((user) => user.socketId !== socketId)
		log("remove user", socketId)
	}

	const getUser = (userId: string) => {
		log("get user", userId)
		return users.find((user) => user.sub === userId)
	}

	io.on("connection", (socket) => {
		log("client connected", socket.id)
		socket.on("addUser", (userData) => {
			addUser(userData, socket.id)
			log("client connected", socket.id)
			io.emit("getUsers", users)
		})

		socket.on("sendMessage", (message) => {
			const user = getUser(message.receiverId)
			if (!user) {
				log("user not found")
				return
			}
			io.to(user.socketId).emit("getMessage", message)
		})

		socket.on("disconnect", () => {
			removeUser(socket.id)
			log("client disconnected", socket.id)
			io.emit("getUsers", users)
		})
	})
}
