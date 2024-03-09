// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { UnverifiedUsers, Users } from "../user";

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

		const user = await UnverifiedUsers.findOne({ userId: requestBody.userId });

		if (!user) {
			return new NextResponse("Cannot find the user id in unverified users.", {
				status: 404,
			});
		}

		console.log(requestBody);

		if (requestBody.verificationCode !== user.verificationCode) {
			return new NextResponse("Incorrect Code.", {
				status: 404,
			});
		}

		const userDetails = {
			username: user.username,
			email: user.email,
			password: user.password,
		};
		const newUser = new Users(userDetails);

		await newUser.save();

		console.log("Form data saved to MongoDB", newUser);

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
