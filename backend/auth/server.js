const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const users = ["hello", "bye"];

// app.use(express.json());
// app.use(express.urlencoded());

app.get("/users", (req, res) => {
	console.log(req.body);
	res.json(users);
});

app.post("/users", async (req, res) => {
	console.log(req.body);
	res.status(201).send();
	// try {
	// 	const salt = await bcrypt.genSalt();
	// 	console.log(req.body)
	// 	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	// 	console.log(salt);
	// 	console.log(hashedPassword);
	// 	const user = { name: req.body.name, password: hashedPassword };
	// 	users.push(user);
	// 	res.status(201).send();
	// } catch {
	// 	console.log("error")
	// 	res.status(500).send();
	// }
});

app.listen(3000);
