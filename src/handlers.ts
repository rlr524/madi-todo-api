import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const handlers = {
	async createUser(req: Request, res: Response) {
		const { first_name, last_name, email } = req.body;
		const user = await prisma.user.create({
			data: { firstName: first_name, lastName: last_name, email },
		});
		res.json(user);
	},

	async fetchAllUsers(req: Request, res: Response) {
		const users = await prisma.user.findMany();
		res.json(users);
	},

	async fetchUser(req: Request, res: Response) {
		// TODO: Fix this to use a url parameter for the id, not the body as technically a GET
		// request doesn't need to send a request body, so we shouldn't be passing a request body
		// just to pass an id that we can pass as a url parameter.
		const id = req.body.id;
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		if (!user) {
			res.json(`The user with the id of ${id} was not found`);
		}
		res.json(user);
	},

	async updateUser(req: Request, res: Response) {
		// const { id } = req.params;
		const id = req.body.id;
		const { first_name, last_name, email } = req.body;

		let user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		if (!user) {
			res.json(`The user with the id of ${id} was not found`);
		}

		user = await prisma.user.update({
			// where: { id: Number(id) },
			where: { id: id },
			data: { firstName: first_name, lastName: last_name, email },
		});

		res.json(user);
	},

	async deleteUser(req: Request, res: Response) {
		const id = req.body.id;

		let user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		if (!user) {
			res.json(`The user with the id of ${id} was not found`);
		}

		user = await prisma.user.update({
			where: { id: id },
			data: { deleted: true },
		});

		res.json(`User ${id} successfully flagged as deleted`);
	},
};
