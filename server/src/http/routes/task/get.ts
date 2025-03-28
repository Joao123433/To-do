import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getTask } from "../../../app/function/get-task";

export const GetTaskRouter: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/task",
		{
			schema: {
				headers: z.object({
					id: z.string(),
				}),
			},
		},
		async (req, res) => {
			const id = req.headers.id;

			try {
				const { taskFetch } = await getTask(id);

				if (!taskFetch) throw new Error("Task not found");

				res.status(200).send({
					message: "Task retrieved successfully.",
					taskFetch,
				});
			} catch (error) {
				res.status(500).send({
					message:
						error instanceof Error
							? `Error retrieving task: ${error.message}`
							: "An unexpected error occurred while retrieving task.",
				});
			}
		},
	);
};
