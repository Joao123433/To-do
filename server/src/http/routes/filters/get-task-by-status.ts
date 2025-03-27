import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getHighPriorityTasks } from "../../../app/function/get-high-priority-tasks";

export const getTaskHighPrioirtyRouter: FastifyPluginAsyncZod = async (app) => {
	app.get("/high-priority", async (req, res) => {
		const { taksHighPriority } = await getHighPriorityTasks();
		return taksHighPriority;
	});
};
