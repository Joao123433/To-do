import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import dayjs from "dayjs";
import { updateTask } from "../../../app/function/update-task";

export const PutTaskRouter: FastifyPluginAsyncZod = async (app) => {
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

			try {
				const { updateTaskFetch } = await updateTask({
					id,
					title,
					priority,
					deadline: dayjs(deadline).toDate(),
					status,
					comment,
					updatedAt: currentDay.toDate(),
				});

				if (!updateTaskFetch) throw new Error("Error updating task");

				res.status(200).send({
					message: "Task updated successfully",
					updateTaskFetch,
				});
			} catch (error) {
				res.status(400).send({
					message: "Error updating task",
				});
			}
		},
	);
};
