import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, lowercase: true, unique: true },
	password: { type: String, required: true, minLength: 8 },
});

const unverifiedUserSchema = new mongoose.Schema({
	userId: { type: String, required: true, unique: true },
	username: { type: String, required: true },
	email: { type: String, required: true, lowercase: true },
	password: { type: String, required: true, minLength: 8 },
	verificationCode: { type: String, required: false, length: 6 },
});

const ForgotPasswordSchema = new mongoose.Schema({
	email: { type: String, required: true },
	token: { type: String, required: true, unique: true },
});

const StatSchema = new mongoose.Schema({
	username: { type: String, required: true },
	mode: { type: String, required: true },
	speed: { type: Number, required: true },
	accuracy: { type: Number, required: true },
	rawSpeed: { type: Number, required: true },
	wordCount: { type: Number, required: true },
	totalChars: { type: Number, required: true },
	correctChar: { type: Number, required: true },
	errorChar: { type: Number, required: true },
	createdAt: { type: Date, required: true }
});

export const Users =
	mongoose.models.Users || mongoose.model("Users", UserSchema);

export const UnverifiedUsers =
	mongoose.models.UnverifiedUsers ||
	mongoose.model("UnverifiedUsers", unverifiedUserSchema);

export const ForgotPasswordUsers =
	mongoose.models.ForgotPasswordUsers ||
	mongoose.model("ForgotPasswordUsers", ForgotPasswordSchema);

export const Stats =
	mongoose.models.Stats || mongoose.model("Stats", StatSchema);
