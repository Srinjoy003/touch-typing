// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { UnverifiedUsers, Users } from "../user";
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

		const existingEmail = await Users.findOne({ email: requestBody.email });
		const existingUsername = await Users.findOne({
			username: requestBody.username,
		});

		if (existingEmail)
			return new NextResponse(
				"An account with this email already exists. Please choose a different email.",
				{
					status: 404,
				}
			);

		if (existingUsername)
			return new NextResponse(
				"Username already taken. Please choose a different email.",
				{
					status: 404,
				}
			);

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(requestBody.password, salt);

		const userDetails = {
			userId: requestBody.userId,
			username: requestBody.username,
			email: requestBody.email,
			password: hashedPassword,
		};
		const newUser = new UnverifiedUsers(userDetails);

		await newUser.save();

		console.log("Unverified Form data saved to MongoDB", newUser);

		return new NextResponse(JSON.stringify(newUser), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error processing form submission:", error);

		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}
