import express, { Request, Response } from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = process.env.PORT;
const version = process.env.API_VERSION;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello, Madison");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

/**
 * route: /api/v1/user
 * method: post
 * description: add a user
 */
app.post(version + "/user", async (req: Request, res: Response) => {
	const { firstName, lastName, email } = req.body;
	const user = await prisma.user.create({
		data: { firstName, lastName, email },
	});
	res.json(user);
});
