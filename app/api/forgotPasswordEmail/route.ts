import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { Users, ForgotPasswordUsers } from "../user";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const mongoURI = process.env.MONGODB_URI as string;
mongoose.connect(mongoURI);

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();

		const user = await Users.findOne({ email: requestBody.email });

		if (!user) {
			return new NextResponse("Account with this email does not exist.", {
				status: 404,
			});
		}

		const token = uuidv4();

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER as string,
				pass: process.env.EMAIL_PASSWORD as string,
			},
		});

		const domain = request.headers.get("host");

		const resetPasswordLink = `http://${domain}/resetPassword?token=${token}`;

		const mailOptions = {
			from: process.env.EMAIL_USER as string,
			to: requestBody.email,
			subject: "Password Reset",
			text: `Hi ${user.username},\n\nYou've requested to reset your password.\n\nClick the following link to reset your password:\n${resetPasswordLink}\n\nIf you didn't request this, you can safely ignore this email.\n\n-The Key Ninja Team`,
		};

		await transporter.sendMail(mailOptions);

		const userDetails = {
			email: requestBody.email,
			token,
		};

		const newUser = new ForgotPasswordUsers(userDetails);
		await newUser.save();

		return new NextResponse("Sent Reset Password Email", {
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
