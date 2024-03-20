import { NextRequest, NextResponse } from "next/server";
import { encrypt} from "../../login/encryption";

const encryptionKey = process.env.ENCRYPTION_KEY as string;

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
        console.log("hello")
		const encryptedUsername = encrypt(requestBody.username, encryptionKey);


		const data = { encryptedUsername };

		return new NextResponse(JSON.stringify(data), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error Encrypting", error);

		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}


