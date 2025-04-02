import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
import { hash } from "bcrypt";

export const RegisterRouter: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/register",
		{
			schema: {
				body: z.object({
					email: z.string().email(),
					password: z.string(),
					name: z.string(),
				}),
			},
		},
		async (req, res) => {
			const { email, password, name } = req.body;
			const hashedPassword = await hash(password, 10);

			const [existingUser] = await db
				.select()
				.from(users)
				.where(eq(users.email, email));

			if (existingUser) {
				return res.status(409).send({ message: "User already exists" });
			}

			await db
				.insert(users)
				.values({
					email,
					password: hashedPassword,
					name,
					createdAt: dayjs(new Date()).format("YYYY-MM-DD"),
					updatedAt: dayjs(new Date()).format("YYYY-MM-DD"),
				})
				.returning();

			return res.status(201).send({ message: "User registered successfully" });
		},
	);
};
