import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAllTask } from "../../app/function/get-all-tasks";

export const TaskRouter: FastifyPluginAsyncZod = async (app) => {
	app.get("/tasks", {}, async () => {
		const { allTask } = await getAllTask();

		return allTask;
	});
};
