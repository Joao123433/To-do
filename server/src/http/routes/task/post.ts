import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import dayjs from "dayjs";
import { createTask } from "../../../app/function/create-task";

export const PostTaskRouter: FastifyPluginAsyncZod = async (app) => {
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

			try {
				const { taskInsert } = await createTask({
					title,
					priority,
					deadline: dayjs(deadline).toDate(),
					status,
					comment,
					createdAt: currentDay.toDate(),
					updatedAt: currentDay.toDate(),
				});

				if (!taskInsert) throw new Error("Error creating task");

				res.status(200).send({
					message: "Task created successfully",
					taskInsert,
				});
			} catch (error) {
				res.status(500).send({
					message:
						error instanceof Error
							? `Error creating task: ${error.message}`
							: "An unexpected error occurred while creating task",
				});
			}
		},
	);
};
