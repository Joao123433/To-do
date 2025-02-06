import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createTask } from "../../app/function/create-task";

export const newTaskRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/task",
		{
			schema: {
				body: z.object({
					title: z.string(),
					priority: z.string(),
					deadline: z.string(),
					status: z.string(),
					comment: z.string(),
					createdAt: z.number(),
					updatedAt: z.number(),
				}),
			},
		},

		async (req, res) => {
			const {
				title,
				priority,
				deadline,
				status,
				comment,
				createdAt,
				updatedAt,
			} = req.body;

			const { taskInsert } = await createTask({
				title,
				priority,
				deadline,
				status,
				comment,
				createdAt,
				updatedAt,
			});

			return taskInsert;
		},
	);
};
