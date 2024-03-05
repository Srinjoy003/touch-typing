// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "../user.js";
import bcrypt from "bcrypt";

// Connect to MongoDB
const mongoURI = "mongodb://0.0.0.0:27017/test";
mongoose.connect(mongoURI);

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});

// POST function to handle form submissions
export async function POST(request: NextRequest) {
	try {
		// Parse the JSON request body
		const requestBody = await request.json();
		console.log("Request Body:", requestBody);

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(requestBody.password, salt);

		const userDetails = {email: requestBody.email, password: hashedPassword}
		const newUser = new User(userDetails);

		await newUser.save();

		console.log("Form data saved to MongoDB", newUser);

		// Return a response with the saved form data
		return new NextResponse(JSON.stringify(newUser), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error processing form submission:", error);

		// Return an error response
		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}
