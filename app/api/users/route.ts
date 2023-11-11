import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {
	const requestBody = await request.json();
	console.log("Request Body:", requestBody);

	console.log("Received");
	return new NextResponse(JSON.stringify(requestBody));
}
