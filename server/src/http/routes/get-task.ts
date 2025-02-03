import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getTask } from "../../app/function/get-task";

export const getTaskRouter: FastifyPluginAsyncZod = async (app) => {
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

			const { taskFetch } = await getTask(id);

			return taskFetch;
		},
	);
};
