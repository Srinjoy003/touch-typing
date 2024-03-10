
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Users } from "../user";
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

		const user = await Users.findOne({ username: requestBody.username });

		if (!user) {
			return new NextResponse("Account with this username does not exist", {
				status: 404,
			});
		}

		const passwordMatch = await bcrypt.compare(
			requestBody.password,
			user.password
		);

		if (!passwordMatch) {
			return new NextResponse("Username and password do not match", {
				status: 401,
			});
		}

		console.log("User logged in:", user);

		return new NextResponse(JSON.stringify({ message: "Login successful" }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error processing login", error);

		// Return an error response
		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}
