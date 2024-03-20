import { NextRequest, NextResponse } from "next/server";
import { isValidJSON, decrypt } from "../../login/encryption";

const encryptionKey = process.env.ENCRYPTION_KEY as string;

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();

		if (!isValidJSON(requestBody.encryptedUsername)) {
			return new NextResponse("Not JSON", {
				status: 404,
			});
		}
		const username = decrypt(requestBody.encryptedUsername, encryptionKey);

		const data = { username };

		return new NextResponse(JSON.stringify(data), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error Decrypting", error);

		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}