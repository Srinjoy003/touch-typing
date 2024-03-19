import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Stats, Users } from "../user";
import DetailedStats from "@/app/stats/detailedStats";
import { DataSet } from "@/app/stats/organizeData";
import { calculateFilter, getSorter } from "./helper";

const mongoURI = process.env.MONGODB_URI as string;
mongoose.connect(mongoURI);

process.on("SIGINT", async () => {
	await mongoose.connection.close();
	process.exit(0);
});

export async function GET(request: NextRequest) {
	try {
		const username = request.nextUrl.searchParams.get("username");
		const filter = request.nextUrl.searchParams.get("filter");
		const sorter = request.nextUrl.searchParams.get("sorter");
		const rowCount = Number(request.nextUrl.searchParams.get("rowCount"));



		const user = await Users.findOne({ username: username });

		if (!user) {
			return new NextResponse("Account with this username does not exist", {
				status: 404,
			});
		}

		if (!filter || !sorter || !rowCount){
			return new NextResponse("Invalid Filter and Sorter", {
				status: 404,
			});
		}

		const startDate = calculateFilter(filter)
		const sortField = getSorter(sorter)

		const timeValues = [15, 30, 60, 120];
		const wordValues = [10, 25, 80, 20];

		const timeStats: { [key: string]: any } = {};
		const wordStats: { [key: string]: any } = {};

		const profileStats = await Stats.aggregate([
			{
				$match: {
					username: username,
				},
			},
			{
				$group: {
					_id: null,
					testTaken: { $sum: 1 }, 
					avgSpeed: { $avg: "$rawSpeed" },
					avgAccuracy: { $avg: "$accuracy" },
				},
			},
		]);

		for (const value of timeValues) {
			const stats = await Stats.aggregate([
				{
					$match: {
						mode: `time ${value}`,
					},
				},
				// Group by mode
				{
					$group: {
						_id: "$mode",
						avgSpeed: { $avg: "$speed" },
						avgAccuracy: { $avg: "$accuracy" },
					},
				},
			]);

			if (stats.length === 1) {
				timeStats[value.toString()] = stats[0];
			}
		}

		for (const value of wordValues) {
			const stats = await Stats.aggregate([
				{
					$match: {
						mode: `word ${value}`,
					},
				},
				{
					$group: {
						_id: "$mode",
						avgSpeed: { $avg: "$speed" },
						avgAccuracy: { $avg: "$accuracy" },
					},
				},
			]);

			if (stats.length === 1) {
				wordStats[value.toString()] = stats[0];
			}
		}

		const detailedStats = await Stats.aggregate([
			{
				$match: {
					username: username,
					createdAt: { $gte: startDate }
				},
			},
			{
				$group: {
					_id: null,
					testTaken: { $sum: 1 }, // Count the number of tests taken
					totalChar: { $sum: "$totalChars" }, // Calculate the total time
					totalWords: { $sum: "$wordCount" },
					highestSpeed: { $max: "$speed" }, // Find the highest speed
					avgSpeed: { $avg: "$speed" }, // Calculate the average speed
					highestAccuracy: { $max: "$accuracy" }, // Find the highest accuracy
					avgAccuracy: { $avg: "$accuracy" }, // Calculate the average accuracy
				},
			},
			{
				$lookup: {
					from: "stats",
					let: {},
					pipeline: [
						{
							$match: {
								$expr: { $eq: ["$username", username] },
							},
						},
						{ $sort: { createdAt: -1 } }, // Sort by createdAt in descending order
						{ $limit: 10 }, // Limit to last 10 documents
						{
							$group: {
								_id: null,
								avgSpeedLast10: { $avg: "$speed" }, // Calculate average speed for last 10 tests
								avgAccuracyLast10: { $avg: "$accuracy" }, // Calculate average accuracy for last 10 tests
							},
						},
					],
					as: "last10Stats",
				},
			},
			{
				$project: {
					testTaken: 1,
					totalChar: 1,
					totalWords: 1,
					highestSpeed: 1,
					avgSpeed: 1,
					highestAccuracy: 1,
					avgAccuracy: 1,
					avgSpeedLast10: { $arrayElemAt: ["$last10Stats.avgSpeedLast10", 0] }, // Extract avgSpeedLast10 from the array
					avgAccuracyLast10: {
						$arrayElemAt: ["$last10Stats.avgAccuracyLast10", 0],
					}, // Extract avgAccuracyLast10 from the array
					_id: 0,
				},
			},
		]);

		const lastEntries = await Stats.aggregate([
			{
				$match: {
					username: username,
				},
			},
			{ $sort: {  [sortField]: -1 } }, // Sort by createdAt in descending order
			{ $limit: rowCount }, // Limit to last 10 documents
		]);

		

		const responseData: DataSet = {
			timeStats: timeStats,
			wordStats: wordStats,
			detailedStats: detailedStats[0],
			lastEntries: lastEntries,
			profileStats: profileStats[0]
		};

		return new NextResponse(JSON.stringify(responseData), { status: 200 });
	} catch (error) {
		console.error("Error retrieving stats", error);

		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();

		const user = await Users.findOne({ username: requestBody.username });

		if (!user) {
			return new NextResponse("Account with this username does not exist", {
				status: 404,
			});
		}

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
