import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { updateTask } from "../../app/function/update-task";

export const updateTaskRoute: FastifyPluginAsyncZod = async (app) => {
	app.put(
		"/task",
		{
			schema: {
				body: z.object({
					id: z.string(),
					title: z.string(),
					priority: z.string(),
					deadline: z.string(),
					status: z.string(),
					comment: z.string(),
					updatedAt: z.number(),
				}),
			},
		},
		async (req, res) => {
			const { id, title, priority, deadline, status, comment, updatedAt } =
				req.body;

			const { updateTaskFetch } = await updateTask({
				id,
				title,
				priority,
				deadline,
				status,
				comment,
				updatedAt,
			});

			return updateTaskFetch;
		},
	);
};
