import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getNext7DaysTasks } from "../../../app/function/get-next-7-days-tasks";

export const getNext7DaysTasksRouter: FastifyPluginAsyncZod = async (app) => {
	app.get("/next7days", async (req, res) => {
		try {
			const { filterTasks } = await getNext7DaysTasks();

			if (!filterTasks)
				throw new Error(
					"No tasks found for the next 7 days with high priority.",
				);

			res.status(200).send({
				message:
					"High priority tasks for the next 7 days retrieved successfully.",
				data: filterTasks,
			});
		} catch (error) {
			res.status(500).send({
				message:
					error instanceof Error
						? `Error retrieving tasks: ${error.message}`
						: "An unexpected error occurred while retrieving tasks.",
			});
		}
	});
};
