import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { UnverifiedUsers } from "../user";
import { customAlphabet } from "nanoid";

dotenv.config();

export async function POST(request: NextRequest) {
	try {
		const nanoid = customAlphabet("0123456789", 6);
		const verificationCode = nanoid();

		const requestBody = await request.json();
		console.log("Request Body:", requestBody);

		// const user = await UnverifiedUsers.findOne({ userId: requestBody.userId });

		// if (!user) {
		// 	return new NextResponse("Cannot find the user id in unverified users.", {
		// 		status: 404,
		// 	});
		// }

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER as string,
				pass: process.env.EMAIL_PASSWORD as string,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER as string,
			to: "srinjoy003@gmail.com",
			subject: "Test Email",
			text: "This is a test email from Node.js using Gmail SMTP.",
		};

		await transporter.sendMail(mailOptions);
		console.log("Email sent successfully");

		// const userDetails = {
		// 	username: user.username,
		// 	email: user.email,
		// 	password: user.password,
		// };

		await transporter.sendMail(mailOptions);
		console.log("Email sent successfully");

		return new NextResponse("Sent Verification Email", {
			status: 200,
		});
	} catch (error) {
		console.error("Error processing form submission:", error);

		// Return an error response
		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}
