import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { deleteTask } from "../../../app/function/delete-task";

export const DeleteTaskRouter: FastifyPluginAsyncZod = async (app) => {
	app.delete(
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
				const { deleteTaskFetch } = await deleteTask(id);

				if (!deleteTaskFetch) throw new Error("Task not found");

				res.status(200).send({
					message: "Archived tasks retrieved successfully.",
					deleteTaskFetch,
				});
			} catch (error) {
				res.status(500).send({
					message:
						error instanceof Error
							? `Error deleting task: ${error.message}`
							: "An unexpected error occurred while deleting task.",
				});
			}
		},
	);
};
