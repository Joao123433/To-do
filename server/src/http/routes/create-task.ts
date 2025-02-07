import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createTask } from "../../app/function/create-task";
import dayjs from "dayjs";

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
				}),
			},
		},

		async (req, res) => {
			const { title, priority, deadline, status, comment } = req.body;
			const currentDay = dayjs();

			const { taskInsert } = await createTask({
				title,
				priority,
				deadline: dayjs(deadline).toDate(),
				status,
				comment,
				createdAt: currentDay.toDate(),
				updatedAt: currentDay.toDate(),
			});

			return taskInsert;
		},
	);
};
