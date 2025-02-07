import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { updateTask } from "../../app/function/update-task";
import dayjs from "dayjs";

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
				}),
			},
		},
		async (req, res) => {
			const { id, title, priority, deadline, status, comment } = req.body;
			const currentDay = dayjs();

			const { updateTaskFetch } = await updateTask({
				id,
				title,
				priority,
				deadline: dayjs(deadline).toDate(),
				status,
				comment,
				updatedAt: currentDay.toDate(),
			});

			return updateTaskFetch;
		},
	);
};
