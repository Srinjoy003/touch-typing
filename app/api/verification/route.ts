// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { UnverifiedUsers, Users } from "../user";


const mongoURI = process.env.MONGODB_URI as string;
mongoose.connect(mongoURI);

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();

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
