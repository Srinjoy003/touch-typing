// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { UnverifiedUsers, Users } from "../user";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
import nodemailer from "nodemailer";

const mongoURI = process.env.MONGODB_URI as string;
mongoose.connect(mongoURI);

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});

export async function POST(request: NextRequest) {
	try {

		const requestBody = await request.json();

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

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER as string,
				pass: process.env.EMAIL_PASSWORD as string,
			},
		});

		const nanoid = customAlphabet("0123456789", 6);
		const verificationCode = nanoid();

		const mailOptions = {
			from: process.env.EMAIL_USER as string,
			to: requestBody.email,
			subject: "Verify Your Email",
			text: `Hi ${requestBody.username},\n\nYour code: ${verificationCode}\n\nUse it to finish your registration.\n\n-The Key Ninja Team`,
		  };

		
		await transporter.sendMail(mailOptions);

		const userDetails = {
			userId: requestBody.userId,
			username: requestBody.username,
			email: requestBody.email,
			password: hashedPassword,
			verificationCode
		};
		const newUser = new UnverifiedUsers(userDetails);

		await newUser.save();


		return new NextResponse(JSON.stringify(newUser), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {

		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}
