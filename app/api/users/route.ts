// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { userSchema } from "../../../backend/database/user.mjs"; // Update this with the correct path

// Connect to MongoDB
const mongoURI = "mongodb://0.0.0.0:27017/test";
mongoose.connect(mongoURI);

// Define the Form model
const Form = mongoose.model("Form", userSchema);

// POST function to handle form submissions
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON request body
    const requestBody = await request.json();
    console.log("Request Body:", requestBody);

    // Create a new instance of the Form model with the submitted data
    const formInstance = new Form(requestBody);

    // Save the form data to the MongoDB collection
    await formInstance.save();

    console.log("Form data saved to MongoDB", formInstance);

    // Return a response with the saved form data
    return new NextResponse(JSON.stringify(formInstance), {
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
  } finally {
    // Close the MongoDB connection after completing the operation
    mongoose.connection.close();
  }
}

