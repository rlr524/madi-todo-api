import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
	res.send("Hello, Madison");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
