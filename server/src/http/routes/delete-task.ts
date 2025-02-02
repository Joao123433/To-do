import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { deleteTask } from "../../app/function/delete-task";

export const deleteTaskRoute: FastifyPluginAsyncZod = async (app) => {
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

			const { deleteTaskFetch } = await deleteTask(id);

			return deleteTaskFetch;
		},
	);
};
