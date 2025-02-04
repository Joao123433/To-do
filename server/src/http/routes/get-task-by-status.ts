import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getTasksByStatus } from "../../app/function/get-task-by-status";

export const getTaskByStatusRouter: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/task-status",
		{
			schema: {
				headers: z.object({
					id: z.string(),
				}),
			},
		},
		async (req, res) => {
			const id = req.headers.id;

			const { taskByStatus } = await getTasksByStatus(id);

			return taskByStatus;
		},
	);
};
