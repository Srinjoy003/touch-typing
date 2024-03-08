import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, lowercase: true, unique: true },
	password: { type: String, required: true, minLength: 8 },
});

const unverifiedUserSchema = new mongoose.Schema({
	userId: { type: String, required: true, unique: true },
	username: { type: String, required: true},
	email: { type: String, required: true, lowercase: true},
	password: { type: String, required: true, minLength: 8 },
});


export const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);
export const UnverifiedUsers = mongoose.models.UnverifiedUsers || mongoose.model("UnverifiedUsers", unverifiedUserSchema);

