import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Stats, Users } from "../user";


const mongoURI = process.env.MONGODB_URI as string;
mongoose.connect(mongoURI);

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});



export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();

		const user = await Users.findOne({ username: requestBody.username });

		if (!user) {
			return new NextResponse("Account with this username does not exist", {
				status: 404,
			});
		}

        console.log(requestBody)
        const newStat = new Stats(requestBody);
		await newStat.save();

		return new NextResponse("Stats sent successfully", {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error processing login", error);

		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}
