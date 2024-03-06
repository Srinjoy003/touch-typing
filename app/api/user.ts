// const mongoose = require("mongoose");
import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, lowercase: true },
	password: { type: String, required: true, minLength: 8 },
});



export const UserSignup = mongoose.model("UserSignup", signupSchema);

