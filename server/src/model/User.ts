import { model, Schema } from "mongoose"

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	email_verified: {
		type: Boolean,
		default: false,
	},
	picture: {
		type: String,
	},
})

const user = model("user", UserSchema)

export default user
