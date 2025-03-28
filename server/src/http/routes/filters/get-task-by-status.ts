import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getHighPriorityTasks } from "../../../app/function/get-high-priority-tasks";

export const getTaskHighPrioirtyRouter: FastifyPluginAsyncZod = async (app) => {
	app.get("/high-priority", async (req, res) => {
		try {
			const { taksHighPriority } = await getHighPriorityTasks();
			if (!taksHighPriority) throw new Error("No high priority tasks found");

			res.status(200).send({
				message: "High priority tasks retrieved successfully",
				data: taksHighPriority,
			});
		} catch (error) {
			res.status(500).send({
				message:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			});
		}
	});
};
