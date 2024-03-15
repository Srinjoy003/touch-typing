import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Users } from "../user";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const mongoURI = "mongodb://0.0.0.0:27017/test";
mongoose.connect(mongoURI);

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});

function generateSessionId() {
	return uuidv4();
}

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
		const sessionId = generateSessionId();

		return new NextResponse(
			JSON.stringify({
				sessionId,
				message: "Login successful",
				username: requestBody.username,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		console.error("Error processing login", error);

		// Return an error response
		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}
