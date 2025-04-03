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
					message: "Task deleted successfully.",
					deleteTaskFetch,
				});
			} catch (error) {
				res.status(404).send({
					message: "Task not found",
				});
			}
		},
	);
};
