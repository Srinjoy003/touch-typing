import mongoose from "mongoose";
import { userSchema } from "../../app/api/user.js";

const mongoURI = "mongodb://0.0.0.0:27017/";

mongoose.connect(mongoURI).then(() => {
	console.log("Connected to Mongo");
});

const User = mongoose.model("User", userSchema);

run();

async function run() {
	try {
		// const user = await User.create({ email: "srinjoy003@gmail.com", password: "12345678" });
		// await user.save();
		// const user = await User.findById('658c5aeaa52c228f0b9fbc6e');
		const user = await User.findOne({ email: "srinjoy003@gmail.com" });
		console.log(user);
	} catch (e) {
		console.log(e.message);
	}
}
