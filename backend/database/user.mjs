// const mongoose = require("mongoose");
import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
	email: { type: String, required: true, lowercase: true },
	password: { type: String, required: true, minLength: 8 },
});
