// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { UnverifiedUsers, Users } from "../user";
import bcrypt from "bcrypt";
import { ForgotPasswordUsers } from "../user";


const mongoURI = process.env.MONGODB_URI as string;
mongoose.connect(mongoURI);

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();

		const allowedUser = await ForgotPasswordUsers.findOne({
			token: requestBody.token,
		});

		if (!allowedUser)
			return new NextResponse(
				"Cannot process the password reset for this account.Please try again.",
				{
					status: 404,
				}
			);

		const user = await Users.findOne({ email: allowedUser.email });

		if (!user)
			return new NextResponse(
				"No account with this email exists. Please choose a different email.",
				{
					status: 404,
				}
			);

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(requestBody.password, salt);

		user.password = hashedPassword;

		await user.save();


		return new NextResponse(JSON.stringify(user), {
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
