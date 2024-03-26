import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Users } from "../user";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const mongoURI = process.env.MONGODB_URI as string;
// mongoose.connect(mongoURI);

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});

function generateSessionId() {
	return uuidv4();
}

export async function POST(request: NextRequest) {
	try {
		mongoose.connect(mongoURI);

		const requestBody = await request.json();

		const user = await Users.findOne({ username: requestBody.username });

		return new NextResponse(
			JSON.stringify({
				sessionId:"dkpmvmd",
				message: "Login successful",
				username: "test",
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

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

		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}

// export async function POST(request: NextRequest) {
// 	try {
// 		console.log("Api request recieved");
// 		return new NextResponse(
// 			JSON.stringify({
// 				sessionId: "duabcnbwud",
// 				message: "Login successful",
// 				username: "TestUsername",
// 			}),
// 			{
// 				status: 200,
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);
// 	} catch (error) {
// 		console.error("Error processing login", error);

// 		return new NextResponse("Internal Server Error", {
// 			status: 500,
// 		});
// 	}
// }
